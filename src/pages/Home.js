// src/pages/Home.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGroup } from '../context/GroupContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useAuth();
  const { currentGroupName, groupMembers } = useGroup();
  const navigate = useNavigate();

  const handleGroupNavigation = () => {
    navigate('/create-group');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Welcome, {currentUser?.email}</h1>
        {currentGroupName ? (
          <div>
            <p className="mb-4">Estás en el grupo: <span className="font-semibold">{currentGroupName}</span></p>
            <h2 className="text-xl font-semibold mb-2">Miembros del grupo:</h2>
            <ul className="list-disc list-inside">
              {groupMembers.map((member) => (
                <li key={member.id}>{member.name} {member.lastName}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <p className="mb-4">No estás en ningún grupo familiar.</p>
            <button onClick={handleGroupNavigation} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Crear o Unirse a un Grupo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
