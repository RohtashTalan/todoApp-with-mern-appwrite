const express = require("express");
const router = express.Router();
const {home, createTodo, createTask, listTasks, listTodos, updateTodo, updateTask, deleteTodo, deleteTask, completedTask,searchQuery} = require("../controllers/todoControllers");



router.get("/",home);
router.post("/createTodo",createTodo);
router.put("/createTask/:id", createTask);
router.get("/listTodos/:userId", listTodos);
router.get("/listTasks/:id", listTasks);
router.put("/updateTodo/:id", updateTodo);
router.put("/updateTask/:id", updateTask);
router.delete("/deleteTodo/:id", deleteTodo);
router.delete("/deleteTask/:id", deleteTask);
router.put("/completedTask/:id", completedTask);
router.post("/searchQuery", searchQuery);


module.exports=router;