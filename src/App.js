import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Users from './Components/Users';
import Navbar from './Components/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Users/>
    </div>
  );
}

export default App;
