// src/pages/CreateOrJoinGroup.js

import React, { useRef, useState } from 'react';
import { useGroup } from '../context/GroupContext';
import { useNavigate } from 'react-router-dom';

const CreateOrJoinGroup = () => {
  const groupNameRef = useRef();
  const { createGroup, joinGroup } = useGroup();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const groupName = groupNameRef.current.value;
      await createGroup(groupName);
      setSuccess(true);
      setMessage(`Grupo "${groupName}" creado exitosamente!`);
      setTimeout(() => {
        navigate('/');
      }, 5000); // Redirigir después de 5 segundos
    } catch (error) {
      setError('Failed to create group: ' + error.message);
    }
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const groupName = groupNameRef.current.value;
      await joinGroup(groupName);
      setSuccess(true);
      setMessage(`Te has unido al grupo "${groupName}" exitosamente!`);
      setTimeout(() => {
        navigate('/');
      }, 5000); // Redirigir después de 5 segundos
    } catch (error) {
      setError('Failed to join group: ' + error.message);
    }
  };

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
        <div className="relative sm:max-w-sm w-full">
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Crear o Unirse a un Grupo
            </label>
            {success ? (
              <div className="mt-10 text-center">
                <p className="text-green-500">{message}</p>
                <p className="text-gray-500">Redirigiendo al inicio...</p>
              </div>
            ) : (
              <form className="mt-10">
                <div>
                  <input
                    type="text"
                    ref={groupNameRef}
                    required
                    placeholder="Nombre del Grupo"
                    className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <button
                    onClick={handleCreateGroup}
                    className="bg-violet-700 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  >
                    Crear Grupo
                  </button>
                </div>

                <div className="mt-7">
                  <button
                    onClick={handleJoinGroup}
                    className="bg-blue-700 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  >
                    Unirse a Grupo
                  </button>
                </div>
              </form>
            )}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrJoinGroup;
