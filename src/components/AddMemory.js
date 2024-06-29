// src/components/AddMemory.js

import React, { useRef, useState } from 'react';
import { useGroup } from '../context/GroupContext';

const AddMemory = () => {
  const memoryRef = useRef();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { addMemoryToGroup, currentGroupName } = useGroup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      const memoryContent = memoryRef.current.value;
      console.log(`Adding memory: ${memoryContent}`);
      await addMemoryToGroup({ content: memoryContent });
      console.log('Memory successfully added');
      setMessage(`Memory added to ${currentGroupName}`);
    } catch (error) {
      setError('Failed to add memory: ' + error.message);
      console.error('Error adding memory:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea ref={memoryRef} required placeholder="Share your memory..." />
        <button type="submit">Add Memory</button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddMemory;
