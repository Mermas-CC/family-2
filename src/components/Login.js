// src/components/Login.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await login(email, password);
      if (userCredential.user.emailVerified) {
        navigate('/home');
      } else {
        setError('Por favor verifica tu correo electrónico antes de iniciar sesión.');
      }
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-transparent pt-20">
        <div className="relative sm:max-w-sm w-full">
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Login
            </label>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-10">
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7 flex items-center">
                <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-gray-600">Recuerdame</span>
                </label>
                <div className="w-full text-right">
                  <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                    ¿Olvidó su contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-7">
                <button
                  type="submit"
                  className="bg-violet-700 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                >
                  Ingresar
                </button>
              </div>
            </form>
            <div className="mt-7 flex items-center text-center">
              <hr className="border-gray-300 border-1 w-full rounded-md" />
              <label className="block font-medium text-sm text-gray-600 w-full">
                Accede con
              </label>
              <hr className="border-gray-300 border-1 w-full rounded-md" />
            </div>
            <div className="mt-7 flex justify-center items-center">
              <label className="mr-2">¿Eres nuevo?</label>
              <a href="/register" className="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                Crear cuenta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
