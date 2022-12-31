const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    mobile:Number,
});

module.exports = mongoose.model('users', userSchema)