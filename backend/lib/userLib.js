import mongoose from "mongoose";
import userModel from "../models/userModels.js";

export const getAllUsers = async function(callback){
    try{
        var users = await userModel.find({});
        callback(null,users)
    }
    catch(err){
        callback(err,null);
    }
}

export const createFirstUser = async function(callback){
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

export const createUser = async function(user, callback){
    try{
        var new_user = new userModel(user);
        var result = await new_user.save();
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

export const updateUser = async function(USERNAME,data,callback){
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

export const deleteUser = async function(USERNAME, callback){
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

export const getUserByFilter = async function(filter, callback){
    try{
        var user = await userModel.find(filter);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

