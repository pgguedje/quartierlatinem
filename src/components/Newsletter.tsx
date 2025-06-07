import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, Heart } from 'lucide-react';

const Newsletter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if newsletter was already shown
    const hasShownNewsletter = localStorage.getItem('newsletter_shown');
    
    if (!hasShownNewsletter) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // Show after 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter_shown', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        // SAUVEGARDER DIRECTEMENT DANS ADMIN STORAGE
        const existing = JSON.parse(localStorage.getItem('admin_newsletter') || '{"subscribers":[]}');
        if (!existing.subscribers.includes(email)) {
          existing.subscribers.push(email);
          localStorage.setItem('admin_newsletter', JSON.stringify(existing));
        }
        
        setIsSubmitted(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      } catch (error) {
        console.error('Newsletter subscription failed:', error);
        // Still show success to user for better UX
        setIsSubmitted(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Motifs décoratifs */}
          <div className="absolute top-6 right-6 w-16 h-16 border-2 border-orange-300/20 rounded-full"></div>
          <div className="absolute bottom-6 left-6 w-12 h-12 border-2 border-red-300/20 transform rotate-45"></div>
          
          <div className="relative z-10">
            <motion.button
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center mb-8">
                      <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-2xl"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Mail className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                        Restez informés !
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Recevez nos actualités, événements et informations importantes 
                        directement dans votre boîte mail.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="newsletter-email" className="sr-only">
                          Adresse email
                        </label>
                        <motion.input
                          type="email"
                          id="newsletter-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Votre adresse email"
                          className="w-full px-6 py-4 border-2 border-orange-200 dark:border-orange-700 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                          required
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                      
                      <motion.button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl text-lg"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        S'inscrire à la newsletter
                      </motion.button>
                    </form>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
                      Nous respectons votre vie privée. Vous pouvez vous désabonner à tout moment.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-2xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 0.8,
                        ease: "easeInOut"
                      }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                      Merci !
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      Vous êtes maintenant inscrit à notre newsletter. Nous vous tiendrons 
                      informé des dernières actualités de l'école CS Quartier Latin.
                    </p>
                    
                    <motion.div
                      className="flex items-center justify-center text-red-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Heart className="w-6 h-6 mr-2" />
                      <span className="font-semibold">Bienvenue dans notre famille !</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Newsletter;