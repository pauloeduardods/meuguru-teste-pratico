import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateUser from './Pages/Create';
import Edit from './Pages/Edit';
import Home from './Pages/Home';
import Login from './Pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/register" element={<CreateUser />} />
      <Route path="/login/edit" element={<Edit />} />
    </Routes>
  );
}

export default App;
