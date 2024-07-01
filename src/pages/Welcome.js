// src/pages/Welcome.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="flex flex-col md:flex-row items-center bg-white bg-opacity-0 p-8 rounded-lg shadow-lg max-w-6xl w-4/5">
        <div className="md:w-1/2 md:mr-8">
          <h1 className="text-7xl font-bold mb-4 text-white">Welcome to memory sites</h1>
          <p className="text-lg mb-6 text-white">This is a social network to help families remember their loved ones.</p>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-violet-700 text-white py-2 px-6 rounded-full hover:bg-violet-500"
            >
              Ingresar
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-violet-700 text-white py-2 px-6 rounded-full hover:bg-violet-500"
            >
              Crear cuenta
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2">
          <img src="https://images.unsplash.com/photo-1584653221233-8a5a19017c1c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Memory Sites" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
