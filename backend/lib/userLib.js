const { model } = require("mongoose");
const userModel = require("../models/userModels");

module.exports.getAllUsers = async function(callback){
    try{
        var users = await userModel.find({});
        callback(null,users)
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.createFirstUser = async function(callback){
    try{
        var user = {
            userName : "akshay",
            yearOfGraduation : 2024,
        }
        var new_user = new userModel(user);
        var result = await new_user.save();
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.createUser = async function(user, callback){
    try{
        var new_user = new userModel(user);
        var result = await new_user.save();
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.updateUser = async function(USERNAME,data,callback){
    try{
        var query = {
            userName : USERNAME
        };
        var result = await userModel.updateOne(query,data);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.deleteUser = async function(USERNAME, callback){
    try{
        var query = {
            userName : USERNAME
        };
        var result = await userModel.deleteOne(query);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.getUserByFilter = async function(filter, callback){
    try{
        var user = await userModel.find(filter);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

