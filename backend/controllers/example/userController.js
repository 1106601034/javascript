const getAllUsers = (req, res) => {
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Caroline" },
    ];
    res.json(users);
};

const getUserByID = (req, res) => {
    const userID = req.params.id;
    const user = {
        id: userID,
        name: 'Alice',
    };
    res.json(user);
};

export default { getAllUsers, getUserByID };