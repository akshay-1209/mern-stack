import mongoose from "mongoose";
import toDoModel from "../models/toDoItem.js";

export async function createTodo(item, callback){
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

export async function getAllTodos(callback){
    try{
        var items = await toDoModel.find({isDeleted : false, isCompleted : false});
        callback(null,items);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function getAllCompleted(callback){
    try{
        var items = await toDoModel.find({isCompleted : true, isDeleted : false});
        callback(null,items);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function getAllDeleted(callback){
    try{
        var items = await toDoModel.find({isDeleted : true});
        callback(null,items);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function getTodoByQuery(query, callback){
    try{
        var items = await toDoModel.find(query);
        callback(null,items);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function getSingleTodoById(id, callback){
    try{
        var item = await toDoModel.find({_id : id});
        callback(null,item);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function updateTodoById(id, data, callback){
    try{
        var result = await toDoModel.updateOne({_id : id},data);
        callback(null,result);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function deleteTodoById(id, callback){
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

export async function hardDelete(callback){
    try{
        var result = await toDoModel.deleteMany({});
        callback(null, result);
    }
    catch(err){
        callback(err,null);
    }
}