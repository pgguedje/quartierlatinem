import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Star, Phone, Mail, MapPin, BookOpen, School, Users } from 'lucide-react';

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
    <footer className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 text-white py-6 relative overflow-hidden">
      {/* Motifs scolaires subtils */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          >
            {i % 4 === 0 && <School className="w-6 h-6 text-slate-400/20" />}
            {i % 4 === 1 && <BookOpen className="w-5 h-5 text-gray-400/20" />}
            {i % 4 === 2 && <Users className="w-7 h-7 text-slate-500/20" />}
            {i % 4 === 3 && <GraduationCap className="w-8 h-8 text-gray-500/20" />}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo & Description - Mobile responsive avec motifs */}
          <motion.div
            className="flex items-center mb-4 md:mb-0 group"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-600 via-gray-600 to-slate-700 rounded-xl flex items-center justify-center mr-3 shadow-xl border-2 border-white/20 relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              {/* Motif scolaire au hover */}
              <motion.div
                className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <School className="w-2 h-2 text-slate-300" />
              </motion.div>
            </motion.div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100">
                🇧🇯 CS Quartier Latin EM
              </h3>
              <p className="text-slate-300 text-xs">Vouloir Pouvoir Réussir</p>
            </div>
          </motion.div>

          {/* Contact rapide - Mobile responsive avec effets hover */}
          <motion.div
            className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 md:mb-0"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center text-slate-200 hover:text-slate-100 transition-colors group"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <Phone className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">+229 95 96 33 45</span>
              <motion.div
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 1 }}
              >
                <BookOpen className="w-2 h-2 text-slate-300" />
              </motion.div>
            </motion.div>
            <motion.div
              className="flex items-center text-slate-200 hover:text-slate-100 transition-colors group"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <Mail className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">contact@csquartierlatin.bj</span>
              <motion.div
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-2 h-2 text-slate-300" />
              </motion.div>
            </motion.div>
            <motion.div
              className="flex items-center text-slate-200 hover:text-slate-100 transition-colors group"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <MapPin className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">Abomey-Calavi, Bénin</span>
              <motion.div
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <School className="w-2 h-2 text-slate-300" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Message inspirant - Mobile responsive avec motifs */}
          <motion.div
            className="flex items-center group"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center px-3 py-1 bg-gradient-to-r from-slate-700/40 via-gray-700/40 to-slate-800/40 backdrop-blur-sm rounded-full border border-slate-300/20 relative"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-3 h-3 text-slate-300 mr-1" />
              <span className="text-slate-200 font-medium text-xs">
                Excellence • Tradition • Avenir 🇧🇯
              </span>
              <Star className="w-3 h-3 text-slate-300 ml-1" />
              {/* Motifs scolaires flottants au hover */}
              <motion.div
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <GraduationCap className="w-3 h-3 text-slate-300/70" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <BookOpen className="w-2 h-2 text-slate-300/70" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright et développeur - Mobile responsive avec motifs */}
        <motion.div
          className="border-t border-slate-300/20 mt-4 pt-3"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between text-xs">
            <motion.p
              className="text-slate-300 mb-1 md:mb-0 text-center md:text-left"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              © 2025 CS Quartier Latin EM - Tous droits réservés 🇧🇯
            </motion.p>
            
            <motion.div
              className="flex items-center text-slate-200 text-center md:text-right group"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="mr-1">Développé avec</span>
              <motion.a
                href="/djidjognon"
                className="mx-1 relative"
                whileHover={{ scale: 1.2 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 text-red-400" />
                {/* Motif scolaire au hover du cœur */}
                <motion.div
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <School className="w-1 h-1 text-slate-300" />
                </motion.div>
              </motion.a>
              <span className="ml-1">par</span>
              <motion.a
                href="https://www.linkedin.com/in/prince-gedeon-guedje-488819228/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-semibold text-slate-100 hover:text-white transition-colors cursor-pointer relative group"
                whileHover={{ scale: 1.05 }}
              >
                Prince Gédéon GUEDJE
                {/* Motif scolaire au hover du nom */}
                <motion.div
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2 }}
                >
                  <GraduationCap className="w-2 h-2 text-slate-300" />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;