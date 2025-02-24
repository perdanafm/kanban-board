/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

// Define the context type
interface AuthContextType {
  idUser: string;
  login: (value: string) => void;
  logout: () => void;
}

export const defaultAuthContext = {
  idUser: '',
  login: () => {},
  logout: () => {},
};

// Create the context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [idUser, setIdUser] = useState(() => {
    return localStorage.getItem('idUser') ?? '';
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!idUser) {
      navigate('/login');
    }
  }, [idUser, navigate]);

  // Function to log in
  const login = (value: string) => {
    setIdUser(value);
    localStorage.setItem('idUser', value);
    navigate('/');
  };

  // Function to log out
  const logout = () => {
    setIdUser('');
    localStorage.removeItem('/');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ idUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
