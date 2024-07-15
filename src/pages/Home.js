// src/pages/Home.js

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGroup } from '../context/GroupContext';
import { useNavigate } from 'react-router-dom';
import { getPhotos } from '../firebase';

const Home = () => {
  const { currentUser } = useAuth();
  const { currentGroup, currentGroupName, groupMembers, setGroupMembers } = useGroup();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  const observer = useRef();
  const lastPhotoElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && lastVisible) {
        loadMorePhotos();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, lastVisible]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchPhotosAndMembers = async () => {
      if (currentGroup) {
        setLoading(true);
        const { photoList, newLastVisible } = await getPhotos(currentGroup);
        setPhotos(photoList);
        setLastVisible(newLastVisible);
        setLoading(false);
      }
    };

    fetchPhotosAndMembers();
  }, [currentGroup]);

  const loadMorePhotos = async () => {
    setLoading(true);
    const { photoList, newLastVisible } = await getPhotos(currentGroup, lastVisible);
    setPhotos(prevPhotos => [...prevPhotos, ...photoList]);
    setLastVisible(newLastVisible);
    setLoading(false);
  };

  const handlePhotoClick = (photoId) => {
    navigate(`/photo/${photoId}`);
  };

  const toggleMembers = () => {
    setShowMembers(!showMembers);
  };

  return (
    <div>
      <h1 className="text-8xl font-bold mb-6 text-white ml-[10%] mt-[10%]">Welcome</h1>
      <p className="text-2xl  mb-6 text-white ml-[10%] ">Recuerda estas bellas experiencias junto con tu familia</p>
      <button onClick={() => navigate('/add-photo')} className="bg-violet-700 text-white py-4 px-8 text-xl rounded-full hover:bg-violet-500 mt-4 ml-[10%]">
        Añadir Foto
      </button>

      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent ">
        <div className="bg-white bg-opacity-0 p-8 rounded shadow-lg w-4/5 max-w-7xl mt-10">
          {currentGroupName ? (
            <div>
              <p className="mb-4 text-white">Estás en el grupo: <span className="font-semibold">{currentGroupName}</span></p>
              <h2 className="text-xl font-semibold mb-2 text-white">Miembros del grupo:</h2>
              <button onClick={toggleMembers} className="bg-violet-700 text-white py-2 px-4 rounded-full hover:bg-violet-500 focus:outline-none">
                Miembros del grupo
              </button>
              {showMembers && (
                <ul className="grid mt-2 py-2 w-full bg-white rounded-full shadow-xl max-h-40 overflow-auto z-10">
                  {groupMembers.map((member) => (
                    <li key={member.id} className="px-4 py-2 hover:bg-gray-200">{member.name} {member.lastName}</li>
                  ))}
                </ul>
              )}
              <h2 className="text-xl font-semibold mt-6 mb-2 text-white">Fotos del grupo:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                  <div 
                    key={photo.id} 
                    className="cursor-pointer" 
                    onClick={() => handlePhotoClick(photo.id)} 
                    ref={photos.length === index + 1 ? lastPhotoElementRef : null}
                  >
                    <div className="relative">
                      <img src={photo.imageUrl} alt={photo.title} className="w-full h-60 object-cover rounded-lg shadow-md" />
                      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-lg font-semibold px-2 py-1">
                        {photo.title}
                      </div>
                      <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-sm px-2 py-1">
                        Subido por: {groupMembers.find(member => member.id === photo.userId)?.name || 'Desconocido'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {loading && <p className="text-center text-white mt-4">Cargando...</p>}
            </div>
          ) : (
            <div>
              <p className="mb-4 text-white">No estás en ningún grupo familiar.</p>
              <button onClick={() => navigate('/create-group')} className="bg-violet-700 text-white py-2 px-4 rounded hover:bg-violet-500">
                Crear o Unirse a un Grupo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
