import React, { useState, createContext, useContext, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    // Vérifier d'abord les identifiants personnalisés
    const storedCredentials = localStorage.getItem('admin_credentials');
    if (storedCredentials) {
      const credentials = JSON.parse(storedCredentials);
      if (email === credentials.email && password === credentials.password) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_auth', 'true');
        return true;
      }
    }
    
    // Identifiants par défaut
    if (email === 'admin@gmail.com' && password === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      setError('');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
              <Lock className="w-8 h-8 text-orange-900 dark:text-orange-400" />
            </div>
            <h1 className="text-2xl font-serif text-orange-900 dark:text-white mb-2">
              Administration
            </h1>
            <p className="text-orange-600 dark:text-orange-400">CS Quartier Latin EM</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="admin@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 dark:hover:text-orange-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-orange-500 dark:text-orange-400">
            <p>Email: admin@gmail.com</p>
            <p>Mot de passe: admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};