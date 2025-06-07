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
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-orange-900/60 to-red-900/70 z-10" />
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
        
        {/* Navigation du carousel - Position absolue avec z-index élevé */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-amber-800/30 backdrop-blur-sm rounded-full hover:bg-amber-700/40 transition-all duration-300 border border-amber-400/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6 text-amber-100" />
        </motion.button>
        
        <motion.button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-amber-800/30 backdrop-blur-sm rounded-full hover:bg-amber-700/40 transition-all duration-300 border border-amber-400/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6 text-amber-100" />
        </motion.button>

        {/* Indicateurs du carousel - Position absolue avec z-index élevé */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-amber-300 scale-125' 
                  : 'bg-amber-100/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Contenu principal */}
      <motion.div
        className="relative z-20 w-full text-center text-white px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Message principal */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-br from-amber-800/20 to-orange-800/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-amber-300/20">
            <motion.p
              className="text-2xl lg:text-4xl mb-6 text-amber-100 font-serif italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              "Le meilleur choix pour vos enfants"
            </motion.p>
            
            <motion.p
              className="text-lg lg:text-2xl text-amber-200 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Donnez la meilleure chance de réussite à votre enfant en l'inscrivant dans l'établissement de référence, 
              <strong className="text-amber-100"> Quartier Latin Emmanuel Mounier</strong>.
            </motion.p>
          </div>
        </motion.div>
        
        {/* Boutons d'action */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          variants={itemVariants}
        >
          <motion.a
            href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 lg:px-12 py-4 lg:py-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-lg lg:text-2xl rounded-2xl shadow-2xl"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Inscrivez-vous
          </motion.a>
          
          <motion.a
            href="#about"
            className="px-8 lg:px-12 py-4 lg:py-6 bg-gradient-to-r from-amber-800/30 to-orange-800/30 hover:from-amber-700/40 hover:to-orange-700/40 backdrop-blur-sm text-white font-bold text-lg lg:text-2xl rounded-2xl shadow-2xl border-2 border-amber-300/40"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            En savoir plus
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-8 h-8 text-amber-200/80" />
      </motion.div>
    </section>
  );
};

export default Hero;