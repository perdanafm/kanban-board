/* eslint-disable react-refresh/only-export-components */
import { Users } from '@/services/types';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskProvider } from './TaskContext';

interface AuthContextType {
  user: Users;
  login: (user: Users) => void;
  logout: () => void;
}

export const defaultAuthContext = {
  user: {} as Users,
  login: () => {},
  logout: () => {},
};

// Create the context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user') ?? '{}');
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Function to log in
  const login = (userx: Users) => {
    setUser(userx);
    localStorage.setItem('user', JSON.stringify(userx));
    navigate('/');
  };

  // Function to log out
  const logout = () => {
    setUser('');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <TaskProvider>{children}</TaskProvider>
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
