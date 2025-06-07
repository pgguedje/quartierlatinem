import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Lightbulb, Zap, Award, Heart, Star, Target } from 'lucide-react';

const Values = () => {
  const { ref, hasIntersected } = useIntersectionObserver();

  const values = [
    {
      icon: Lightbulb,
      title: "VOULOIR",
      subtitle: "La motivation",
      description: "Cultiver la curiosité et l'envie d'apprendre",
      color: "from-slate-500 to-gray-600",
      bgColor: "bg-slate-50 dark:bg-slate-900/20"
    },
    {
      icon: Zap,
      title: "POUVOIR",
      subtitle: "Les moyens",
      description: "Fournir tous les outils pour réussir",
      color: "from-gray-500 to-slate-600",
      bgColor: "bg-gray-50 dark:bg-gray-900/20"
    },
    {
      icon: Award,
      title: "RÉUSSIR",
      subtitle: "L'accomplissement",
      description: "Atteindre l'excellence académique et humaine",
      color: "from-slate-600 to-gray-700",
      bgColor: "bg-slate-50 dark:bg-slate-900/20"
    }
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
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Motifs subtils */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute border-2 ${
              i % 2 === 0 ? 'border-slate-400 rounded-full' : 'border-gray-400 transform rotate-45'
            }`}
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1]
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête - Mobile responsive */}
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
            Nos Valeurs
          </motion.h2>
          <motion.div
            className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-slate-500 to-gray-500 mx-auto mb-4 sm:mb-6 rounded-full"
            variants={itemVariants}
          />
          <motion.p
            className="text-sm sm:text-base lg:text-lg xl:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            Trois piliers fondamentaux qui guident notre mission éducative
          </motion.p>
        </motion.div>

        {/* Grille des valeurs - Mobile first responsive */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            
            return (
              <motion.div
                key={value.title}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500 h-full min-h-[200px] sm:min-h-[220px] lg:min-h-[240px]">
                  <div className="relative z-10 text-center flex flex-col h-full">
                    {/* Icône */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${value.color} mb-3 sm:mb-4 shadow-lg mx-auto`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </motion.div>
                    
                    {/* Titre principal */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-2 tracking-wide">
                      {value.title}
                    </h3>
                    
                    {/* Sous-titre */}
                    <h4 className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
                      {value.subtitle}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base flex-grow">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Section engagement - Mobile responsive */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.div
            className="bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-slate-200 dark:border-slate-700 max-w-5xl mx-auto relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            {/* Motifs décoratifs */}
            <div className="absolute top-6 right-6 w-12 h-12 border-2 border-slate-300/40 rounded-full opacity-30"></div>
            <div className="absolute bottom-6 left-6 w-10 h-10 border-2 border-gray-300/40 transform rotate-45 opacity-30"></div>
            
            <div className="relative z-10">
              <motion.div
                className="flex items-center justify-center mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center shadow-xl">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </motion.div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-4 sm:mb-6">
                Notre Engagement
              </h3>
              
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6 sm:mb-8">
                "Le meilleur choix pour vos enfants. Donnez la meilleure chance de réussite à votre enfant en l'inscrivant dans l'établissement de référence, <strong>Quartier Latin Emmanuel Mounier</strong>."
              </p>
              
              {/* Grille des qualités - Mobile responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {[
                  { icon: Star, title: "Excellence", desc: "Standards élevés" },
                  { icon: Heart, title: "Bienveillance", desc: "Accompagnement humain" },
                  { icon: Target, title: "Réussite", desc: "Résultats exceptionnels" }
                ].map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                      whileHover={{ y: -3, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ItemIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </motion.div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Boutons d'action - Mobile responsive */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                <motion.a
                  href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-500 hover:to-gray-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-xl text-center"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Inscrivez-vous
                </motion.a>
                <motion.a
                  href="#about"
                  className="w-full sm:flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-100 to-gray-100 hover:from-slate-200 hover:to-gray-200 dark:from-slate-800/30 dark:to-gray-800/30 dark:hover:from-slate-700/40 dark:hover:to-gray-700/40 backdrop-blur-sm text-slate-700 dark:text-slate-200 font-bold text-base sm:text-lg rounded-xl shadow-xl border border-slate-300 dark:border-slate-600 text-center"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  En savoir plus
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Citation inspirante - Mobile responsive */}
        <motion.div
          className="text-center mt-8 sm:mt-12 lg:mt-16"
          variants={itemVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.blockquote
            className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-serif bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent italic mb-4 px-4"
            whileHover={{ scale: 1.02 }}
          >
            "L'éducation est l'arme la plus puissante pour changer le monde"
          </motion.blockquote>
          <motion.cite
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400"
            whileHover={{ scale: 1.02 }}
          >
            — Nelson Mandela
          </motion.cite>
        </motion.div>
      </div>
    </section>
  );
};

export default Values;