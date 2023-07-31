import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import Register from './components/Register';


function App() {
    return (
        <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />


            </Routes>
        </Router>
    );
}

export default App;
