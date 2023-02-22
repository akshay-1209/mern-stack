const mongoose = require("mongoose");

const toDoItemSchema = new mongoose.Schema({
    title : {type : String, required : true, unique : true},
    isCompleted : {type : Boolean, default : false},
    isDeleted : {type : Boolean, default : false},
    createdAt : {type : Date, default : Date.now}
});

module.exports = mongoose.model("item",toDoItemSchema);