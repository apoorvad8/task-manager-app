import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    const { data } = await axios.post('http://localhost:5000/login', { username });
    localStorage.setItem('token', data.token);
    setToken(data.token);
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
