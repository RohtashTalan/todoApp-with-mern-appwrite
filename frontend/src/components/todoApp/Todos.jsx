import React, {useState, useContext, useEffect } from "react";
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import { UserId } from "../Dashboard";
import {loadModal,callModal,deleteModal,taskIsDone} from './Modals';
import{crudFunction} from './TodoAppCRUD';

const Todos = () => {
const userId = useContext(UserId);  // call userId

    // state for todolist
const [todosList, setTodosList] = useState([]);
const [tasksList, setTasksList] = useState([]);
const [tasksTodo, setTasksTodo] = useState();

const getTodos = () => {
 crudFunction('Todo','Read',userId,null).then((res)=>{
    setTodosList(res.todosList);
   })
}

useEffect(()=>{
  getTodos();
},[userId]);

const getTasks = (id) =>{
    crudFunction('Task','Read',id,null).then((res)=>{
        setTasksList(res.tasks);
        res.tasks='';
        setTasksTodo(res);
       })
 }


// Call Modal as per click by user
const [modal, setModal] = useState(null);
const [isModal, setIsModal] = useState(false);

const loadModal = (action,type,id) =>{
    const modal = {
      title:action +' '+type,
      placeholder:'Enter '+type+' Name',
      button:action
    }
      // handle submit of form
      const handleSubmit = async(event) =>{
        event.preventDefault();
        const Title = document.getElementById('title').value;
        crudFunction(type,action,id,Title).then((res)=>{
            // console.log(res.message);
           if(type=='Todo'){getTodos();}
           if(type=='Task'){getTasks(tasksTodo._id);}

      })
  
        document.getElementById('title').value='';
        document.getElementById('success').classList.toggle('hidden');
      }
      const handleClose = () => {
            document.getElementById('modal').classList.toggle('hidden');
            setIsModal(false);
        };
  
    return(
      <>
      {/* ********** modal  */}
      <div className="modal fade h-98 fixed top-1/3 left-1/2 w-96 -translate-x-2/4 -translate-y-2/4 rounded shadow-lg shadow-gray-900 outline" id="modal" tabIndex="-1">
        <div className="modal-dialog pointer-events-none relative w-auto">
          <div className="modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
            <div className="modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4">
              <h5 className="text-xl font-medium leading-normal text-gray-800" id="modalTitle">{modal.title}</h5>
              <button type="button" className="btn-close box-content h-4 w-4 rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" onClick={handleClose}>X</button>
            </div>
            <div className="modal-body relative p-4">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-6">
                  <input onFocus={()=>(document.getElementById('success').classList.add('hidden'))} type="text" className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none" name="title" id="title" placeholder={modal.placeholder} />
                </div>
                <button type="submit" className="w-full rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg" id="modalSubmitButton">{modal.button}</button>
              </form>
            </div>
      
            <div className="modal-footer flex flex-col justify-center rounded-b-md border-t border-gray-200 p-4 hidden" id="success">
              <h1 className="mb-1 text-center font-medium text-green-700" >
                <strong>{type} {action}d  Successfully</strong> <br />
                click on Close
              </h1>
              <button type="button" className="rounded bg-purple-600 w-32 mx-auto px-6 py-2.5 text-xs font-medium uppercase text-white shadow-md hover:bg-purple-700 hover:shadow-lg" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
      
      </>)
  }

const callModal = (type,id,isdone) => {
  switch (type) {
    case 'todoCreate':
     setIsModal(true);
     setModal(loadModal('Create','Todo',id));
      break;
    case 'todoUpdate':
      setModal(loadModal('Update','Todo',id));
      setIsModal(true);
      break;
    case 'todoDelete':
      crudFunction('Todo','Delete',id,null).then((res)=>{
        // console.log(res);
        getTodos();
      })
      break;
    case 'taskCreate':
      setIsModal(true);
      setModal(loadModal('Create','Task',id));
      break;
    case 'taskUpdate':
      setIsModal(true);
      setModal(loadModal('Update','Task',id));
      break;
    case 'taskDelete':
      crudFunction('Task','Delete',id,null).then((res)=>{
        // console.log(res);
        getTodos(tasksTodo._id);
        })
      break;
    case 'isDone':
       crudFunction('Task','isDone',id,isdone).then((res)=>{
        // console.log(res);
        getTasks(tasksTodo._id);
        })
    break;
    default:
      break;
  }
  

}

  

return(<>
      {/* Todo Task listing and updatings */}
            <div className="w-full flex px-2 py-4 pb-24 h-full divide-x-2">

                {/* *** TODOS LIST LEFT SIDE*** */}
                <div className="w-1/5 h-full bg-gray-300 h-[90%]">
                <div className="p-1 rounded bg-blue-800 flex justify-between mb-2 text-white">
                        <h2 className="m-auto text-2xl font-bold text-gray-200">Todos List</h2>
                        <i onClick={()=>{
                           callModal('todoCreate',userId)
                            }} className="fa-solid fa-plus bg-gray-800 p-2 rounded-lg text-center text-2xl hover:cursor-pointer hover:cursor-pointer hover:bg-blue-600 pr-2"></i>
                    </div>
    <div className="h-full overflow-y-auto px-2">   
            {todosList && todosList.map((todos)=>(
                <div key={todos._id} className="flex w-full bg-gray-400 rounded shadow-lg mb-2">
                    <div className="w-4/6 text-gray-900 hover:bg-blue-800 hover:text-white hover:rounded hover:cursor-pointer py-2 p-2">
                        <a onClick={()=>{getTasks(todos._id)}}>
                        <h1 className="font-bold text-xl m-auto">
                            {todos.title}
                        </h1>
                        </a>
                    </div>
                    <div className="flex h-[2rem] px-2 m-auto w-2/6 justify-between text-white">
                        <i onClick={()=>{callModal('todoUpdate',todos._id)}} className="fa-regular fa-pen-to-square bg-gray-800 p-2 rounded text-center hover:cursor-pointer hover:cursor-pointer hover:bg-blue-600"></i>
                        <i onClick={()=>{callModal('todoDelete',todos._id)}} className="fa-solid fa-trash-can bg-gray-800 p-2 rounded text-center hover:cursor-pointer hover:bg-blue-600"></i>
                    </div>
                </div> ))}   
    </div>

                </div>
                
        {/* *** TASKS LIST RIGHT SIDE*** */}
        <div className="w-4/5 h-[90%] px-3" id='tasksList-section'>
            {tasksTodo ? (<><div className="p-1 rounded bg-blue-800 flex justify-between mb-2 text-white">
                <h2 className="m-auto text-2xl font-bold text-gray-200">Todo List <span className="text-2xl font-bold py-4 px-2 uppercase">: {tasksTodo.title}</span></h2>
                <div className="pr-2">
                    <i onClick={() => { callModal('taskCreate', tasksTodo._id) }} className="fa-solid fa-plus bg-gray-800 p-2 rounded-lg text-center text-2xl hover:cursor-pointer hover:cursor-pointer hover:bg-blue-600"></i>
                </div>
            </div>

                <div className="h-full overflow-y-auto px-2">
                    {/* // Task Incompleted */}
                    <h1 className="font-bold text-2xl text-yellow-800 mb-1">Task Incompleted :</h1>
                    {tasksList.map((item) => (<>
                        {item.isDone ? ('')
                            : (<div key={item.taskId} className="flex w-full bg-gray-400 rounded p-2 shadow-lg mb-2">
                                <i onClick={() => { callModal('isDone',tasksTodo._id+'_'+item._id,true) }} className="fa-regular fa-square p-2 rounded text-center hover:cursor-pointer hover:bg-blue-600 mr-2 text-orange-700"></i>

                                <h1 className="w-5/6 font-bold text-gray-900 text-2xl m-auto">
                                    {item.title}
                                </h1>
                                <div className="flex w-1/6 justify-end text-white">
                                    <i onClick={() => { callModal('taskUpdate',tasksTodo._id+'_'+item._id) }} className="fa-regular fa-pen-to-square bg-gray-800 p-2 rounded text-center hover:cursor-pointer hover:cursor-pointer hover:bg-blue-600"></i>
                                    <i onClick={() => { callModal('taskDelete',tasksTodo._id+'_'+item._id) }} className="fa-solid fa-trash-can bg-gray-800 p-2 rounded text-center hover:cursor-pointer hover:bg-blue-600 mx-6"></i>
                                </div>
                            </div>)}
                    </>))}

                    {/* // Task Completed */}

                    <h1 className="font-bold text-2xl text-green-700 mb-1">Task completed :</h1>
                    {tasksList.map((item) => (<>
                        {item.isDone ? (<div key={item.taskId} className="flex w-full bg-gray-400 rounded p-2 shadow-lg mb-2">
                                <i onClick={() => { callModal('isDone',tasksTodo._id+'_'+item._id,false)}} className="fa-solid fa-check-double p-2 rounded text-center hover:cursor-pointer hover:bg-blue-600 mr-2 text-orange-700"></i>

                                <h1 className="w-5/6 font-bold text-gray-900 text-2xl m-auto">
                                    {item.title}
                                </h1>
                                <div className="flex w-1/6 justify-end text-white">
                                    <i onClick={() => { callModal('taskUpdate',tasksTodo._id+'_'+item._id)}} className="fa-regular fa-pen-to-square bg-gray-800 p-2 rounded text-center hover:cursor-pointer hover:cursor-pointer hover:bg-blue-600"></i>
                                    <i onClick={() => { callModal('taskDelete',tasksTodo._id+'_'+item._id)}} className="fa-solid fa-trash-can bg-gray-800 p-2 rounded text-center hover:cursor-pointer hover:bg-blue-600 mx-6"></i>
                                </div>
                            </div>) : ('')}
                    </>))}

                </div>
            
            </>) : ('')}

        </div>

                {isModal ? (modal):('')}
            </div>


    </>)
}


export default Todos;