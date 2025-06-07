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
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      icon: Zap,
      title: "POUVOIR",
      subtitle: "Les moyens",
      description: "Fournir tous les outils pour réussir",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      icon: Award,
      title: "RÉUSSIR",
      subtitle: "L'accomplissement",
      description: "Atteindre l'excellence académique et humaine",
      color: "from-red-500 to-amber-600",
      bgColor: "bg-red-50 dark:bg-red-900/20"
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
    <section ref={ref} className="py-16 bg-gradient-to-br from-white via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Motifs africains */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute border-2 ${
              i % 2 === 0 ? 'border-amber-400 rounded-full' : 'border-red-400 transform rotate-45'
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

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
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
            Nos Valeurs
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mb-6 rounded-full"
            variants={itemVariants}
          />
          <motion.p
            className="text-lg lg:text-xl text-amber-800 dark:text-amber-200 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Trois piliers fondamentaux qui guident notre mission éducative
          </motion.p>
        </motion.div>

        {/* Grille des valeurs - Une seule ligne compacte */}
        <motion.div
          className="flex justify-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <div className="flex gap-6 max-w-4xl">
            {values.map((value, index) => {
              const Icon = value.icon;
              
              return (
                <motion.div
                  key={value.title}
                  className="group flex-1 max-w-xs"
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-amber-700 relative overflow-hidden group-hover:shadow-xl transition-all duration-500 h-48">
                    <div className="relative z-10 text-center flex flex-col h-full">
                      {/* Icône */}
                      <motion.div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} mb-3 shadow-lg mx-auto`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      {/* Titre principal */}
                      <h3 className="text-xl font-bold bg-gradient-to-r from-amber-800 to-red-800 bg-clip-text text-transparent mb-2 tracking-wide">
                        {value.title}
                      </h3>
                      
                      {/* Sous-titre */}
                      <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-3">
                        {value.subtitle}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-amber-600 dark:text-amber-400 leading-relaxed text-sm flex-grow">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Section engagement */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.div
            className="bg-gradient-to-br from-amber-100 to-red-100 dark:from-amber-900/30 dark:to-red-900/30 rounded-2xl p-8 shadow-xl border-2 border-amber-200 dark:border-amber-700 max-w-5xl mx-auto relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            {/* Motifs décoratifs */}
            <div className="absolute top-6 right-6 w-12 h-12 border-2 border-amber-300/40 rounded-full opacity-30"></div>
            <div className="absolute bottom-6 left-6 w-10 h-10 border-2 border-red-300/40 transform rotate-45 opacity-30"></div>
            
            <div className="relative z-10">
              <motion.div
                className="flex items-center justify-center mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-800 to-red-800 bg-clip-text text-transparent mb-6">
                Notre Engagement
              </h3>
              
              <p className="text-lg lg:text-xl text-amber-800 dark:text-amber-200 leading-relaxed mb-8">
                "Le meilleur choix pour vos enfants. Donnez la meilleure chance de réussite à votre enfant en l'inscrivant dans l'établissement de référence, <strong>Quartier Latin Emmanuel Mounier</strong>."
              </p>
              
              {/* Grille des qualités */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { icon: Star, title: "Excellence", desc: "Standards élevés" },
                  { icon: Heart, title: "Bienveillance", desc: "Accompagnement humain" },
                  { icon: Target, title: "Réussite", desc: "Résultats exceptionnels" }
                ].map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex-shrink-0 w-40"
                      whileHover={{ y: -3, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-amber-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ItemIcon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2 text-base">
                        {item.title}
                      </h4>
                      <p className="text-amber-700 dark:text-amber-300 text-sm">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-bold text-lg rounded-xl shadow-xl"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Inscrivez-vous
                </motion.a>
                <motion.a
                  href="#about"
                  className="px-8 py-4 bg-gradient-to-r from-amber-800/30 to-red-800/30 hover:from-amber-700/40 hover:to-red-700/40 backdrop-blur-sm text-amber-800 dark:text-amber-200 font-bold text-lg rounded-xl shadow-xl border-2 border-amber-300 dark:border-amber-600"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  En savoir plus
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Citation inspirante */}
        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.blockquote
            className="text-2xl lg:text-3xl font-serif bg-gradient-to-r from-amber-800 to-red-800 bg-clip-text text-transparent italic mb-4"
            whileHover={{ scale: 1.02 }}
          >
            "L'éducation est l'arme la plus puissante pour changer le monde"
          </motion.blockquote>
          <motion.cite
            className="text-lg text-amber-700 dark:text-amber-300"
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