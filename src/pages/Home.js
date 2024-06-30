// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGroup } from '../context/GroupContext';
import { useNavigate } from 'react-router-dom';
import { getPhotos } from '../firebase';

const Home = () => {
  const { currentUser } = useAuth();
  const { currentGroup, currentGroupName, groupMembers } = useGroup();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (currentGroup) {
        const photoList = await getPhotos(currentGroup);
        setPhotos(photoList);
      }
    };

    fetchPhotos();
  }, [currentGroup]);

  const handlePhotoClick = (photoId) => {
    navigate(`/photo/${photoId}`);
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
            <h2 className="text-xl font-semibold mt-6 mb-2">Fotos del grupo:</h2>
            <div className="grid grid-cols-1 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="cursor-pointer" onClick={() => handlePhotoClick(photo.id)}>
                  <img src={photo.imageUrl} alt={photo.title} className="w-full h-40 object-cover rounded-lg shadow-md" />
                  <p className="mt-2 text-gray-700 font-semibold">{photo.title}</p>
                  <p className="text-gray-500 text-sm">{photo.description}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/add-photo')} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">
              Añadir Foto
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4">No estás en ningún grupo familiar.</p>
            <button onClick={() => navigate('/create-group')} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Crear o Unirse a un Grupo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
