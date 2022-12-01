import React, {useState, useContext, useEffect } from "react";
import { UserId } from "../Dashboard";
import Todos from "./Todos";
import TodoSearch from "./Search";


const TodosApp = () => {
const userId = useContext(UserId);


return(<>
       {/* main conatiner  */}
        <main className="h-5/6 bg-gray-300 h-full">

            <TodoSearch/>
            <Todos />
        </main>

    </>)
}


export default TodosApp;