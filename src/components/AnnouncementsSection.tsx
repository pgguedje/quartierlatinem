import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Megaphone, Calendar, Users, AlertTriangle, ChevronLeft, ChevronRight, School, BookOpen, Pencil } from 'lucide-react';

const AnnouncementsSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [announcements, setAnnouncements] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const storedAnnonces = localStorage.getItem('admin_annonces');
    if (storedAnnonces) {
      const data = JSON.parse(storedAnnonces);
      setAnnouncements(data.annonces || []);
    } else {
      fetch('/data/annonces.json')
        .then(res => res.json())
        .then(data => {
          setAnnouncements(data.annonces || []);
          localStorage.setItem('admin_annonces', JSON.stringify(data));
        })
        .catch(err => console.error('Error loading announcements:', err));
    }
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'excursion':
        return { icon: Users, color: 'text-slate-600', bg: 'bg-slate-100 dark:bg-slate-900/20' };
      case 'reunion':
        return { icon: Users, color: 'text-gray-600', bg: 'bg-gray-100 dark:bg-gray-900/20' };
      case 'fermeture':
        return { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20' };
      case 'evenement':
        return { icon: Calendar, color: 'text-slate-700', bg: 'bg-slate-100 dark:bg-slate-900/20' };
      default:
        return { icon: Megaphone, color: 'text-gray-600', bg: 'bg-gray-100 dark:bg-gray-900/20' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(announcements.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(announcements.length / 2)) % Math.ceil(announcements.length / 2));
  };

  if (announcements.length === 0) return <div>Chargement...</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Motifs scolaires animés */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-4 border-slate-300/20 rounded-full"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête centré */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-8"
            variants={itemVariants}
          >
            Annonces & Événements
          </motion.h2>
          <motion.div
            className="w-32 h-2 bg-gradient-to-r from-slate-500 to-gray-500 mx-auto mb-8 rounded-full"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-slate-800 dark:text-slate-200 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Restez informés des dernières actualités et événements de notre établissement
          </motion.p>
        </motion.div>

        {/* Image du Bénin centrée */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.div
            className="relative inline-block rounded-3xl overflow-hidden shadow-2xl group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="École au Bénin"
              className="w-full max-w-2xl h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">🇧🇯 Bénin - Quartier Latin de l'Afrique</h3>
              <p className="text-slate-200">Excellence éducative africaine</p>
            </div>
            {/* Motif scolaire au hover */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <School className="w-8 h-8 text-white/50" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Navigation Arrows */}
          {announcements.length > 2 && (
            <>
              <motion.button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white dark:bg-gray-800 shadow-2xl rounded-full hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-slate-900 dark:text-slate-400" />
                {/* Motif scolaire au hover */}
                <motion.div
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <BookOpen className="w-3 h-3 text-slate-500/60" />
                </motion.div>
              </motion.button>
              <motion.button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white dark:bg-gray-800 shadow-2xl rounded-full hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 text-slate-900 dark:text-slate-400" />
                {/* Motif scolaire au hover */}
                <motion.div
                  className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Pencil className="w-3 h-3 text-slate-500/60" />
                </motion.div>
              </motion.button>
            </>
          )}

          {/* Announcements Grid centrée */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                className="grid md:grid-cols-2 gap-8 px-4 justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {announcements.slice(currentSlide * 2, currentSlide * 2 + 2).map((announcement, index) => {
                  const typeInfo = getTypeIcon(announcement.type);
                  const Icon = typeInfo.icon;
                  
                  return (
                    <motion.div
                      key={announcement.id}
                      className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-slate-200 dark:border-slate-700 relative overflow-hidden group mx-auto max-w-md ${
                        announcement.important ? 'ring-4 ring-red-200 dark:ring-red-800' : ''
                      }`}
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Effet de brillance */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                        transition={{ duration: 0.8 }}
                      />
                      
                      {/* Motifs décoratifs */}
                      <div className="absolute top-6 right-6 w-16 h-16 border-2 border-slate-300/30 rounded-full"></div>
                      <div className="absolute bottom-6 left-6 w-12 h-12 border-2 border-gray-300/30 transform rotate-45"></div>
                      
                      <div className="relative z-10 text-center">
                        <div className="flex items-center justify-between mb-6">
                          <motion.div
                            className={`p-4 rounded-2xl ${typeInfo.bg} shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon className={`w-8 h-8 ${typeInfo.color}`} />
                          </motion.div>
                          {announcement.important && (
                            <motion.span
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full shadow-lg"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              Important
                            </motion.span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                          {announcement.titre}
                        </h3>
                        
                        <div className="flex items-center justify-center text-slate-700 dark:text-slate-300 mb-4">
                          <Calendar className="w-5 h-5 mr-3" />
                          <span className="font-medium">{formatDate(announcement.date)}</span>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                          {announcement.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <motion.span
                            className="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-full font-semibold border border-slate-200 dark:border-slate-700"
                            whileHover={{ scale: 1.05 }}
                          >
                            {announcement.public}
                          </motion.span>
                          <span className="text-sm text-slate-500 dark:text-slate-400 capitalize font-medium">
                            {announcement.type}
                          </span>
                        </div>
                      </div>
                      
                      {/* Motif scolaire au hover de la carte */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <School className="w-6 h-6 text-slate-300/30" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators centrés */}
          {announcements.length > 2 && (
            <div className="flex justify-center mt-12 space-x-3">
              {Array.from({ length: Math.ceil(announcements.length / 2) }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-slate-500 to-gray-500 scale-125' 
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;