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

const getAllUsers: RequestHandler = (_req, res) => {
    res.json(USERS);
};

const getUserByID: RequestHandler = (req, res) => {
    const user = {
        id: req.params.id,
        name: "Alice",
    };

    res.json(user);
};

export default { getAllUsers, getUserByID };
