import React, {useState, useContext } from "react";
import { UserId } from "../Dashboard";
import axios from "axios";


const TodoSearch = () => {

const userId = useContext(UserId);

  
/*********************************************************************
 *  Searching 
 */

const [searchArray, setSearchArray] = useState(null);
const [noSearchResult, setNoSearchResult] = useState(false);

const searchTodos = async() => {
setNoSearchResult(false);
  const queryString = document.getElementById('search-input').value;
  const regex = new RegExp(queryString, 'i'); 

  {
    await axios.post("/searchQuery", {query:queryString, userId}).then((response) => {
      // result = response.data;
      const todos=response.data.searchResult;

      if(todos.length>0){
       setSearchArray(todos);
      }else{
        setNoSearchResult(true);
      }

  })
}

    document.getElementById('search-input').value=null;
}

const toggleTab = (id) => {

  // selecting and adding hidden class to tasks panels
const tabs= document.querySelectorAll('[role="tabpanel"]');

for(let tab of tabs){
  tab.classList.add('hidden')
}

// toggle of class for which user have slected
document.getElementById(`tab-${id}`).classList.toggle('hidden');

}

return(<>
        
<section className="search-section">
        {/* /// Search Bar  */}
    <div className="flex justify-center w-1/2 mx-auto py-4">
    <div className="input-group relative flex w-full">
      <input id='search-input' type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 text-base font-normal text-gray-700 bg-white bg-clip-paddin rounded-l" placeholder="Query..." />
      <button onClick={()=>{searchTodos()}} className="btn px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  flex items-center" type="button" id="search-button">
        <svg className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
    </div>
  </div>

 
  {/* // search result || no search Result  */}
  {noSearchResult ? (<div onClick={()=>(setNoSearchResult(false))} className="font-bold mx-auto w-52 text-red-700 hover:cursor-pointer p-3"
>No Result Available</div>):('')}


{/* // iterating through array if search result present  */}

  {searchArray ? (
  <div className="overflow-x-auto w-[90%] h-[80%] mx-auto shadow-md sm:rounded-lg modal h-98 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 rounded shadow-lg shadow-gray-900 bg-gray-500 text-white divide-y-2 divide-gray-400" tabIndex='3'> 
  <div className="flex">
  <h1 className="w-full py-2 text-center mx-auto uppercase
  font-bold text-3xl">search Results</h1> 
  <i onClick={()=>{setSearchArray(null)}} className="fa-solid fa-xmark float-right mr-2 text-3xl bg-red-600 py-1 px-2 my-1 rounded text-white shadow hover:bg-gray-500 hover:text-red-700 hover:cursor-pointer hover:shadow-red-700" title="Click to close"></i>
  </div>
  <div className="flex w-full justify-center">
  <h1 className="w-1/6 mx-auto font-bold text-3xl text-center shadow-md shadow-gray-200 rounded-md">Todos</h1>
  <h1 className="w-5/6 mx-auto text-center font-bold text-3xl shadow-md shadow-gray-200 rounded-md ">Task</h1>
  </div>
  {/* // tabs */}
  <div className="flex items-start h-full divide-x-2 divide-gray-400 ">
   
    {/* Tab Title / Todo */}
    <div className="w-1/6 text-center h-full">
          <ul className="flex flex-col flex-wrap list-none border-b-0 pl-0 mt-4 mr-4 text-white divide-y divide-gray-400" id="tabs-tabVertical" role="tablist">
            {searchArray.map((todo)=>(
            <li key={todo._id} onClick={()=>{toggleTab(todo._id)}} className="w-full hover:bg-gray-100 hover:text-gray-800 hover:cursor-pointer h-[2rem] text-center">
              <span className="font-medium text-xs leading-tight uppercase" 
              >{todo.title}</span>
            </li>

            ))}
          </ul>
          </div>

          {/* Tab Content / Tasks */}
          <div className="tab-content w-5/6 h-full" id="tabs-tabContentVertical">
          {searchArray.map((todo)=>(<>
               <div key={todo._id} className="flex w-full flex-col tab-pane fade active mt-4 ml-2 hidden" id={`tab-${todo._id}`}
               role="tabpanel">
              {todo.tasks.length ? (<>
                <div>
                  <div className="flex w-full justify-between font-bold text-blue-800">
                  <span>Title</span>
                  <span>Created At</span>
                  <span>Updated At</span>
                  <span>Status</span>
                  </div> 
                  <hr className="shadow-md shadow-gray-300 h-[1px] bg-gray-700 border-0 dark:bg-gray-700"/>
                {todo.tasks.map((item) => (<>
                  <div className="flex w-full justify-between">
                  <span>{item.title}</span>
                  <span>{item.createdAt} </span>
                  <span>{item.updatedAt} </span>
                  <span>{item.isDone} </span>
                  </div>

                </>))}
             </div></>) : (<><span className="text-gray-900 font-semibold">No Task Available in this Todo With Your Query</span></>)}
             
            
             </div></>
          ))}
          </div>

</div>
</div>
):('')}

</section>

    </>)
}


export default TodoSearch;