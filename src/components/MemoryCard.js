import React from 'react';

const MemoryCard = ({ memory }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-bold">{memory.title}</h3>
      <p className="text-gray-700">{memory.description}</p>
      <small className="text-gray-500">{new Date(memory.date.seconds * 1000).toLocaleDateString()}</small>
    </div>
  );
};

export default MemoryCard;
