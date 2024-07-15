// src/components/AddPhoto.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGroup } from '../context/GroupContext';
import { uploadImage, addPhoto } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AddPhoto = () => {
  const { currentUser } = useAuth();
  const { currentGroup } = useGroup();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Por favor, selecciona una imagen para subir.');
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      await addPhoto(currentGroup, currentUser.uid, title, description, date, imageUrl);
      navigate('/home');
    } catch (error) {
      setError('Failed to upload photo: ' + error.message);
    }
  };

  return (
    <div className="font-sans min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
      <div className="relative sm:max-w-sm w-full">
        <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
          <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
            Añadir Foto
          </label>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-10">
            <div>
              <p className="">Título</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Título"
                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
            </div>

            <div className="mt-7">
              <p className="">Descripción</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Descripción"
                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-28 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
            </div>

            <div className="mt-7">
              <p className="">Fecha</p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
            </div>

            <div className="mt-7">
              <p className="">Seleccionar Imagen</p>
              <input
                type="file"
                onChange={handleFileChange}
                required
                className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
              {previewUrl && (
                <div className="mt-4">
                  <img src={previewUrl} alt="Preview" className="w-full h-60 object-cover rounded-lg shadow-md" />
                </div>
              )}
            </div>

            <div className="mt-7">
              <button
                type="submit"
                className="bg-violet-700 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
              >
                Subir Foto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;
