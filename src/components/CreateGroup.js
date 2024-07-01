// src/components/CreateGroup.js

import React, { useState } from 'react';
import { useGroup } from '../context/GroupContext';
import JoinGroup from './JoinGroup';

const CreateGroup = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [groupName, setGroupName] = useState('');
  const { createGroup, currentGroupName } = useGroup();

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      console.log(`Creating group with name: ${groupName}`);
      const { groupName: createdGroupName } = await createGroup(groupName);
      console.log('Group successfully created');
      setMessage(`Bienvenido a ${createdGroupName}`);
    } catch (error) {
      setError('Failed to create group: ' + error.message);
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {currentGroupName ? (
        <p className="text-2xl font-bold text-green-500 transition transform duration-500 ease-in-out">
          Bienvenido a {currentGroupName}
        </p>
      ) : (
        <div className="w-full max-w-md">
          {isCreating ? (
            <form onSubmit={handleCreateGroup} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groupName">
                  Nombre del Grupo
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                  placeholder="Nombre del Grupo"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Crear Grupo
                </button>
              </div>
            </form>
          ) : (
            <JoinGroup />
          )}
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isCreating ? 'Unirse a un Grupo' : 'Crear un Grupo'}
          </button>
        </div>
      )}
      {error && (
        <p className="text-red-500 text-xs italic mt-4">
          {error}
        </p>
      )}
      {message && (
        <p className="text-green-500 text-xs italic mt-4 transition transform duration-500 ease-in-out">
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateGroup;
