// src/pages/PhotoDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPhoto } from '../firebase';
import { useGroup } from '../context/GroupContext';

const PhotoDetail = () => {
  const { id } = useParams();
  const { currentGroup } = useGroup();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const photoData = await getPhoto(currentGroup, id);
        setPhoto(photoData);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [id, currentGroup]);

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent pt-20">
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-md">
        <img src={photo.imageUrl} alt={photo.title} className="w-full h-60 object-cover rounded-lg shadow-md" />
        <h2 className="text-2xl font-semibold mt-4">{photo.title}</h2>
        <p className="text-gray-700 mt-2">{photo.description}</p>
        <p className="text-gray-500 mt-2">Fecha: {photo.date}</p>
      </div>
      
    </div>
    
  );
};

export default PhotoDetail;
