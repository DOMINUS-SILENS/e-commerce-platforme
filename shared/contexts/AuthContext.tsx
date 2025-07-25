import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '@shared/services/authService';
import { User } from '@shared/types/user.zod';

type UserRole = 'vendeur' | 'acheteur' | 'admin';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  [key: string]: any; // For any additional fields
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for the initial auth check to keep the component clean
const useAuthInitialization = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          // Redirect is handled by the authService.getCurrentUser()
        }
      } catch (err) {
        console.error('Failed to load user', err);
        setError(err instanceof Error ? err : new Error('Authentication error'));
        authService.logout();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return { user, setUser, loading, error };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser, loading, error } = useAuthInitialization();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const userData = await authService.login(credentials);
      setUser(userData);
      // Redirect is handled by authService.login
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Login failed');
      console.error('Login error:', error);
      throw error;
    }
  }, [setUser]);

  const register = useCallback(async (userData: RegisterData) => {
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
      // Redirection is handled by the authService.register
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Registration failed');
      console.error('Registration error:', error);
      throw error;
    }
  }, [setUser]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    navigate('/login');
  }, [navigate, setUser]);

  const contextValue = useMemo<AuthContextType>(() => ({
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    error,
  }), [user, loading, login, register, logout, error]);

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
