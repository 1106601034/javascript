import test from "node:test";
import assert from "node:assert/strict";
import greeting from "../src/controllers/helloWorld/helloWorld.js";
import dataValidationModule from "../src/controllers/dataValidation/dataValidation.js";
import pageNotFound from "../src/middlewares/pageNotFound/pageNotFound.js";
import errorHandler from "../src/middlewares/errorHandler/errorHandler.js";

const { requirements, validation, dataValidation } = dataValidationModule;

const runRequirements = async (req) => {
    for (const rule of requirements) {
        // Run sequentially to ensure each validator has access to prior sanitizers.
        await rule.run(req);
    }
};

const createResponseStub = () => {
    const res = {
        statusCode: 200,
        body: undefined,
        sentText: undefined,
        headersSent: false,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        },
        send(text) {
            this.sentText = text;
            return this;
        },
    };

    return res;
};

test("greeting sends Hello World! response", { concurrency: false }, () => {
    const res = createResponseStub();
    greeting({}, res);

    assert.equal(res.sentText, "Hello World!");
});

test("registration handler returns success payload when requirements pass", { concurrency: false }, async () => {
    const req = {
        body: {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            password: "Password1",
        },
    };
    const res = createResponseStub();
    let nextCalled = false;

    await runRequirements(req);

    validation(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.equal(res.body, undefined);

    dataValidation(req, res);

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
    const req = {
        body: {
            email: "jane.doe@example.com",
            password: "Password1",
        },
    };
    const res = createResponseStub();
    let nextCalled = false;

    await runRequirements(req);

    validation(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, false);
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Validation failed");
    assert.ok(Array.isArray(res.body.errors.name));
    assert.ok(res.body.errors.name.includes("Name is required"));
});

test("pageNotFound forwards a 404 error with helpful message", () => {
    const req = { method: "GET", originalUrl: "/missing" };
    const nextCalls = [];

    pageNotFound(req, {}, (err) => nextCalls.push(err));

    assert.equal(nextCalls.length, 1);
    assert.equal(nextCalls[0].status, 404);
    assert.equal(nextCalls[0].message, "Cannot GET /missing");
});

test("errorHandler serializes errors into JSON responses", () => {
    const err = new Error("Boom");
    err.status = 418;
    const res = createResponseStub();

    errorHandler(err, {}, res, () => {});

    assert.equal(res.statusCode, 418);
    assert.deepEqual(res.body, {
        success: false,
        message: "Boom",
    });
});
