// get user controller
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Customers = require('../models/customers');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwtUtils');
require('dotenv').config();

//TODO: implement use of cookies for storing the token and logging out the user instead of using the auth-token header

//! disadvantage of using header is that it is not secure and can be easily manipulated by the user


// login user
async function loginUser(req, res) {
    const user = new User();
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const users = await user.getUserByEmail(email);
        if (users[0][0].length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const userFound = users[0][0][0];
        const validPassword = await bcrypt.compare(password, userFound.upassword);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = generateAccessToken(userFound);
        const refreshToken = generateRefreshToken(userFound);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            sameSite: 'Strict', // Adjust according to your needs
        });

        res.cookie('accessToken',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            sameSite: 'Strict', // Adjust according to your needs
        })

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// signup user
async function signupUser(req, res) {
    const user = new User();
    try {
        const { fname, lname, email, password } = req.body;
        const users = await user.getUserByEmail(email);
        if (users[0][0].length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const result = await user.createUser({
            fname,
            lname,
            email,
            password:encryptedPassword
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//logout user
async function logoutUser(req, res) {
    try {
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

const refreshAccessToken = (req,res) =>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user) =>{
        if(err) return res.sendStatus(403);
        const newAccessToken = generateAccessToken(user);
        res.cookie('accessToken',newAccessToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            sameSite: 'Strict', // Adjust according to your needs
        })
    })
}

module.exports = {
    loginUser,
    signupUser,
    logoutUser,
    refreshAccessToken
};
