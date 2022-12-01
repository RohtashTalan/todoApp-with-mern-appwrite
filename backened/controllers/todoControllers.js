const Todo = require("../model/todoModel");

exports.home = async(req, res) => {
    res.send("Welcome on Todo list home page");
}

// create Todo in DataBase
exports.createTodo = async(req, res)=>{
    try{
        const {title, userId} = req.body;

        //To Check All the details
        if(!title){
            throw new Error("title is required")
        }
        const titleExist = await Todo.findOne({title});

        if(titleExist){
            throw new Error("This TODO is  Already Exists")
        } 

        // inserting into the database
        const todo = await Todo.create({title,userId});
         
        // insert userinto db
        
        res.header("Access-Control-Allow-Origin", "*");
        res.status(201).json({
            success:true,
            message: "Todo Created Successfully",
            todo,
        })

    } catch(err){}
}

// Create Tasks inside Todo Documents
exports.createTask = async(req, res) => {
    try {
        const todoId = req.params.id;
        const {title} = req.body;
        if(title){
        const tasks = await Todo.findByIdAndUpdate(todoId, {$addToSet : {"tasks" : {title}} });
        res.status(201).json({
            success:true,
            message:"task Created Successfully"
        });
    }
    else if(!title){
        res.status(401).json({
            success:false,
            message:"Enter Task"
        });
    }

    } catch (error) {
        
    }
}

// list Todos
exports.listTodos = async(req, res) => {
    const userId = req.params.userId;
    const todosList = await Todo.find({userId},{title:1});
    res.status(201).json({todosList});
}

// list Tasks
exports.listTasks = async(req, res) => {
    const todoId = req.params.id;
    const tasks = await Todo.findById(todoId);
    if(tasks){
        res.status(201).json({tasks});
    } else{
        res.status(401).json({
            message:"No Todo find by Id"
        })
    }
   
}

// Update Todo
exports.updateTodo = async(req, res) => {
    const todoId = req.params.id;
    const title = req.body;
    const todoUpdate = await Todo.findByIdAndUpdate(todoId, title);
    res.status(201).json({
        success:true,
        message:"Todo Updated Successfully"
    })
}

// Update Task
exports.updateTask =  async(req, res) => {
    const id = req.params.id;
    // split id to findandUpdate
    const todoId=id.split("_")[0];
    const taskId=id.split("_")[1];

    // capture task value
    const title = req.body.title;
    
    const updateTask = await Todo.findOneAndUpdate({_id:todoId, "tasks._id":taskId}, { $set: {"tasks.$.updatedAt":Date.now(), "tasks.$.title":title}});


    res.status(201).json({
        success:true,
        message:"Task Updated Successfully"
    })
}

// Delete Todo
exports.deleteTodo = async(req, res) => {
    const todoId = req.params.id;
    const todoUpdate = await Todo.findByIdAndDelete(todoId);
    res.status(201).json({
        success:true,
        message:"Todo Deleted Successfully"
    })
}

// Delete Task
exports.deleteTask =  async(req, res) => {
    const id = req.params.id;
    // split id to find and delete
    const todoId=id.split("_")[0];
    const taskId=id.split("_")[1];

    const getTodo = await Todo.findById(todoId);

    let updatedArray = getTodo.tasks.filter(x => x._id != taskId);
      getTodo.tasks = updatedArray;

    const updateArray = await Todo.findByIdAndUpdate(todoId, getTodo);


    res.status(201).json({
        success:true,
        message:"Task Deleted Successfully",
        updateArray
    })
}

// task Completed
exports.completedTask = async(req, res) => {
    const id = req.params.id;
    // split id to findandUpdate
    const todoId=id.split("_")[0];
    const taskId=id.split("_")[1];

    // capture task value
    const isDone = req.body.isDone;
    
    const updateTask = await Todo.findOneAndUpdate({_id:todoId, "tasks._id":taskId}, { $set: { "tasks.$.isDone":isDone}});


    res.status(201).json({
        success:true,
        message:"Congratulation For Complete Your Task"
    })
}

// Search Query 
exports.searchQuery = async(req,res)=>{
    const userId = req.body.userId;
    const query = req.body.query;
    const regex = new RegExp(query, 'i');

    const searchResult = await Todo.find({ $or:[{title:{ $regex: query, $options: "i"}}, {'tasks.title':{ $regex: query, $options: "i"}}], userId});

    // filter array if it don't have query in title
    searchResult.map((item)=>{
      let arr = item.tasks.filter((task => task.title.match(regex) !== null));
      item.tasks = arr;
    })
    res.status(201).json({
        searchResult
    });

}