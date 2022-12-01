import React, {useState, useContext, useEffect} from "react";
import { UserId } from "../Dashboard";
import { Appwrite } from "../../appwrite/config";
import { createContext } from "react";

let modalContext = createContext('hello');

const ReactModal = ()=>{
const userId = useContext(UserId);

// Call Modal as per click by user
const [modal, setModal] = useState(null);
const [isModal, setIsModal] = useState(false);

const callModal = (type,id) => {
    switch (type) {
      case 'todoCreate':
         loadModal('Create','Todo',id);
        break;
      case 'todoUpdate':
        loadModal('Update','Todo',id);
        break;
      case 'todoDelete':
        loadModal('Delete','Todo',id);
        break;
      case 'taskCreate':
        loadModal('Create','Task',id);
        break;
      case 'taskUpdate':
        loadModal('Update','Task',id);
        break;
      case 'taskDelete':
        loadModal('Delete','Task',id);
        break;
      default:
        break;
    }
  }
    return(
        <>
        
        </>
    )
}

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
      console.log(Title);
    

      if(type==='Todo'){
        switch(action){
          case 'Create':
            
            break;
        case 'Update':
         
          break;
          default:
            break;
        }
      }

      if(type==='Task'){
        switch (action) {
          case 'Create':
           
            break;
        case 'Update':
          
          break;
          default:
            break;
        }
      }

      document.getElementById('title').value='';
      document.getElementById('success').classList.toggle('hidden');
    }
      const handleClose = () => {
          document.getElementById('modal').classList.toggle('hidden');
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

const callModal = (type,id) => {
  switch (type) {
    case 'todoCreate':
      return loadModal('Create','Todo',id);
      break;
    case 'todoUpdate':
      loadModal('Update','Todo',id);
      break;
    case 'todoDelete':
      loadModal('Delete','Todo',id);
      break;
    case 'taskCreate':
      loadModal('Create','Task',id);
      break;
    case 'taskUpdate':
      loadModal('Update','Task',id);
      break;
    case 'taskDelete':
      loadModal('Delete','Task',id);
      break;
    default:
      break;
  }
}

const deleteModal = async (type, id) => {
    if (type === 'Todo') {
      
    }

    if (type === 'Task') {
     
    }

  }

const taskIsDone = async(id,isDone)=>{
}



export default ReactModal;
export {loadModal,callModal,deleteModal,taskIsDone,modalContext }