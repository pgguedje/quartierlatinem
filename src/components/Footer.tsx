import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Star, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
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
    hidden: { opacity: 0, y: 20 },
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
    <footer className="bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white py-6 relative overflow-hidden">
      {/* Motifs africains traditionnels très subtils */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute border-2 ${
              i % 3 === 0 ? 'border-amber-400/10' : 
              i % 3 === 1 ? 'border-orange-400/10' : 
              'border-red-400/10'
            } ${
              i % 2 === 0 ? 'rounded-full' : 'transform rotate-45'
            }`}
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              top: `${40 + i * 20}%`,
              left: `${30 + i * 30}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo & Description compact avec couleurs béninoises */}
          <motion.div
            className="flex items-center mb-4 md:mb-0"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3 shadow-xl border-2 border-white"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-base font-bold text-amber-100">
                🇧🇯 CS Quartier Latin EM
              </h3>
              <p className="text-amber-300 text-xs">Excellence Béninoise</p>
            </div>
          </motion.div>

          {/* Contact rapide avec couleurs traditionnelles - FLEX EN UNE LIGNE */}
          <motion.div
            className="flex items-center space-x-4 mb-4 md:mb-0 flex-wrap justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center text-amber-200 hover:text-amber-100 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">+229 95 96 33 45</span>
            </motion.div>
            <motion.div
              className="flex items-center text-amber-200 hover:text-amber-100 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">contact@csquartierlatin.bj</span>
            </motion.div>
            <motion.div
              className="flex items-center text-amber-200 hover:text-amber-100 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">Abomey-Calavi, Bénin</span>
            </motion.div>
          </motion.div>

          {/* Message inspirant compact avec couleurs béninoises */}
          <motion.div
            className="flex items-center"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center px-3 py-1 bg-gradient-to-r from-amber-800/40 via-orange-800/40 to-red-800/40 backdrop-blur-sm rounded-full border border-amber-300/30"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-3 h-3 text-amber-300 mr-1" />
              <span className="text-amber-200 font-medium text-xs">
                Excellence • Tradition • Avenir 🇧🇯
              </span>
              <Star className="w-3 h-3 text-amber-300 ml-1" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright et développeur - FLEX EN UNE LIGNE ULTRA COMPACT */}
        <motion.div
          className="border-t border-amber-300/20 mt-4 pt-3"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between text-xs">
            <motion.p
              className="text-amber-300 mb-1 md:mb-0"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              © 2025 CS Quartier Latin EM - Tous droits réservés 🇧🇯
            </motion.p>
            
            <motion.div
              className="flex items-center text-amber-200"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="mr-1">Développé avec</span>
              <motion.a
                href="/djidjognon"
                className="mx-1"
                whileHover={{ scale: 1.2 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 text-red-400" />
              </motion.a>
              <span className="ml-1">par</span>
              <motion.a
                href="https://www.linkedin.com/in/prince-gedeon-guedje-488819228/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-semibold text-amber-100 hover:text-white transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Prince Gédéon GUEDJE
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;