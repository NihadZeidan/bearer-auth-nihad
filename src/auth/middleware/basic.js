'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');
const jwt = require("jsonwebtoken")

module.exports = async(req, res, next) => {

    if (!req.headers.authorization) { return next('No auth provided'); }

    let basic = req.headers.authorization;

    let encoded = basic.split(" ").pop();

    let decode = base64.decode(encoded)

    let [user, pass] = decode.split(":");

    // console.log(user);
    // console.log(pass);


    try {
        req.user = await User.authenticateBasic(user, pass);
        next();
    } catch (e) {
        res.status(403).send('Invalid Login');
    }

}