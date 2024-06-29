// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GroupProvider } from './context/GroupContext';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import CreateGroup from './components/CreateGroup';
import AddMemory from './components/AddMemory';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

function App() {
  return (
    <AuthProvider>
      <Router>
        <GroupProvider>
          <Header />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/create-group" 
              element={
                <PrivateRoute>
                  <CreateGroup />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/add-memory" 
              element={
                <PrivateRoute>
                  <AddMemory />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } 
            />
          </Routes>
        </GroupProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
