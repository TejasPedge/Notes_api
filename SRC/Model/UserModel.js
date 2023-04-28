const mongoose = require('mongoose');

const User_Schema = mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
},{versionKey : false});

const User_Model = mongoose.model('user',User_Schema);

module.exports = {User_Model};