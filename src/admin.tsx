import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth, AdminLogin } from './components/admin/SimpleAuth';

// Admin components
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import InfosManager from './components/admin/InfosManager';
import CantineManager from './components/admin/CantineManager';
import AnnoncesManager from './components/admin/AnnoncesManager';
import NewsletterManager from './components/admin/NewsletterManager';
import ConnectionManager from './components/admin/ConnectionManager';

import './index.css';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <AdminLogin />;
  }
  
  return <>{children}</>;
};

function AdminApp() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Redirect root to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard\" replace />} />
              
              {/* Admin routes */}
              <Route path="/*" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="infos" element={<InfosManager />} />
                <Route path="cantine" element={<CantineManager />} />
                <Route path="annonces" element={<AnnoncesManager />} />
                <Route path="newsletter" element={<NewsletterManager />} />
                <Route path="connexion" element={<ConnectionManager />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminApp />
  </StrictMode>
);