import type { RequestHandler } from "express";

interface User {
    id: number;
    name: string;
}

const USERS: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Caroline" },
];

export const getAllUsers: RequestHandler = (_req, res) => res.json(USERS);

export const getUserByID: RequestHandler = (req, res) => {
    const requestedId = Number(req.params.id);

    if (!Number.isFinite(requestedId)) {
        return res.status(400).json({ message: "User id must be a number" });
    }

    const user = USERS.find((entry) => entry.id === requestedId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
};

