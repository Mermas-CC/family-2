// src/components/Login.js

import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      setError('Failed to sign in: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} required placeholder="Email" />
        <input type="password" ref={passwordRef} required placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
