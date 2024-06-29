// src/components/JoinGroup.js

import React, { useRef, useState } from 'react';
import { useGroup } from '../context/GroupContext';

const JoinGroup = () => {
  const groupNameRef = useRef();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { joinGroup } = useGroup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      const groupName = groupNameRef.current.value;
      console.log(`Joining group with name: ${groupName}`);
      await joinGroup(groupName);
      console.log('Successfully joined group');
      setMessage(`Successfully joined ${groupName}`);
    } catch (error) {
      setError('Failed to join group: ' + error.message);
      console.error('Error joining group:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={groupNameRef} required placeholder="Group Name" />
        <button type="submit">Join Group</button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default JoinGroup;
