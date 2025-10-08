// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import axiosClient from '../api/axiosClient';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axiosClient.post('/login/', { username, password });
      login(response.data);
      navigate('/profile');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="bg-light-gray p-8 rounded-lg shadow-lg">
        {error && <p className="bg-red-500/20 text-red-400 p-3 rounded mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-text-muted mb-2">Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-dark p-2 rounded border border-gray-700 focus:outline-none focus:border-primary" />
        </div>
        <div className="mb-6">
          <label className="block text-text-muted mb-2">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-dark p-2 rounded border border-gray-700 focus:outline-none focus:border-primary" />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-purple-700 transition-colors">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;