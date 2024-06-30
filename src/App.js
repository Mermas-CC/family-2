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
import AddPhoto from './components/AddPhoto';
import PhotoDetail from './pages/PhotoDetail';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <AuthProvider>
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
              path="/add-photo" 
              element={
                <PrivateRoute>
                  <AddPhoto />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/photo/:id" 
              element={
                <PrivateRoute>
                  <PhotoDetail />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/home" 
              element={
                <PrivateRoute>
                  <Home />
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
      </AuthProvider>
    </Router>
  );
}

export default App;
