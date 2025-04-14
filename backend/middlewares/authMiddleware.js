const { verifyAccessToken } = require("../utils/jwtUtils")
require('dotenv').config();

const authenticateAccessToken = (req,res,next) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken) return res.sendStatus(401);

    const verified = verifyAccessToken(accessToken);

    if(!verified) return res.sendStatus(401);

    req.user = verified;
    next();
}

//TODO : create function for role based authentication

module.exports = {
    authenticateAccessToken
}