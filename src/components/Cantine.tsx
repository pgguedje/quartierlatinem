import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { UtensilsCrossed, Clock, Phone, Star, Utensils, Coffee, ChefHat } from 'lucide-react';

const Cantine = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [cantineData, setCantineData] = useState(null);
  const [inscriptionData, setInscriptionData] = useState(null);
  const [activeDay, setActiveDay] = useState('lundi');

  useEffect(() => {
    const storedMenu = localStorage.getItem('admin_cantine');
    const storedInscription = localStorage.getItem('admin_cantine_inscription');

    if (storedMenu && storedInscription) {
      setCantineData(JSON.parse(storedMenu));
      setInscriptionData(JSON.parse(storedInscription));
    } else {
      Promise.all([
        fetch('/data/cantine.json').then(res => res.json()),
        fetch('/data/cantine_inscription.json').then(res => res.json())
      ])
      .then(([cantine, inscription]) => {
        setCantineData(cantine);
        setInscriptionData(inscription);
      })
      .catch(err => console.error('Error loading cantine data:', err));
    }
  }, []);

  if (!cantineData || !inscriptionData) return <div>Chargement...</div>;

  const days = [
    { id: 'lundi', label: 'Lundi', icon: '🌟', color: 'from-amber-500 to-orange-600' },
    { id: 'mardi', label: 'Mardi', icon: '🍽️', color: 'from-orange-500 to-red-600' },
    { id: 'mercredi', label: 'Mercredi', icon: '🥘', color: 'from-red-500 to-amber-600' },
    { id: 'jeudi', label: 'Jeudi', icon: '🍲', color: 'from-amber-600 to-orange-700' },
    { id: 'vendredi', label: 'Vendredi', icon: '🎉', color: 'from-orange-600 to-red-700' }
  ];

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
    <section id="cantine" ref={ref} className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Motifs africains animés */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute border-4 ${
              i % 3 === 0 ? 'border-amber-300/20' : 
              i % 3 === 1 ? 'border-orange-300/20' : 
              'border-red-300/20'
            } ${
              i % 2 === 0 ? 'rounded-full' : 'transform rotate-45'
            }`}
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent mb-8"
            variants={itemVariants}
          >
            Cantine
          </motion.h2>
          <motion.div
            className="w-32 h-2 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mb-8 rounded-full"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-amber-800 dark:text-amber-200 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Une cuisine authentique et équilibrée qui nourrit le corps et l'âme de nos élèves
          </motion.p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Section Menu */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-8">
              <motion.h3
                className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-6 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <ChefHat className="w-8 h-8 mr-4 text-amber-600" />
                </motion.div>
                Menu de la Semaine
              </motion.h3>
            </div>

            {/* Sélecteur de jour */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {days.map((day, index) => (
                <motion.button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  className={`flex items-center px-4 lg:px-6 py-3 lg:py-4 rounded-2xl font-bold transition-all duration-300 text-sm lg:text-base ${
                    activeDay === day.id
                      ? `bg-gradient-to-r ${day.color} text-white shadow-2xl scale-110`
                      : 'bg-white dark:bg-gray-800 text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-gray-700 shadow-lg'
                  }`}
                  whileHover={{ scale: activeDay === day.id ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-2xl mr-2">{day.icon}</span>
                  <span className="hidden sm:inline">{day.label}</span>
                  <span className="sm:hidden">{day.label.slice(0, 3)}</span>
                </motion.button>
              ))}
            </div>

            {/* Affichage du menu */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border-2 border-amber-200 dark:border-amber-700 relative overflow-hidden"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Motifs décoratifs */}
                <div className="absolute top-6 right-6 w-16 h-16 border-2 border-amber-300/30 rounded-full"></div>
                <div className="absolute bottom-6 left-6 w-12 h-12 border-2 border-orange-300/30 transform rotate-45"></div>
                
                <div className="relative z-10">
                  <motion.h4
                    className="text-2xl lg:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-8 text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  >
                    <span className="text-4xl mr-3">{days.find(d => d.id === activeDay)?.icon}</span>
                    Menu du {activeDay}
                  </motion.h4>
                  
                  {cantineData.menu_hebdomadaire[activeDay] && (
                    <div className="space-y-6">
                      {[
                        { key: 'plat_principal', label: 'Plat principal', icon: Utensils, color: 'bg-amber-500' },
                        { key: 'accompagnement', label: 'Accompagnement', icon: Star, color: 'bg-orange-500' },
                        { key: 'boisson', label: 'Boisson', icon: Coffee, color: 'bg-red-500' },
                        { key: 'dessert', label: 'Dessert', icon: Star, color: 'bg-amber-600' }
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.key}
                            className="flex items-start bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-2xl shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 10 }}
                          >
                            <motion.div
                              className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mr-4 shadow-lg`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </motion.div>
                            <div>
                              <strong className="text-amber-800 dark:text-amber-200 text-lg block mb-1">
                                {item.label}:
                              </strong>
                              <p className="text-amber-700 dark:text-amber-300">
                                {cantineData.menu_hebdomadaire[activeDay][item.key]}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  <motion.div
                    className="mt-8 p-6 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl border border-amber-200 dark:border-amber-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center text-amber-900 dark:text-amber-100 mb-3">
                      <Clock className="w-6 h-6 mr-3" />
                      <strong className="text-lg">Horaires de service</strong>
                    </div>
                    <p className="text-amber-800 dark:text-amber-200 text-lg font-semibold">
                      {cantineData.horaires.service}
                    </p>
                    <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                      Inscription: {cantineData.horaires.inscription}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Section Tarifs */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-8 text-center"
              whileHover={{ scale: 1.05 }}
            >
              Tarifs & Inscription
            </motion.h3>

            <div className="space-y-6 mb-8">
              {Object.entries(inscriptionData.tarifs).map(([niveau, tarifs], index) => (
                <motion.div
                  key={niveau}
                  className="bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-700 rounded-2xl p-6 shadow-xl"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <h4 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 capitalize text-center">
                    {niveau}
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { key: 'journalier', label: 'Journalier', color: 'from-amber-500 to-orange-600' },
                      { key: 'hebdomadaire', label: 'Hebdomadaire', color: 'from-orange-500 to-red-600' },
                      { key: 'mensuel', label: 'Mensuel', color: 'from-red-500 to-amber-600' }
                    ].map((period) => (
                      <motion.div
                        key={period.key}
                        className={`p-3 bg-gradient-to-br ${period.color} rounded-xl text-center text-white shadow-lg`}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                      >
                        <p className="text-xs font-medium mb-1">{period.label}</p>
                        <p className="font-bold text-lg">{tarifs[period.key]} FCFA</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Conditions */}
            <motion.div
              className="bg-amber-50 dark:bg-gray-800 p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-700 mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-4">
                Conditions d'inscription
              </h4>
              <ul className="space-y-3">
                {inscriptionData.conditions.map((condition, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-amber-800 dark:text-amber-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.span
                      className="w-3 h-3 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"
                      whileHover={{ scale: 1.5 }}
                    />
                    {condition}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-2xl border-2 border-amber-300 dark:border-amber-500"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-3 flex items-center">
                <Phone className="w-6 h-6 mr-3" />
                Contact Cantine
              </h4>
              <p className="text-amber-800 dark:text-amber-200 font-semibold">
                {inscriptionData.contact.responsable}
              </p>
              <motion.p
                className="text-amber-700 dark:text-amber-300 text-lg font-bold"
                whileHover={{ scale: 1.05 }}
              >
                {inscriptionData.contact.telephone}
              </motion.p>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                {inscriptionData.contact.horaires}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cantine;