require("dotenv").config();
const mongoose = require("mongoose");
const userLib = require('./backend/lib/userLib');
const express = require('express');
const app = express();
const port = process.env.PORT || 5010;

app.get("/", function(req, res){
	//res.send("I am Akshay Tonde");
	res.sendFile(__dirname+"/index.html");
});

app.get("/resume", function(req, res){
	//res.send("I am Akshay Tonde");
	res.sendFile(__dirname+"/resume.html");
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{},function(err){
	if(err){
		console.error(err);
	}
	else{
		console.log("DB Connected");
		// userLib.createFirstUser(function(err,res){
		// 	if(err){
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(res);
		// 	}
		// });
		userLib.getAllUsers(function(err,res){
			if(err){
				console.log(err);
			}
			else{
				console.log(res);
			}
		});
		app.listen(port, function(){
			console.log("Server running on http://localhost:"+port);
		});
	}
});

