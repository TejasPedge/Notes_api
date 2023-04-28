const mongoose = require('mongoose');

const Schema = mongoose.Schema

const Notes_Schema = new Schema({
    title : {type : String, required: true},
    body : {type : String, required: true},
    author : {type : String, required: true},
    userId : {type : Schema.Types.ObjectId, ref : 'user', required: true}
});

const Notes_Model = mongoose.model('note',Notes_Schema);

module.exports = {Notes_Model};
