const dbConnection = require("../config/dbConnect");
const User = require("../models/user");

async function getUsers(req, res) {
    const user = new User();
    try {
        const users = await user.getUsers();
        res.status(200).json(users[0][0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserById(req, res) {
    const user = new User();
    try {
        const users = await user.getUserById(req.params.id);
        res.json(users[0][0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function createUser(req,res) {
    const user = new User();
    try {
        const users = user.createUser(req.body);
        res.json(users[0][0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    const user = new User();
    try {
        const users = user.updateUser(req.params.id, req.body);
        res.json(users[0][0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    const user = new User();
    try {
        const users = user.deleteUser(req.params.id);
        res.json(users[0][0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};