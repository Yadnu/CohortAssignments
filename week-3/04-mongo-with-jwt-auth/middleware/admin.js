// Middleware for handling auth
const jwt = require("jsonwebtoken");
const {secret} = require("../config");
const { json } = require("express");
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    const auth = req.headers.authorization;
    const words = token.split(" ");
    const token = words[1];
    const decocodedValue = jwt.verify(token, secret);
    if(decocodedValue.username){
        next();
    }
    else{
        res.status(403).json({
            msg: "Authentication required"
        })
    }


    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;