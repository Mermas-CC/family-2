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

      navigate('/');
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} required placeholder="Email" />
        <input type="password" ref={passwordRef} required placeholder="Password" />
        <input type="text" ref={nameRef} required placeholder="Name" />
        <input type="text" ref={lastNameRef} required placeholder="Last Name" />
        <input type="number" ref={ageRef} required placeholder="Age" />
        <select ref={genderRef} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
