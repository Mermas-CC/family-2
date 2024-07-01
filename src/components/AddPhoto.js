// src/components/AddPhoto.js

import React, { useState } from 'react';
import { useGroup } from '../context/GroupContext';
import { uploadImage, addPhoto } from '../firebase';

const AddPhoto = () => {
  const { currentGroup } = useGroup();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file.');
      return;
    }

    try {
      setError('');
      const imageUrl = await uploadImage(file);
      await addPhoto(currentGroup, title, description, date, imageUrl);
      setSuccess(true);
    } catch (error) {
      setError('Failed to upload photo: ' + error.message);
    }
  };

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-transparent pt-20">
        <div className="relative sm:max-w-sm w-full">
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Publicar Foto
            </label>
            {success ? (
              <div className="mt-10 text-center">
                <p className="text-green-500">Foto publicada exitosamente!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10">
                <div>
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
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Descripción"
                    className="pl-4 mt-1 block w-full border-none bg-gray-100 h-20 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>
                <div className="mt-7">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>
                <div className="mt-7">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>
                <div className="mt-7">
                  <button
                    type="submit"
                    className="bg-violet-700 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  >
                    Publicar Foto
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

export default AddPhoto;
