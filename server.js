import {config} from "dotenv";
config();
import mongoose from "mongoose";
import * as userLib from './backend/lib/userLib.js';
import express,{request} from "express";
const app = express();
const port = process.env.PORT || 5010;
app.use(express.json());
app.use(express.static("public"));
import * as todoLib from "./backend/lib/toDoItemLib.js";
const _dirname = process.cwd();
app.get("/", function(req, res){
	res.sendFile(_dirname+"/index.html");
});

app.get("/resume", function(req, res){
	res.sendFile(_dirname+"/resume.html");
});

app.get("/card", function(req, res){
	res.sendFile(_dirname+"/card.html");
});

app.get("/weather", function(req, res){
	res.sendFile(_dirname+"/weather.html");
});

app.get("/todo", function(req, res){
	res.sendFile(_dirname+"/todo.html");
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

app.get("/api/getnull",function(req,res){
	todoLib.getAllNull(function(err,todos){
		if(err){
			res.json({status : "error", message : err, data : null});
		}
		else{
			res.json({status : "success", data : todos});
		}	
	});
});

app.get("/api/iscompleted",function(req,res){
	todoLib.getAllCompleted(function(err,todos){
		if(err){
			res.json({status : "error", message : err, data : null});
		}
		else{
			res.json({status : "success", data : todos});
		}	
	});
});

app.get("/api/isdeleted",function(req,res){
	todoLib.getAllDeleted(function(err,todos){
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

		// This Hard Delete Function is run everytime before running the program only for testing purposes 
		todoLib.hardDelete(function(err,res){
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

