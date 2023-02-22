require("dotenv").config();
const mongoose = require("mongoose");
const userLib = require('./backend/lib/userLib');
const express = require('express');
const app = express();
const port = process.env.PORT || 5010;
app.use(express.json());
app.use(express.static("public"));
const todoLib = require("./backend/lib/toDoItemLib");
const { query } = require("express");

app.get("/", function(req, res){
	res.sendFile(__dirname+"/index.html");
});

app.get("/resume", function(req, res){
	res.sendFile(__dirname+"/resume.html");
});

app.get("/card", function(req, res){
	res.sendFile(__dirname+"/card.html");
});

app.get("/weather", function(req, res){
	res.sendFile(__dirname+"/weather.html");
});

app.get("/todo", function(req, res){
	res.sendFile(__dirname+"/todo.html");
});

app.get("/api/todos",function(req,res){
	todoLib.getAllTodos(function(err,todos){
		if(err){
			res.json({status : "error", message : err, data : null});
		}
		else{
			res.json({status : "success", data : todos});
		}	
	});
});

app.post("/api/todos", function(req,res){
	const todo = req.body;
	todoLib.createTodo(todo, function(err,dbtodo){
		if(err){
			res.json({status : "error", message : err, data : null});
		}
		else{
			res.json({status : "success", data : dbtodo});
		}
	});
});

app.put("/api/todos/:todoid",function(req,res){
	const todo = req.body;
	const todoid = req.params.todoid;
	todoLib.updateTodoById(todoid,todo,function(err,dbtodo){
		if(err){
			res.json({status : "error", message : err, data : null});
		}
		else{
			res.json({status : "success", data : dbtodo});
		}
	});
});

app.delete(("/api/todos/:todoid"),function(req,res){
	const todoid = req.params.todoid;
	todoLib.deleteTodoById(todoid, function(err,dbtodo){
		if(err){
			res.json({status: "error", message: err, data: null});
		}
		else{
			res.json({status: "success", data: dbtodo});
		}
	});
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{},function(err){
	if(err){
		console.error(err);
	}
	else{
		console.log("DB Connected");
		// todoLib.hardDelete(function(err,res){
		// 	if(err){
		// 		console.log(err);
		// 	}
		// 	else{
		// 		console.log(res);
		// 	}
		// });
		app.listen(port, function(){
			console.log("Server running on http://localhost:"+port);
		});
	}
});

