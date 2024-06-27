'use client';
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'User' }); // Placeholder, replace with actual user data fetching logic
    }
    else if (router.pathname !== '/login' || router.pathname !== '/register') {
 router.push('/login');
    
       }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
