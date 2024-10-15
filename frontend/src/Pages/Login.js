import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {base_Url} from "../BaseUrl";

const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post(`${base_Url}/login`, { username, password });
      console.log(response.data.message);
      // Handle successful login
      navigate(`/all-feedback/Qj0tlV5FbnTuQObT5I6vVs4szJEpshx1`);
    } catch (error) {
      console.error(error.response.data.message);
      // Handle login error
      alert('Invalid Username or Password!');
    }
  };

  return (
      <>
        <div className='container'>
          <form className='l-div' onSubmit={handleLogin}>
            <h2>Admin Login</h2>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">
              Login
            </button>
          </form>
        </div>
      </>
  );
};

export default Login;
