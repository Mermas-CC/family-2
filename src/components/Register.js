// src/components/Register.js

import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const name = nameRef.current.value;
      const lastName = lastNameRef.current.value;
      const age = parseInt(ageRef.current.value, 10);
      const gender = genderRef.current.value;

      const userCredential = await register(email, password);
      const user = userCredential.user;

      // Guardar los datos adicionales en Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        name,
        lastName,
        age,
        gender
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirigir después de 2 segundos
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    }
  };

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
        <div className="relative sm:max-w-sm w-full">
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Registro:
            </label>
            {success ? (
              <div className="mt-10 text-center">
                <p className="text-green-500">Cuenta creada exitosamente!</p>
                <p className="text-gray-500">Por favor verifica tu correo electrónico.</p>
                <p className="text-gray-500">Redirigiendo al inicio de sesión...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10">
                <div>
                  <p className="">Correo electrónico</p>
                  <input
                    type="email"
                    ref={emailRef}
                    required
                    placeholder="Correo electrónico"
                    className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <p className="">Nombre</p>
                  <input
                    type="text"
                    ref={nameRef}
                    required
                    placeholder="Nombre"
                    className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <p className="">Apellidos</p>
                  <input
                    type="text"
                    ref={lastNameRef}
                    required
                    placeholder="Apellidos"
                    className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <p className="">Contraseña</p>
                  <input
                    type="password"
                    ref={passwordRef}
                    required
                    placeholder="Contraseña"
                    className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <p className="">Edad</p>
                  <input
                    type="number"
                    ref={ageRef}
                    required
                    placeholder="Edad"
                    className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <p className="">Género</p>
                  <select
                    ref={genderRef}
                    required
                    className="pl-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  >
                    <option value="">Seleccione Género</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    className="bg-violet-700 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  >
                    Registrarse
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

export default Register;
