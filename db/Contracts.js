const mongoose = require('mongoose');

const contractsSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String
});

module.exports = mongoose.model('contracts', contractsSchema)