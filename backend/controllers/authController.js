// get user controller
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';


// login user
async function loginUser(req, res) {
    const user = new User();
    try {
        const users = await user.getUserByEmail(req.body.email);
        if (users[0].length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const userFound = users[0][0];
        const validPassword = await bcrypt.compare(req.body.password, userFound.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: userFound.id }, JWT_SECRET);
        res.header('auth-token', token).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// signup user
async function signupUser(req, res) {
    const user = new User();
    try {
        const users = await user.getUserByEmail(req.body.email);
        if (users[0].length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const result = await user.createUser(req.body);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//logout user
async function logoutUser(req, res) {
    res.header('auth-token', '').json({ message: 'User logged out successfully' });
}

module.exports = {
    loginUser,
    signupUser,
    logoutUser
};
