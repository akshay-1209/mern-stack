const { query } = require("express");
const { model, mongo, default: mongoose } = require("mongoose");
const { updateOne } = require("../models/toDoItem");
const toDoModel = require("../models/toDoItem");

module.exports.createTodo = async function(item, callback){
    try{
        var new_todo = new toDoModel(item);
        var result = await new_todo.save();
        callback(null,result);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

module.exports.getAllTodos = async function(callback){
    try{
        var items = await toDoModel.find({isCompleted : false, isDeleted : false});
        callback(null,items);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

module.exports.getTodoByQuery = async function(query, callback){
    try{
        var items = await toDoModel.find(query);
        callback(null,items);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

module.exports.getSingleTodoById = async function(id, callback){
    try{
        var item = await toDoModel.find({_id : id});
        callback(null,item);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

module.exports.updateTodoById = async function(id, data, callback){
    try{
        var result = await toDoModel.updateOne({_id : id},data);
        callback(null,result);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

module.exports.deleteTodoById = async function(id, callback){
    try{
        var data = {isDeleted : true};
        var result = await toDoModel.updateOne({_id : id},data);
        callback(null,result);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

module.exports.hardDelete = async function(callback){
    try{
        var result = await toDoModel.deleteMany({});
        callback(null, result);
    }
    catch(err){
        callback(err,null);
    }
}