import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  './Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      console.log(response.data.message);
      // Handle successful login 
      navigate('/all-feedback');
    } catch (error) {
      console.error(error.response.data.message);
      // Handle login error 
      alert('Invalid Username or Password!');
    }
  };

  return (
    <>
    <div className='container'>
    <div className='l-div'>
      <h2>Admin Login</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>
      Login
      </button>
    </div>
    </div>
    </>
  );
};

export default Login;
