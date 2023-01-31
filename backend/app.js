require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const app = express();
const router = require("./routes/todoRoutes");
const cookieParser = require('cookie-parser');


// middle ware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectToDB();
app.use(cookieParser());
app.use("/", router);





module.exports=app;