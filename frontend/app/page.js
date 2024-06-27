'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from './context/UserContext';

const Home = () => {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Home</h1>
        <p className="mb-4">Welcome,, <span className="font-bold uppercase">{user.name}</span>!</p>
        <button onClick={logout} className="w-full py-2 bg-red-500 text-white rounded-lg">Logout</button>
      </div>
    </div>
  );
};

export default Home;
