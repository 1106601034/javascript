import { isValidObjectId } from "mongoose";
import type { FilterQuery } from "mongoose";
import { forbiddenFields } from "./config.js";
import type { MovieDocument } from "../../models/movie.js";

// alias MovieFilter so anything we build to query Mongo has proper typing.
type MovieFilter = FilterQuery<MovieDocument>;

// This takes whatever came in as body.types and turns it into a clean array of non‑empty strings.
export const normalizeTypes = (rawTypes: unknown): string[] => {
    if (!Array.isArray(rawTypes)) {
        return [];
    }

    return rawTypes
        .map((value) => typeof value === "string" ? value.trim() : "")
        .filter((value) => value.length > 0);
};

// check if id is _id or legacyId.
export const buildMovieFilter = (rawId?: string): MovieFilter | null => {
    // false if rawId is null.
    if (!rawId) {
        return null;
    }
    // if rawId is _id which is from mongoDB then return
    if (isValidObjectId(rawId)) {
        return { _id: rawId };
    }

    return null;
};

// check user input before update by id.
export const sanitizeMovieUpdate = (rawBody: unknown): {
    update?: Record<string, unknown>;
    error?: string;
} => {
    if (!rawBody || typeof rawBody !== "object") {
        return { error: "Request body must be an object" };
    }

    for (const field of forbiddenFields) {
        if (field in rawBody) {
            return { error: `Field "${field}" cannot be modified` };
        }
    }

    const body = rawBody as Record<string, unknown>;
    const update: Record<string, unknown> = {};

    if (typeof body.title === "string" && body.title.trim()) {
        update.title = body.title.trim();
    }

    if (typeof body.description === "string") {
        update.description = body.description.trim();
    }

    if ("legacyId" in body) {
        const legacyId = Number(body.legacyId);
        if (!Number.isFinite(legacyId)) {
            return { error: "legacyId must be a number" };
        }
        update.legacyId = legacyId;
    }

    if ("types" in body) {
        const normalizedTypes = normalizeTypes(body.types);
        if (normalizedTypes.length === 0) {
            return { error: "types must be a non-empty array of strings" };
        }
        update.types = normalizedTypes;
    }

    if (Object.keys(update).length === 0) {
        return { error: "No updatable fields provided" };
    }

    return { update };
};
