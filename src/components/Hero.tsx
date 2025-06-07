import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight, BookOpen, GraduationCap, Users } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images du carousel hero
  const heroImages = [
    '/2022-10-04 (1).webp',
    '/2022-10-04 (1) copy.webp',
    '/2022-10-04 copy.webp',
    '/IMG-20221220-WA0022 copy.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-indigo-900/80 to-blue-800/85 z-10" />
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={heroImages[currentSlide]}
            alt="CS Quartier Latin EM - École"
            className="w-full h-full object-cover object-center"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            style={{ 
              objectPosition: 'center center',
              minHeight: '100vh',
              minWidth: '100vw'
            }}
          />
        </AnimatePresence>
        
        {/* Motifs scolaires flottants */}
        <div className="absolute inset-0 z-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              {i % 3 === 0 && <BookOpen className="w-8 h-8 text-blue-300/40" />}
              {i % 3 === 1 && <GraduationCap className="w-10 h-10 text-indigo-300/40" />}
              {i % 3 === 2 && <Users className="w-6 h-6 text-blue-400/40" />}
            </motion.div>
          ))}
        </div>
        
        {/* Navigation du carousel - Mobile optimized avec bleu */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 z-30 p-2 sm:p-3 bg-blue-600/20 backdrop-blur-sm rounded-full hover:bg-blue-500/30 transition-all duration-300 border border-blue-400/30"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.4)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-100" />
        </motion.button>
        
        <motion.button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-30 p-2 sm:p-3 bg-blue-600/20 backdrop-blur-sm rounded-full hover:bg-blue-500/30 transition-all duration-300 border border-blue-400/30"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.4)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-100" />
        </motion.button>

        {/* Indicateurs du carousel - Mobile responsive avec bleu */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-400 scale-125 shadow-lg shadow-blue-400/50' 
                  : 'bg-blue-300/50 hover:bg-blue-300/80'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>

      {/* Contenu principal - Mobile first responsive avec bleu */}
      <motion.div
        className="relative z-20 w-full text-center text-white px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Message principal - Responsive typography avec bleu */}
        <motion.div
          className="max-w-5xl mx-auto mb-8 sm:mb-12 lg:mb-16"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-br from-blue-800/40 to-indigo-800/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-blue-400/20">
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-4 sm:mb-6 text-blue-100 font-serif italic leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              "Le meilleur choix pour vos enfants"
            </motion.p>
            
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-2xl text-blue-200 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Donnez la meilleure chance de réussite à votre enfant en l'inscrivant dans l'établissement de référence, 
              <strong className="text-blue-100"> Quartier Latin Emmanuel Mounier</strong>.
            </motion.p>
          </div>
        </motion.div>
        
        {/* Boutons d'action - Mobile responsive avec bleu */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <motion.a
            href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl shadow-2xl border border-blue-400/30"
            whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Inscrivez-vous
          </motion.a>
          
          <motion.a
            href="#about"
            className="w-full sm:w-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-blue-100/10 to-indigo-100/10 hover:from-blue-100/20 hover:to-indigo-100/20 backdrop-blur-sm text-white font-bold text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl shadow-2xl border border-blue-300/40"
            whileHover={{ scale: 1.05, y: -3, borderColor: 'rgba(147, 197, 253, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            En savoir plus
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator avec bleu */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300/80" />
      </motion.div>
    </section>
  );
};

export default Hero;