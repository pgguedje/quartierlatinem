import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from './SimpleAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  LayoutDashboard, 
  School, 
  UtensilsCrossed, 
  Megaphone, 
  Mail, 
  LogOut, 
  Menu, 
  X,
  GraduationCap,
  Sun,
  Moon,
  Home,
  Settings
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/infos', icon: School, label: 'Infos établissement' },
    { path: '/cantine', icon: UtensilsCrossed, label: 'Cantine' },
    { path: '/annonces', icon: Megaphone, label: 'Annonces' },
    { path: '/newsletter', icon: Mail, label: 'Newsletter' },
    { path: '/connexion', icon: Settings, label: 'Connexion' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 dark:bg-gray-800 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-blue-800 dark:bg-gray-700">
          <div className="flex items-center">
            <GraduationCap className="w-8 h-8 text-yellow-400 mr-3" />
            <span className="text-white font-serif text-lg">CS Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-6 py-3 text-white hover:bg-blue-800 dark:hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-blue-800 dark:bg-gray-700 border-r-4 border-yellow-400' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6">
          <div className="bg-blue-800 dark:bg-gray-700 rounded-lg p-4 mb-4">
            <p className="text-white text-sm">Mode administrateur</p>
            <p className="text-yellow-400 font-semibold">CS Quartier Latin</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 bg-blue-800 dark:bg-gray-700 hover:bg-blue-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </button>
            
            <a
              href="/"
              className="flex items-center justify-center w-10 h-10 bg-blue-800 dark:bg-gray-700 hover:bg-blue-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 text-white" />
            </a>
            
            <button
              onClick={handleLogout}
              className="flex items-center justify-center flex-1 px-4 py-2 text-white hover:bg-blue-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top bar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Administration - CS Quartier Latin EM
            </h1>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;