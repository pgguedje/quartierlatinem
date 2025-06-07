import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';

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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-gray-900/70 to-slate-800/80 z-10" />
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
        
        {/* Navigation du carousel - Mobile optimized */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 z-30 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
        </motion.button>
        
        <motion.button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-30 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
        </motion.button>

        {/* Indicateurs du carousel - Mobile responsive */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Contenu principal - Mobile first responsive */}
      <motion.div
        className="relative z-20 w-full text-center text-white px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Message principal - Responsive typography */}
        <motion.div
          className="max-w-5xl mx-auto mb-8 sm:mb-12 lg:mb-16"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-br from-slate-800/30 to-gray-800/30 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/10">
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-4 sm:mb-6 text-slate-100 font-serif italic leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              "Le meilleur choix pour vos enfants"
            </motion.p>
            
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-2xl text-slate-200 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Donnez la meilleure chance de réussite à votre enfant en l'inscrivant dans l'établissement de référence, 
              <strong className="text-slate-100"> Quartier Latin Emmanuel Mounier</strong>.
            </motion.p>
          </div>
        </motion.div>
        
        {/* Boutons d'action - Mobile responsive */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <motion.a
            href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-slate-700 to-gray-700 hover:from-slate-600 hover:to-gray-600 text-white font-bold text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/20"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Inscrivez-vous
          </motion.a>
          
          <motion.a
            href="#about"
            className="w-full sm:w-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-white/10 to-slate-100/10 hover:from-white/20 hover:to-slate-100/20 backdrop-blur-sm text-white font-bold text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/30"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            En savoir plus
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-white/80" />
      </motion.div>
    </section>
  );
};

export default Hero;