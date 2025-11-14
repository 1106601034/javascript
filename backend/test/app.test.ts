import assert from "node:assert/strict";
import test from "node:test";
import type { Request, Response } from "express";
import type { ValidationChain } from "express-validator";
import greeting from "../src/controllers/helloWorld/helloWorld.js";
import dataValidationModule from "../src/controllers/dataValidation/dataValidation.js";
import pageNotFound from "../src/middlewares/pageNotFound.js";
import errorHandler from "../src/middlewares/errorHandler.js";
import userController from "../src/controllers/users/userController.js";
import {
    updateMovieById,
} from "../src/controllers/movieReview/movie.ts";
import {
    addReviewsByMovie,
    getReviewsByMovie,
} from "../src/controllers/movieReview/review.ts";
import { Movie } from "../src/models/movie.js";
import { Review } from "../src/models/review.js";
import { Types } from "mongoose";

const { requirements, validation, dataValidation } = dataValidationModule;

type MutableRequest = Partial<Request> & {
    body?: Record<string, unknown>;
    params?: Record<string, string>;
};

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

const overrideMovieStatic = <K extends keyof typeof Movie>(
    method: K,
    implementation: unknown,
): (() => void) => {
    const movieTarget = Movie as typeof Movie & Record<string, unknown>;
    const original = movieTarget[method];
    movieTarget[method] = implementation as typeof original;
    return () => {
        movieTarget[method] = original;
    };
};

const overrideReviewStatic = <K extends keyof typeof Review>(
    method: K,
    implementation: unknown,
): (() => void) => {
    const reviewTarget = Review as typeof Review & Record<string, unknown>;
    const original = reviewTarget[method];
    reviewTarget[method] = implementation as typeof original;
    return () => {
        reviewTarget[method] = original;
    };
};

const VALID_MOVIE_ID = "507f191e810c19729de860ea";

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

test("getUserByID returns the requested user when it exists", () => {
    const req = { params: { id: "2" } };
    const res = createResponseStub();

    userController.getUserByID(req as unknown as Request, res as unknown as Response, () => undefined);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, { id: 2, name: "Bob" });
});

test("getUserByID returns a 404 when the user cannot be found", () => {
    const req = { params: { id: "99" } };
    const res = createResponseStub();

    userController.getUserByID(req as unknown as Request, res as unknown as Response, () => undefined);

    assert.equal(res.statusCode, 404);
    assert.deepEqual(res.body, { message: "User not found" });
});

test("getUserByID validates that the id is numeric", () => {
    const req = { params: { id: "abc" } };
    const res = createResponseStub();

    userController.getUserByID(req as unknown as Request, res as unknown as Response, () => undefined);

    assert.equal(res.statusCode, 400);
    assert.deepEqual(res.body, { message: "User id must be a number" });
});

test("updateMovieById rejects attempts to modify restricted fields", { concurrency: false }, async () => {
    const req: MutableRequest = {
        params: { id: VALID_MOVIE_ID },
        body: { reviews: [] },
    };
    const res = createResponseStub();

    await updateMovieById(req as Request, res as unknown as Response, () => undefined);

    assert.equal(res.statusCode, 400);
    assert.deepEqual(res.body, { error: 'Field "reviews" cannot be modified' });
});

test("updateMovieById updates only allowed fields and normalizes payloads", { concurrency: false }, async () => {
    const req: MutableRequest = {
        params: { id: VALID_MOVIE_ID },
        body: {
            title: "  Updated Title ",
            description: "  Updated Description ",
            types: [" Action ", "Drama "],
            legacyId: "42",
        },
    };
    const res = createResponseStub();
    let receivedUpdate: Record<string, unknown> | undefined;

    const restore = overrideMovieStatic("findOneAndUpdate", ((filter: Record<string, unknown>, update: Record<string, unknown>) => {
        receivedUpdate = update;
        return Promise.resolve({
            _id: (filter as { _id: string })._id,
            ...update,
        }) as unknown as ReturnType<typeof Movie.findOneAndUpdate>;
    }) as unknown as typeof Movie.findOneAndUpdate);

    try {
        await updateMovieById(req as Request, res as unknown as Response, () => undefined);
    } finally {
        restore();
    }

    assert.equal(res.statusCode, 200);

    const responseBody = res.body as Record<string, unknown>;
    assert.equal(responseBody.title, "Updated Title");
    assert.deepEqual(receivedUpdate, {
        title: "Updated Title",
        description: "Updated Description",
        types: ["Action", "Drama"],
        legacyId: 42,
    });
});

test("getReviewsByMovie returns stored reviews with metadata", { concurrency: false }, async () => {
    const req: MutableRequest = { params: { id: VALID_MOVIE_ID } };
    const res = createResponseStub();

    const reviewRecord = {
        _id: new Types.ObjectId(),
        rating: 5,
        content: "Great visuals",
        author: "Jane",
        createdAt: new Date("2024-01-01T00:00:00.000Z"),
        updatedAt: new Date("2024-01-01T00:00:00.000Z"),
    };

    const restoreMovie = overrideMovieStatic("findOne", ((_filter: Record<string, unknown>, projection: Record<string, number>) => {
        assert.deepEqual(projection, { title: 1, averageRating: 1, reviewCount: 1 });
        return Promise.resolve({
            _id: new Types.ObjectId(VALID_MOVIE_ID),
            title: "Inception",
            averageRating: 4.5,
            reviewCount: 7,
        }) as unknown as ReturnType<typeof Movie.findOne>;
    }) as unknown as typeof Movie.findOne);

    const restoreReviewFind = overrideReviewStatic("find", ((criteria: Record<string, unknown>) => {
        assert.ok(criteria.movie);
        return {
            sort: () => Promise.resolve([reviewRecord]),
        };
    }) as unknown as typeof Review.find);

    try {
        await getReviewsByMovie(req as Request, res as unknown as Response, () => undefined);
    } finally {
        restoreMovie();
        restoreReviewFind();
    }

    assert.equal(res.statusCode, 200);

    const payload = res.body as {
        title: string;
        averageRating: number;
        reviewCount: number;
        reviews: Array<{ id: string; rating: number; content: string; author: string }>;
    };

    assert.equal(payload.title, "Inception");
    assert.equal(payload.averageRating, 4.5);
    assert.equal(payload.reviewCount, 7);
    assert.equal(payload.reviews.length, 1);
    assert.equal(payload.reviews[0]?.content, "Great visuals");
    assert.equal(payload.reviews[0]?.author, "Jane");
});

test("addReviewsByMovie saves reviews and recalculates averages", { concurrency: false }, async () => {
    const req: MutableRequest = {
        params: { id: VALID_MOVIE_ID },
        body: { rating: 3, comment: "Great visuals" },
    };
    const res = createResponseStub();

    const movieDocument = {
        _id: new Types.ObjectId(VALID_MOVIE_ID),
        title: "Inception",
    };
    const reviewDocument = {
        _id: new Types.ObjectId(),
        movie: movieDocument._id,
        rating: 3,
        content: "Great visuals",
        author: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const restoreMovieFindOne = overrideMovieStatic("findOne", (() => Promise.resolve(movieDocument)) as unknown as typeof Movie.findOne);
    const restoreReviewCreate = overrideReviewStatic("create", ((payload: Record<string, unknown>) => {
        assert.equal(payload.movie, movieDocument._id);
        assert.equal(payload.rating, 3);
        assert.equal(payload.content, "Great visuals");
        return Promise.resolve(reviewDocument);
    }) as unknown as typeof Review.create);

    const restoreAggregate = overrideReviewStatic("aggregate", ((pipeline: unknown[]) => {
        assert.ok(Array.isArray(pipeline));
        return Promise.resolve([{ average: 4, count: 2 }]);
    }) as unknown as typeof Review.aggregate);

    const restoreMovieUpdate = overrideMovieStatic("findByIdAndUpdate", (() => Promise.resolve()) as unknown as typeof Movie.findByIdAndUpdate);

    try {
        await addReviewsByMovie(req as Request, res as unknown as Response, () => undefined);
    } finally {
        restoreMovieFindOne();
        restoreReviewCreate();
        restoreAggregate();
        restoreMovieUpdate();
    }

    assert.equal(res.statusCode, 201);

    const responseBody = res.body as {
        msg: string;
        averageRating: number;
        reviewCount: number;
        review: { id: string; rating: number; content: string };
    };

    assert.equal(responseBody.msg, "Review added successfully");
    assert.equal(responseBody.averageRating, 4);
    assert.equal(responseBody.reviewCount, 2);
    assert.equal(responseBody.review.content, "Great visuals");
    assert.equal(responseBody.review.rating, 3);
});
