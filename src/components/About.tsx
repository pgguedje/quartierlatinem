import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { GraduationCap, Users, BookOpen, Award, Star, Heart, X, ChevronRight, Baby } from 'lucide-react';

const About = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [schoolData, setSchoolData] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin_infos');
    if (stored) {
      setSchoolData(JSON.parse(stored));
    } else {
      fetch('/data/infos.json')
        .then(res => res.json())
        .then(data => setSchoolData(data))
        .catch(err => console.error('Error loading school data:', err));
    }
  }, []);

  if (!schoolData) return <div>Chargement...</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const levels = [
    {
      id: 'maternelle',
      title: 'Maternelle',
      icon: Baby,
      color: 'from-slate-500 to-gray-600',
      bgColor: 'bg-slate-50 dark:bg-slate-900/20',
      description: 'Éveil et épanouissement de 3 à 6 ans',
      image: 'https://images.pexels.com/photos/8613104/pexels-photo-8613104.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'primaire',
      title: 'Primaire',
      icon: BookOpen,
      color: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-50 dark:bg-gray-900/20',
      description: 'Formation solide des bases fondamentales',
      image: 'https://images.pexels.com/photos/8612969/pexels-photo-8612969.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'secondaire',
      title: 'Secondaire',
      icon: GraduationCap,
      color: 'from-slate-600 to-gray-700',
      bgColor: 'bg-slate-50 dark:bg-slate-900/20',
      description: 'Préparation aux examens nationaux',
      image: 'https://images.pexels.com/photos/8613074/pexels-photo-8613074.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section id="about" ref={ref} className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Motifs subtils */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-slate-400 rounded-full"
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              top: `${20 + i * 30}%`,
              left: `${10 + i * 30}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-4 sm:mb-6"
            variants={itemVariants}
          >
            Notre École
          </motion.h2>
          <motion.div
            className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-slate-500 to-gray-500 mx-auto mb-4 sm:mb-6 rounded-full"
            variants={itemVariants}
          />
          <motion.p
            className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            {schoolData.ecole.description}
          </motion.p>
        </motion.div>

        {/* Niveaux d'enseignement - Mobile first grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {levels.map((level, index) => {
            const Icon = level.icon;
            const levelData = schoolData.niveaux[level.id];
            
            return (
              <motion.div
                key={level.id}
                className="group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedLevel(level)}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] transition-all duration-300">
                  {/* Image de fond */}
                  <div className="absolute inset-0 opacity-5">
                    <img 
                      src={level.image} 
                      alt={level.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* En-tête avec icône et titre */}
                    <div className="flex items-center mb-3 sm:mb-4">
                      <motion.div
                        className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${level.color} shadow-lg flex items-center justify-center mr-3 sm:mr-4`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                      </motion.div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-100">
                        {levelData.titre}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base flex-grow">
                      {levelData.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statistiques - Mobile responsive grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {[
            { icon: Users, label: 'Élèves', value: '500+', color: 'from-slate-500 to-gray-600' },
            { icon: BookOpen, label: 'Professeurs', value: '30+', color: 'from-gray-500 to-slate-600' },
            { icon: Award, label: 'Années', value: '15+', color: 'from-slate-600 to-gray-700' },
            { icon: Star, label: 'Réussite', value: '95%', color: 'from-gray-600 to-slate-700' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center p-3 sm:p-4 lg:p-6 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <motion.div
                  className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} mb-2 sm:mb-3 shadow-lg mx-auto flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                  {stat.value}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-semibold text-xs sm:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Modal pour les détails - Mobile responsive */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLevel(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* En-tête de la modal - Mobile responsive */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center mb-4 sm:mb-0 w-full sm:w-auto">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${selectedLevel.color} mr-3 sm:mr-4 shadow-xl flex items-center justify-center flex-shrink-0`}>
                    <selectedLevel.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100">
                      {schoolData.niveaux[selectedLevel.id].titre}
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300">
                      {schoolData.niveaux[selectedLevel.id].description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLevel(null)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors self-end sm:self-auto flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Contenu de la modal - Mobile responsive */}
              <div className="space-y-6">
                {/* Classes */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                    Classes disponibles:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {schoolData.niveaux[selectedLevel.id].classes.map((classe, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-200 px-3 sm:px-4 py-2 rounded-lg text-center font-semibold border border-slate-200 dark:border-slate-700 text-sm sm:text-base"
                      >
                        {classe}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Séries pour le secondaire */}
                {schoolData.niveaux[selectedLevel.id].series && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                      Séries proposées:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {schoolData.niveaux[selectedLevel.id].series.map((serie, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-r from-slate-600 to-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg font-bold text-sm sm:text-base"
                        >
                          Série {serie}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pédagogie */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Notre Pédagogie
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    {schoolData.niveaux[selectedLevel.id].pedagogie}
                  </p>
                </div>
              </div>

              {/* Bouton d'action - Mobile responsive */}
              <div className="mt-6 sm:mt-8 text-center">
                <motion.a
                  href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-600 to-gray-700 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Inscrire mon enfant en {selectedLevel.title}
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;