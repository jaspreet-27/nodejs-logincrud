const mongoose = require('mongoose');
const myScema =  new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    deviceType: { type: String, default: null },
    token: { type: String, default: null }
},{ versionKey: false });

const user = mongoose.model("user", myScema);
module.exports = user;
