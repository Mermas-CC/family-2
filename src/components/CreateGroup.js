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
    <div>
      {currentGroupName ? (
        <p>Bienvenido a {currentGroupName}</p>
      ) : (
        <div>
          {isCreating ? (
            <form onSubmit={handleCreateGroup}>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                placeholder="Group Name"
              />
              <button type="submit">Create Group</button>
            </form>
          ) : (
            <JoinGroup />
          )}
          <button onClick={() => setIsCreating(!isCreating)}>
            {isCreating ? 'Unirse a un Grupo' : 'Crear un Grupo'}
          </button>
        </div>
      )}
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateGroup;
