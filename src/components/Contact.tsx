import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Instagram, Send } from 'lucide-react';

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
    <section id="contact" ref={ref} className="py-20 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white relative overflow-hidden">
      {/* Motifs africains traditionnels animés */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute border-4 ${
              i % 3 === 0 ? 'border-amber-400/30' : 
              i % 3 === 1 ? 'border-orange-400/30' : 
              'border-red-400/30'
            } ${
              i % 2 === 0 ? 'rounded-full' : 'transform rotate-45'
            }`}
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 360],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête avec couleurs béninoises */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-amber-200 via-orange-200 to-red-200 bg-clip-text text-transparent mb-8"
            variants={itemVariants}
          >
            📞 Contactez-Nous
          </motion.h2>
          <motion.div
            className="w-32 h-2 bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 mx-auto mb-8 rounded-full"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-amber-200 max-w-3xl mx-auto leading-relaxed"
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
          {/* Informations de contact avec couleurs traditionnelles */}
          <motion.div className="flex-shrink-0 w-full max-w-md" variants={itemVariants}>
            <div>
              <h3 className="text-3xl font-bold text-amber-200 mb-8 text-center">
                📋 Informations de Contact
              </h3>
              
              <div className="space-y-6">
                {[
                  { icon: Phone, title: 'Téléphone', content: schoolData.ecole.telephone, color: 'from-amber-500 to-orange-600' },
                  { icon: Mail, title: 'Email', content: schoolData.ecole.email, color: 'from-orange-500 to-red-600' },
                  { icon: MapPin, title: 'Adresse', content: schoolData.ecole.adresse, color: 'from-red-500 to-amber-600' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      className="flex items-start group justify-center"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mr-6 shadow-2xl border-4 border-white`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="text-center">
                        <h4 className="font-bold text-amber-200 mb-2 text-lg">
                          {item.title}
                        </h4>
                        <p className="text-amber-100 text-lg">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}

                <motion.div
                  className="flex items-start group justify-center"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-amber-600 to-red-600 rounded-2xl flex items-center justify-center mr-6 shadow-2xl border-4 border-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Clock className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-center">
                    <h4 className="font-bold text-amber-200 mb-2 text-lg">
                      ⏰ Horaires
                    </h4>
                    <p className="text-amber-100">
                      Lun - Ven: {schoolData.ecole.horaires.lundi_vendredi}
                    </p>
                    <p className="text-amber-100">
                      Samedi: {schoolData.ecole.horaires.samedi}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Actions rapides avec couleurs béninoises */}
            <motion.div className="space-y-6 mt-8" variants={itemVariants}>
              <h4 className="text-2xl font-bold text-amber-200 text-center">
                ⚡ Actions Rapides
              </h4>
              
              <div className="flex justify-center">
                <motion.a
                  href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 p-6 rounded-2xl transition-all duration-300 shadow-2xl group max-w-md border-4 border-white"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-8 h-8 mr-4 group-hover:animate-bounce" />
                  <div className="text-center">
                    <span className="font-bold text-lg block">📱 Inscription via WhatsApp</span>
                    <span className="text-amber-100 text-sm">Réponse immédiate garantie 🇧🇯</span>
                  </div>
                  <Send className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
                </motion.a>
              </div>

              <div className="flex justify-center gap-4">
                {[
                  { icon: Facebook, label: 'Facebook', color: 'from-amber-600 to-orange-700' },
                  { icon: Instagram, label: 'Instagram', color: 'from-orange-500 to-red-600' }
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href="#"
                      className={`flex items-center justify-center bg-gradient-to-r ${social.color} p-4 rounded-xl transition-all duration-300 shadow-xl group w-32 border-2 border-white`}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                      <span className="font-semibold text-sm">{social.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* SECTION LOCALISATION AVEC IMAGES BÉNINOISES */}
          <motion.div className="flex-shrink-0 w-full max-w-md" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-amber-200 mb-8 text-center">
              🗺️ Notre Localisation Béninoise
            </h3>
            
            {/* Image traditionnelle du Bénin */}
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 border-4 border-amber-400"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Paysage traditionnel du Bénin"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-orange-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-2xl font-bold mb-2">🇧🇯 Bénin - Quartier Latin</h4>
                <p className="text-amber-200">Terre d'excellence africaine 🌟</p>
              </div>
              {/* Motifs décoratifs traditionnels */}
              <div className="absolute top-4 right-4 w-12 h-12 border-2 border-amber-300 rounded-full"></div>
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-orange-300 transform rotate-45"></div>
            </motion.div>

            {/* Carte interactive avec bordure traditionnelle */}
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 border-4 border-orange-400"
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
              
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent pointer-events-none rounded-3xl"></div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-amber-800/40 via-orange-800/40 to-red-800/40 backdrop-blur-sm rounded-2xl p-6 border-4 border-red-400 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-bold text-amber-200 mb-4 text-xl">
                🧭 Comment nous trouver ?
              </h4>
              <p className="text-amber-100 leading-relaxed mb-4">
                <strong>📍 Adresse complète :</strong> Zogbadjè, Abomey-Calavi, Bénin
              </p>
              <p className="text-amber-100 leading-relaxed mb-4">
                Notre établissement se trouve dans un cadre verdoyant et sécurisé béninois, 
                facilement accessible en transport en commun depuis Cotonou. 🚌
              </p>
              
              <div className="space-y-2">
                <motion.div
                  className="flex items-center justify-center text-amber-200"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-semibold">
                    🚌 Proche des arrêts de transport public
                  </span>
                </motion.div>
                
                <motion.div
                  className="flex items-center justify-center text-amber-200"
                  whileHover={{ x: 5 }}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-semibold">
                    📅 Ouvert du lundi au samedi
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call to action final avec couleurs béninoises */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.div
            className="bg-gradient-to-br from-amber-800/50 via-orange-800/50 to-red-800/50 backdrop-blur-sm rounded-3xl p-12 border-4 border-amber-400 max-w-4xl mx-auto relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Motifs décoratifs traditionnels */}
            <div className="absolute top-8 right-8 w-20 h-20 border-3 border-orange-400/40 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-3 border-red-400/40 transform rotate-45"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-amber-200 mb-6">
                🇧🇯 Prêt à rejoindre notre famille béninoise ?
              </h3>
              <p className="text-xl text-amber-100 mb-8 leading-relaxed">
                Donnez à votre enfant les meilleures chances de réussir dans un environnement 
                d'excellence africaine traditionnelle. Contactez-nous dès aujourd'hui ! 
                <strong className="text-orange-300">Vive le Bénin ! 🌟</strong>
              </p>
              
              <motion.a
                href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white font-bold text-xl rounded-2xl shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6 mr-3" />
                📞 Contactez-nous Maintenant
                <Send className="w-6 h-6 ml-3" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;