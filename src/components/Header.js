// src/components/Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="bg-white bg-opacity-30 shadow-md p-4 flex justify-between items-center rounde fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <img src="https://img.icons8.com/ios-filled/50/000000/family.png" alt="Icon" className="h-8 w-8 mr-2" />
        <Link to="/home" className="text-xl font-bold text-gray-100">Family Memories</Link>
      </div>
      <div className="flex items-center">
        {currentUser && (
          <span className="text-gray-100 mr-4">Welcome, {currentUser.email}</span>
        )}
        {currentUser && (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5v2h4V5a2 2 0 012-2h4a2 2 0 012 2v14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2H9v2a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H9V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2a2 2 0 002-2V5zM16 7l-4 4m0 0l4 4m-4-4h12" />
          </svg>
        </button>
        )}
      </div>
    </header>
  );
};

export default Header;
