import React, { createContext, useEffect, useState } from "react";
import {Appwrite} from '../appwrite/config';
import { useNavigate } from "react-router-dom";
import TodosApp from "./todoApp/TodoApp";

const UserId = createContext();


const Dashboard = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState();

    
    const signOutUser = async() =>{
        Appwrite.ACCOUNT.deleteSessions();
        navigate("/");
    } 
    
    useEffect(() => {
        const getUser = Appwrite.ACCOUNT.get();
        getUser.then(
            function (response) {
                setUserDetails(response);
                console.log(userDetails);
            },
            function (error) {
                console.log(error);
            }
        )
    }, []);

return(
    <>
{userDetails ? (
<div className="bg-gray-200 h-screen">
    {/* Header  */}
    <header className="h-18">
        <nav className="bg-gray-900 text-white p-4">
            <div className="flex justify-between text-3xl">
            <div>Logo</div>

            <div><i className="fa-solid fa-user bg-gray-700 p-2 rounded-lg"></i>  {userDetails && userDetails.name+ '  '} 
            <i onClick={()=>{signOutUser()}}  className="fa-solid fa-right-from-bracket bg-red-700 p-2 rounded-lg hover:cursor-pointer" title="Click to Sign Out"></i>
                </div>
            </div>
        </nav>
    </header>

<UserId.Provider value={userDetails && userDetails.$id}>
    <TodosApp />
</UserId.Provider>

     {/* Footer  */}
     <footer className="bg-gray-900 p-4 w-full h-16">
            <div>

            </div>
        </footer>
    </div>
    ):(<div className="font-bold text-blue-700 bg-gray-200 w-screen h-screen flex">
        <a href="/" className="text-center mx-auto p-12">SignIn First</a>
    </div>)

}
</>
)
}


export default Dashboard;
export {UserId};