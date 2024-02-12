const jwt = require("jsonwebtoken");
const secret = require("../index");
const { json } = require("express");
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
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

}

module.exports = userMiddleware;