import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Instagram, Send, School, BookOpen, Users, Calculator } from 'lucide-react';

const Contact = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [schoolData, setSchoolData] = useState(null);

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
    <section id="contact" ref={ref} className="py-20 bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 text-white relative overflow-hidden">
      {/* Motifs scolaires traditionnels animés */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6
            }}
          >
            {i % 6 === 0 && <School className="w-8 h-8 text-slate-400/30" />}
            {i % 6 === 1 && <BookOpen className="w-6 h-6 text-gray-400/30" />}
            {i % 6 === 2 && <Users className="w-7 h-7 text-slate-500/30" />}
            {i % 6 === 3 && <Phone className="w-5 h-5 text-gray-400/30" />}
            {i % 6 === 4 && <Calculator className="w-6 h-6 text-slate-400/30" />}
            {i % 6 === 5 && <Mail className="w-5 h-5 text-gray-500/30" />}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête avec couleurs harmonieuses et motifs */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-200 via-gray-200 to-slate-100 bg-clip-text text-transparent mb-8 relative"
            variants={itemVariants}
          >
            📞 Contactez-Nous
            {/* Motifs scolaires autour du titre */}
            <motion.div
              className="absolute -top-4 -left-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <School className="w-8 h-8 text-slate-300/50" />
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <BookOpen className="w-6 h-6 text-gray-300/50" />
            </motion.div>
          </motion.h2>
          <motion.div
            className="w-32 h-2 bg-gradient-to-r from-slate-300 via-gray-300 to-slate-200 mx-auto mb-8 rounded-full"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            🇧🇯 Notre équipe béninoise est à votre disposition pour répondre à toutes vos questions 
            et vous accompagner dans vos démarches d'inscription
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Informations de contact avec couleurs harmonieuses et effets hover */}
          <motion.div className="flex-shrink-0 w-full max-w-md" variants={itemVariants}>
            <div>
              <h3 className="text-3xl font-bold text-slate-200 mb-8 text-center flex items-center justify-center">
                📋 Informations de Contact
                <motion.div
                  className="ml-3"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Users className="w-6 h-6 text-slate-300/70" />
                </motion.div>
              </h3>
              
              <div className="space-y-6">
                {[
                  { icon: Phone, title: 'Téléphone', content: schoolData.ecole.telephone, color: 'from-slate-500 to-gray-600' },
                  { icon: Mail, title: 'Email', content: schoolData.ecole.email, color: 'from-gray-500 to-slate-600' },
                  { icon: MapPin, title: 'Adresse', content: schoolData.ecole.adresse, color: 'from-slate-600 to-gray-700' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      className="flex items-start group justify-center relative"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mr-6 shadow-2xl border-4 border-white dark:hover:neon-border relative`}
                        whileHover={{ scale: 1.1, rotate: 5, boxShadow: '0 15px 30px rgba(71, 85, 105, 0.5)' }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                        {/* Motif scolaire au hover */}
                        <motion.div
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <School className="w-4 h-4 text-white/80" />
                        </motion.div>
                      </motion.div>
                      <div className="text-center">
                        <h4 className="font-bold text-slate-200 mb-2 text-lg">
                          {item.title}
                        </h4>
                        <p className="text-slate-100 text-lg">
                          {item.content}
                        </p>
                      </div>
                      {/* Motif scolaire flottant */}
                      <motion.div
                        className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <BookOpen className="w-4 h-4 text-slate-300/60" />
                      </motion.div>
                    </motion.div>
                  );
                })}

                <motion.div
                  className="flex items-start group justify-center relative"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-700 rounded-2xl flex items-center justify-center mr-6 shadow-2xl border-4 border-white dark:hover:neon-border relative"
                    whileHover={{ scale: 1.1, rotate: 5, boxShadow: '0 15px 30px rgba(71, 85, 105, 0.5)' }}
                  >
                    <Clock className="w-8 h-8 text-white" />
                    {/* Motif scolaire au hover */}
                    <motion.div
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Calculator className="w-4 h-4 text-white/80" />
                    </motion.div>
                  </motion.div>
                  <div className="text-center">
                    <h4 className="font-bold text-slate-200 mb-2 text-lg">
                      ⏰ Horaires
                    </h4>
                    <p className="text-slate-100">
                      Lun - Ven: {schoolData.ecole.horaires.lundi_vendredi}
                    </p>
                    <p className="text-slate-100">
                      Samedi: {schoolData.ecole.horaires.samedi}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Actions rapides avec couleurs harmonieuses et motifs */}
            <motion.div className="space-y-6 mt-8" variants={itemVariants}>
              <h4 className="text-2xl font-bold text-slate-200 text-center flex items-center justify-center">
                ⚡ Actions Rapides
                <motion.div
                  className="ml-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="w-5 h-5 text-slate-300/70" />
                </motion.div>
              </h4>
              
              <div className="flex justify-center">
                <motion.a
                  href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-gradient-to-r from-slate-500 via-gray-500 to-slate-600 hover:from-slate-400 hover:via-gray-400 hover:to-slate-500 p-6 rounded-2xl transition-all duration-300 shadow-2xl group max-w-md border-4 border-white dark:hover:neon-border relative"
                  whileHover={{ scale: 1.02, y: -5, boxShadow: '0 20px 40px rgba(71, 85, 105, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-8 h-8 mr-4 group-hover:animate-bounce" />
                  <div className="text-center">
                    <span className="font-bold text-lg block">📱 Inscription via WhatsApp</span>
                    <span className="text-slate-100 text-sm">Réponse immédiate garantie 🇧🇯</span>
                  </div>
                  <Send className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
                  {/* Motifs scolaires au hover */}
                  <motion.div
                    className="absolute -top-3 -left-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <School className="w-5 h-5 text-white/70" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <BookOpen className="w-4 h-4 text-white/70" />
                  </motion.div>
                </motion.a>
              </div>

              <div className="flex justify-center gap-4">
                {[
                  { icon: Facebook, label: 'Facebook', color: 'from-slate-600 to-gray-700' },
                  { icon: Instagram, label: 'Instagram', color: 'from-gray-500 to-slate-600' }
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href="#"
                      className={`flex items-center justify-center bg-gradient-to-r ${social.color} p-4 rounded-xl transition-all duration-300 shadow-xl group w-32 border-2 border-white dark:hover:neon-border relative`}
                      whileHover={{ scale: 1.05, y: -3, boxShadow: '0 10px 25px rgba(71, 85, 105, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                      <span className="font-semibold text-sm">{social.label}</span>
                      {/* Motif scolaire au hover */}
                      <motion.div
                        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5 }}
                      >
                        <Users className="w-3 h-3 text-white/80" />
                      </motion.div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* SECTION LOCALISATION AVEC IMAGES BÉNINOISES et motifs */}
          <motion.div className="flex-shrink-0 w-full max-w-md" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-slate-200 mb-8 text-center flex items-center justify-center">
              🗺️ Notre Localisation Béninoise
              <motion.div
                className="ml-3"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <MapPin className="w-6 h-6 text-slate-300/70" />
              </motion.div>
            </h3>
            
            {/* Image traditionnelle du Bénin avec motifs */}
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 border-4 border-slate-400 group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Paysage traditionnel du Bénin"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-gray-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-2xl font-bold mb-2">🇧🇯 Bénin - Quartier Latin</h4>
                <p className="text-slate-200">Terre d'excellence africaine 🌟</p>
              </div>
              {/* Motifs décoratifs traditionnels avec animations */}
              <motion.div
                className="absolute top-4 right-4 w-12 h-12 border-2 border-slate-300 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute top-4 left-4 w-8 h-8 border-2 border-gray-300 transform rotate-45"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Motifs scolaires au hover */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <School className="w-8 h-8 text-white/50" />
              </motion.div>
            </motion.div>

            {/* Carte interactive avec bordure traditionnelle et motifs */}
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 border-4 border-gray-400 group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.765795240045!2d2.3316807747523716!3d6.424130193566877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1024a94f123593dd%3A0x53e0f076044da538!2sCS%20Quartier%20Latin%20EM!5e0!3m2!1sfr!2sfr!4v1749255291130!5m2!1sfr!2sfr"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-80 rounded-3xl"
              ></iframe>
              
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none rounded-3xl"></div>
              {/* Motifs scolaires au hover de la carte */}
              <motion.div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <BookOpen className="w-6 h-6 text-slate-600/70" />
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-slate-800/40 via-gray-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border-4 border-slate-400 dark:hover:neon-border text-center relative group"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-bold text-slate-200 mb-4 text-xl flex items-center justify-center">
                🧭 Comment nous trouver ?
                <motion.div
                  className="ml-2"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Calculator className="w-5 h-5 text-slate-300/70" />
                </motion.div>
              </h4>
              <p className="text-slate-100 leading-relaxed mb-4">
                <strong>📍 Adresse complète :</strong> Zogbadjè, Abomey-Calavi, Bénin
              </p>
              <p className="text-slate-100 leading-relaxed mb-4">
                Notre établissement se trouve dans un cadre verdoyant et sécurisé béninois, 
                facilement accessible en transport en commun depuis Cotonou. 🚌
              </p>
              
              <div className="space-y-2">
                <motion.div
                  className="flex items-center justify-center text-slate-200 group"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-semibold">
                    🚌 Proche des arrêts de transport public
                  </span>
                  <motion.div
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2 }}
                  >
                    <Users className="w-3 h-3 text-slate-300/70" />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  className="flex items-center justify-center text-slate-200 group"
                  whileHover={{ x: 5 }}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-semibold">
                    📅 Ouvert du lundi au samedi
                  </span>
                  <motion.div
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <School className="w-3 h-3 text-slate-300/70" />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Motifs scolaires flottants dans la section */}
              <motion.div
                className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <BookOpen className="w-4 h-4 text-slate-300/60" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                <Calculator className="w-4 h-4 text-gray-300/60" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call to action final avec couleurs harmonieuses et motifs */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.div
            className="bg-gradient-to-br from-slate-800/50 via-gray-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border-4 border-slate-400 dark:hover:neon-border max-w-4xl mx-auto relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
          >
            {/* Motifs décoratifs traditionnels avec animations */}
            <motion.div
              className="absolute top-8 right-8 w-20 h-20 border-3 border-gray-400/40 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-8 left-8 w-16 h-16 border-3 border-slate-400/40 transform rotate-45"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-slate-200 mb-6 flex items-center justify-center">
                🇧🇯 Prêt à rejoindre notre famille béninoise ?
                <motion.div
                  className="ml-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <School className="w-8 h-8 text-slate-300/70" />
                </motion.div>
              </h3>
              <p className="text-xl text-slate-100 mb-8 leading-relaxed">
                Donnez à votre enfant les meilleures chances de réussir dans un environnement 
                d'excellence africaine traditionnelle. Contactez-nous dès aujourd'hui ! 
                <strong className="text-gray-300">Vive le Bénin ! 🌟</strong>
              </p>
              
              <motion.a
                href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-slate-500 via-gray-500 to-slate-600 hover:from-slate-400 hover:via-gray-400 hover:to-slate-500 text-white font-bold text-xl rounded-2xl shadow-2xl border-4 border-white dark:hover:neon-border relative group"
                whileHover={{ scale: 1.05, y: -5, boxShadow: '0 25px 50px rgba(71, 85, 105, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6 mr-3" />
                📞 Contactez-nous Maintenant
                <Send className="w-6 h-6 ml-3" />
                {/* Motifs scolaires au hover du bouton */}
                <motion.div
                  className="absolute -top-3 -left-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <BookOpen className="w-5 h-5 text-white/80" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="w-4 h-4 text-white/80" />
                </motion.div>
              </motion.a>
            </div>
            
            {/* Motifs scolaires flottants dans le CTA */}
            <motion.div
              className="absolute top-1/4 left-1/4 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Calculator className="w-6 h-6 text-slate-300/40" />
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 right-1/4 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <School className="w-7 h-7 text-gray-300/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;