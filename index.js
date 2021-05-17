'use strict';
require("dotenv").config();


// Start up DB Server
const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, options).then(() => {

    console.log("Connected to DB");
    require('./src/server.js').startup(process.env.PORT);
});