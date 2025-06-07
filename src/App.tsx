import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth, AdminLogin } from './components/admin/SimpleAuth';

// Public components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Values from './components/Values';
import Cantine from './components/Cantine';
import Results from './components/Results';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import SEOHead from './components/SEOHead';

// NOUVELLES SECTIONS AVEC DONNÉES ADMIN
import InscriptionSection from './components/InscriptionSection';
import AnnouncementsSection from './components/AnnouncementsSection';

// Admin components
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import InfosManager from './components/admin/InfosManager';
import CantineManager from './components/admin/CantineManager';
import AnnoncesManager from './components/admin/AnnoncesManager';
import NewsletterManager from './components/admin/NewsletterManager';
import ConnectionManager from './components/admin/ConnectionManager';

import './App.css';

// Public website component - TOUTES LES DONNÉES DEPUIS ADMIN
const PublicWebsite = () => (
  <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <SEOHead />
    <Navigation />
    <Hero />
    <About />
    <Values />
    <InscriptionSection />
    <Cantine />
    <AnnouncementsSection />
    <Results />
    <Contact />
    <Footer />
    <Newsletter />
  </div>
);

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <AdminLogin />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PublicWebsite />} />
              
              {/* Admin routes - NOUVELLE URL */}
              <Route path="/djidjognon" element={<Navigate to="/djidjognon/dashboard\" replace />} />
              <Route path="/djidjognon/*" element={
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
              
              {/* Redirection de l'ancienne route admin vers la nouvelle */}
              <Route path="/admin" element={<Navigate to="/djidjognon\" replace />} />
              <Route path="/admin/*" element={<Navigate to="/djidjognon\" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;