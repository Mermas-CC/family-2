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
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/register');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser && !currentGroupName) {
      navigate('/create-group');
    }
  }, [currentUser, currentGroupName, navigate]);

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

  const toggleMembers = () => {
    setShowMembers(!showMembers);
  };

  if (!currentUser || !currentGroupName) {
    // El código de redirección dentro del useEffect se encargará de esto
    return null;
  }

  return (
    <div>
      <h1 className="text-8xl font-bold mb-6 text-white ml-[10%] mt-[10%]">Welcome</h1>
      <p className="text-2xl mb-6 text-white ml-[10%]">Recuerda estas bellas experiencias junto con tu familia</p>
      <button onClick={() => navigate('/add-photo')} className="bg-violet-700 text-white py-4 px-8 text-xl rounded-full hover:bg-violet-500 mt-4 ml-[10%]">
        Añadir Foto
      </button>

      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
        <div className="bg-white bg-opacity-0 p-8 rounded shadow-lg w-4/5 max-w-7xl">
          <p className="mb-4 text-white">Estás en el grupo: <span className="font-semibold">{currentGroupName}</span></p>
          <h2 className="text-white text-xl font-semibold mb-2">Miembros del grupo:</h2>
          <button onClick={toggleMembers} className="bg-violet-700 text-white py-2 px-4 rounded-full hover:bg-violet-500 focus:outline-none">
            Miembros del grupo
          </button>
          {showMembers && (
            <ul className="grid mt-2 py-2 w-full bg-white rounded-lg shadow-xl max-h-40 overflow-auto z-10">
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
                className={`cursor-pointer w-full ${index % 2 !== 0 ? 'mt-[37%]' : ''}`}
                onClick={() => handlePhotoClick(photo.id)}
              >
                <img src={photo.imageUrl} alt={photo.title} className="w-full h-40 object-cover rounded-lg shadow-md" />
                <p className="mt-2 font-semibold text-white">{photo.title}</p>
                <p className="text-gray-500 text-sm text-white">{photo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
