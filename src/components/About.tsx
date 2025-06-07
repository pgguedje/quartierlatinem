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
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      description: 'Éveil et épanouissement de 3 à 6 ans',
      image: 'https://images.pexels.com/photos/8613104/pexels-photo-8613104.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'primaire',
      title: 'Primaire',
      icon: BookOpen,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      description: 'Formation solide des bases fondamentales',
      image: 'https://images.pexels.com/photos/8612969/pexels-photo-8612969.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'secondaire',
      title: 'Secondaire',
      icon: GraduationCap,
      color: 'from-red-500 to-amber-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      description: 'Préparation aux examens nationaux',
      image: 'https://images.pexels.com/photos/8613074/pexels-photo-8613074.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section id="about" ref={ref} className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Motifs africains de fond */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-4 border-amber-600 rounded-full"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent mb-6"
            variants={itemVariants}
          >
            Notre École
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mb-6 rounded-full"
            variants={itemVariants}
          />
          <motion.p
            className="text-lg text-amber-800 dark:text-amber-200 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {schoolData.ecole.description}
          </motion.p>
        </motion.div>

        {/* Niveaux d'enseignement */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
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
                className="group cursor-pointer flex-shrink-0 w-full sm:w-72 lg:w-80"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedLevel(level)}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-2 border-amber-200 dark:border-amber-700 relative overflow-hidden h-fit max-h-24">
                  {/* Image de fond */}
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src={level.image} 
                      alt={level.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* En-tête avec icône et titre */}
                    <div className="flex items-center mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.color} shadow-lg flex items-center justify-center mr-3`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                        {levelData.titre}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-amber-700 dark:text-amber-300 mb-4 leading-relaxed text-sm flex-grow">
                      {levelData.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statistiques */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {[
            { icon: Users, label: 'Élèves', value: '500+', color: 'from-amber-500 to-orange-600' },
            { icon: BookOpen, label: 'Professeurs', value: '30+', color: 'from-orange-500 to-red-600' },
            { icon: Award, label: 'Années', value: '15+', color: 'from-red-500 to-amber-600' },
            { icon: Star, label: 'Réussite', value: '95%', color: 'from-amber-600 to-orange-700' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-amber-200 dark:border-amber-700 flex-shrink-0 w-32"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-3 shadow-lg mx-auto flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-1">
                  {stat.value}
                </h3>
                <p className="text-amber-700 dark:text-amber-300 font-semibold text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Modal pour les détails */}
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
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* En-tête de la modal */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedLevel.color} mr-4 shadow-xl flex items-center justify-center`}>
                    <selectedLevel.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                      {schoolData.niveaux[selectedLevel.id].titre}
                    </h2>
                    <p className="text-lg text-amber-700 dark:text-amber-300">
                      {schoolData.niveaux[selectedLevel.id].description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLevel(null)}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Contenu de la modal */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Détails */}
                <div className="space-y-6">
                  {/* Classes */}
                  <div>
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                      Classes disponibles:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {schoolData.niveaux[selectedLevel.id].classes.map((classe, idx) => (
                        <div
                          key={idx}
                          className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-lg text-center font-semibold border border-amber-200 dark:border-amber-700"
                        >
                          {classe}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Séries pour le secondaire */}
                  {schoolData.niveaux[selectedLevel.id].series && (
                    <div>
                      <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                        Séries proposées:
                      </h3>
                      <div className="flex gap-3">
                        {schoolData.niveaux[selectedLevel.id].series.map((serie, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-r from-amber-500 to-red-600 text-white px-4 py-2 rounded-lg font-bold"
                          >
                            Série {serie}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pédagogie */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-700">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3 flex items-center">
                      <Star className="w-6 h-6 mr-2" />
                      Notre Pédagogie
                    </h3>
                    <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                      {schoolData.niveaux[selectedLevel.id].pedagogie}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bouton d'action */}
              <div className="mt-8 text-center">
                <motion.a
                  href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-red-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Inscrire mon enfant en {selectedLevel.title}
                  <ChevronRight className="w-5 h-5 ml-2" />
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