import React from "react";
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import LoginUser from "./components/Login";
import SignUpUser from "./components/SignUp";
import './App.css'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginUser/>} />
      <Route path="/signup" element={<SignUpUser/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
