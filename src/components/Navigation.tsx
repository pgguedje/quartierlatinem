import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, GraduationCap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#about', label: 'École' },
    { href: '#cantine', label: 'Cantine' },
    { href: '#resultats', label: 'Résultats' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-amber-200/50 dark:border-amber-700/50' 
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo - Design africain moderne */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <img 
                src="/IMG-20221220-WA0022 copy.jpg" 
                alt="Logo CS Quartier Latin EM" 
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl object-cover shadow-lg"
              />
              {/* Motif africain autour du logo */}
              <div className="absolute -inset-2 border-2 border-amber-300/30 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                CS Quartier Latin EM
              </h1>
              <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">Excellence Africaine</p>
            </div>
          </motion.div>

          {/* Menu de navigation - Centré */}
          <div className="hidden lg:flex items-center justify-center space-x-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 font-semibold text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-100 transition-all duration-300 group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative z-10">{item.label}</span>
                <motion.div 
                  className="absolute inset-0 bg-amber-100 dark:bg-amber-800/20 rounded-lg opacity-0 group-hover:opacity-100"
                  layoutId="navbar-hover"
                />
                <motion.div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-amber-500 rounded-full w-0 group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-amber-100 dark:bg-amber-800 hover:bg-amber-200 dark:hover:bg-amber-700 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5 text-amber-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5 text-amber-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-amber-100 dark:bg-amber-800 hover:bg-amber-200 dark:hover:bg-amber-700 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-5 h-5 text-amber-800 dark:text-amber-200" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="w-5 h-5 text-amber-800 dark:text-amber-200" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl mt-2 shadow-lg border border-amber-200/50 dark:border-amber-700/50">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-100 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 font-medium rounded-lg mx-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;