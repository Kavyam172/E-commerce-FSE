const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessSecret = process.env.JWT_ACCESS_SECRET || 'secret';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'secret';

const generateAccessToken = (user) => {
    return jwt.sign(user, accessSecret, { expiresIn: '1h' });
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, refreshSecret, { expiresIn: '7d' });
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, accessSecret);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, refreshSecret);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}
