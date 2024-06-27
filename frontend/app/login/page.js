'use client';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UserContext from '../context/UserContext';
import config from '../../config';
import Link from 'next/link'; 

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 
  const { setUser,user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
   
    if (user) {
      router.push('/');
    }
  }, [user, router]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.apiBaseUrl}/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      setUser({ name: res.data.name }); 
      router.push('/');
    } catch (err) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center">
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-r-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-4">Don't have an account?  <Link href="/register">
        <span className="text-blue-500 cursor-pointer">Register</span>
          </Link></p>
      </div>
    </div>
  );
};

export default Login;
