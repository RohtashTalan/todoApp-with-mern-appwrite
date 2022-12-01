import React from "react";
import Todos from "./Todos";
import TodoSearch from "./Search";


const TodosApp = () => {

return(<>
       {/* main conatiner  */}
        <main className="h-5/6 bg-gray-300 h-full">

            <TodoSearch/>
            <Todos />
        </main>

    </>)
}


export default TodosApp;