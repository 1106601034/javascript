import assert from "node:assert/strict";
import test from "node:test";
import type { Request, Response } from "express";
import type { ValidationChain } from "express-validator";
import greeting from "../src/controllers/helloWorld/helloWorld.js";
import dataValidationModule from "../src/controllers/dataValidation/dataValidation.js";
import pageNotFound from "../src/middlewares/pageNotFound.js";
import errorHandler from "../src/middlewares/errorHandler.js";

const { requirements, validation, dataValidation } = dataValidationModule;

type MutableRequest = Partial<Request> & { body?: Record<string, unknown> };

const runRequirements = async (req: MutableRequest): Promise<void> => {
    for (const rule of requirements as ValidationChain[]) {
        await rule.run(req as Request);
    }
};

interface ResponseStub {
    headersSent: boolean;
    statusCode: number;
    body?: unknown;
    sentText?: string;
    status(code: number): ResponseStub;
    json(payload: unknown): ResponseStub;
    send(text: string): ResponseStub;
}

const createResponseStub = (): ResponseStub => {
    const res: ResponseStub = {
        statusCode: 200,
        headersSent: false,
        status(code: number) {
            this.statusCode = code;
            return this;
        },
        json(payload: unknown) {
            this.body = payload;
            return this;
        },
        send(text: string) {
            this.sentText = text;
            return this;
        },
    };

    return res;
};

test("greeting sends Hello World! response", { concurrency: false }, () => {
    const res = createResponseStub();
    greeting({} as Request, res as unknown as Response);

    assert.equal(res.sentText, "Hello World!");
});

test("registration handler returns success payload when requirements pass", { concurrency: false }, async () => {
    const req: MutableRequest = {
        body: {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            password: "Password1",
        },
    };
    const res = createResponseStub();
    let nextCalled = false;

    await runRequirements(req);

    validation(req as Request, res as unknown as Response, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.equal(res.body, undefined);

    dataValidation(req as Request, res as unknown as Response, () => undefined);

    assert.equal(res.statusCode, 201);
    assert.deepEqual(res.body, {
        success: true,
        message: "Registration successful",
        user: {
            name: "Jane Doe",
            email: "jane.doe@example.com",
        },
    });
});

test("validation middleware responds with errors when requirements fail", { concurrency: false }, async () => {
    const req: MutableRequest = {
        body: {
            email: "jane.doe@example.com",
            password: "Password1",
        },
    };
    const res = createResponseStub();
    let nextCalled = false;

    await runRequirements(req);

    validation(req as Request, res as unknown as Response, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, false);
    assert.equal(res.statusCode, 400);

    const responseBody = res.body as {
        success: boolean;
        message: string;
        errors: Record<string, string[]>;
    };

    assert.equal(responseBody.success, false);
    assert.equal(responseBody.message, "Validation failed");
    assert.ok(Array.isArray(responseBody.errors.name));
    assert.ok(responseBody.errors.name.includes("Name is required"));
});

test("pageNotFound forwards a 404 error with helpful message", () => {
    const req = { method: "GET", originalUrl: "/missing" } as Request;
    const nextCalls: unknown[] = [];

    pageNotFound(req, {} as Response, (err) => nextCalls.push(err));

    const [firstError] = nextCalls as Array<{ status: number; message: string }>;

    assert.equal(nextCalls.length, 1);
    assert.equal(firstError.status, 404);
    assert.equal(firstError.message, "Cannot GET /missing");
});

test("errorHandler serializes errors into JSON responses", () => {
    const err = Object.assign(new Error("Boom"), { status: 418 });
    const res = createResponseStub();

    errorHandler(err, {} as Request, res as unknown as Response, () => { });

    assert.equal(res.statusCode, 418);
    assert.deepEqual(res.body, {
        success: false,
        message: "Boom",
    });
});
