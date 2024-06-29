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
    <div>
      <h1>Welcome, {currentUser?.email}</h1>
      {currentGroupName ? (
        <div>
          <p>Estás en el grupo: {currentGroupName}</p>
          <h2>Miembros del grupo:</h2>
          <ul>
            {groupMembers.map((member) => (
              <li key={member.id}>{member.name} {member.lastName}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>No estás en ningún grupo familiar.</p>
          <button onClick={handleGroupNavigation}>Crear o Unirse a un Grupo</button>
        </div>
      )}
    </div>
  );
};

export default Home;
