import React from "react";
import axios from "axios";


export const crudFunction = async(type,action,id,title)=>{

// Todos Crud
    if(type==='Todo'){
        if (action === 'Create') {
            let result = '';
             await axios.post('/createTodo', { title, 'userId': id }).then((response) => {
                result = response.data;
            })
            return result;
        }
        else if (action === 'Read') {
            let result = '';
             await axios.get('/listTodos/' + id).then((response) => {
                result = response.data;
            })
            return result;
        }
        else if (action === 'Update') {
            let result = '';
            await axios.put('/updateTodo/' + id,{title}).then((response) => {
                result = response.data;
            })
            return result;
        }
        else if (action === 'Delete') {
            let result = '';
            await axios.delete('/deleteTodo/' + id).then((response) => {
                result = response.data.message;
            })
            return result;
        }

    }
    // Tasks CRUD
    if(type==='Task'){
        if (action === 'Create') {
            let result = '';
             await axios.put('/createTask/'+id,{title}).then((response) => {
                result = response.data;
            })
            return result;
        }
        else if (action === 'Read') {
            let result = '';
             await axios.get('/listTasks/' + id).then((response) => {
                result = response.data.tasks;
            })
            return result;
        }
        else if (action === 'Update') {
            let result = '';
            await axios.put('/updateTask/' + id,{title}).then((response) => {
                result = response.data;
            })
            return result;
        }
        else if (action === 'Delete') {
            let result = '';
            await axios.delete('/deleteTask/' + id).then((response) => {
                result = response.data.message;
            })
            return result;
        }
        else if (action === 'isDone') {
            let result = '';
            await axios.put('/completedTask/' + id,{isDone:title}).then((response) => {
                result = response.data.message;
            })
            return result;
        }

}

}