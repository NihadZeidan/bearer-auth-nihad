'use strict';

require("dotenv").config();

const base64 = require('base-64');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET || 'toes'

const users = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Adds a virtual field to the schema. We can see it, but it never persists
// So, on every user object ... this.token is now readable!
users.virtual('token').get(function() {
    let tokenObject = {
        username: this.username,
    }
    return jwt.sign(tokenObject, SECRET, { // I encoded the token using base64 dependency
        expiresIn: 60 * 15 //expires in 15 min = 900 s
    });
    // console.log(base64.decode(token));
    // return token

});

users.pre('save', async function(next) {
    // if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
    // }
});

// BASIC AUTH
users.statics.authenticateBasic = async function(username, pass) {

    const user = await this.findOne({ username: username });
    const valid = await bcrypt.compare(pass, user.password);
    // console.log(valid);

    if (valid) {
        // let token = jwt.sign({ username: user.username }, SECRET);

        return user
    } else {
        throw new Error('Invalid User');
    }
}

// BEARER AUTH
users.statics.authenticateWithToken = async function(token) {
    try {
        const parsedToken = jwt.verify(token, SECRET);
        const userX = await this.findOne({ username: parsedToken.username });

        if (userX) { return userX; }
        throw new Error("User Not Found");
        // console.log(parsedToken);
    } catch (e) {
        throw new Error(e.message)
    }
}




module.exports = mongoose.model('users', users);