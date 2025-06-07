import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FileText, CreditCard, Phone, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

const InscriptionSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [schoolData, setSchoolData] = useState(null);
  const [openAccordion, setOpenAccordion] = useState('frais');

  useEffect(() => {
    const stored = localStorage.getItem('admin_infos');
    if (stored) {
      setSchoolData(JSON.parse(stored));
    } else {
      fetch('/data/infos.json')
        .then(res => res.json())
        .then(data => {
          setSchoolData(data);
          localStorage.setItem('admin_infos', JSON.stringify(data));
        })
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

  const accordions = [
    {
      id: 'frais',
      title: 'Frais de Scolarité',
      icon: CreditCard,
      color: 'from-amber-500 to-orange-600',
      content: (
        <div className="flex flex-wrap justify-center gap-6">
          {Object.entries(schoolData.frais).map(([niveau, info]) => (
            <motion.div
              key={niveau}
              className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl border-4 border-amber-400 flex-shrink-0 w-80"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h4 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 capitalize text-center">
                🎓 {niveau}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-amber-700 dark:text-amber-300">Anciens élèves:</span>
                  <span className="font-bold text-amber-900 dark:text-amber-100">
                    {info.anciens.toLocaleString()} FCFA 💰
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-700 dark:text-amber-300">Nouveaux élèves:</span>
                  <span className="font-bold text-amber-900 dark:text-amber-100">
                    {info.nouveaux.toLocaleString()} FCFA 💰
                  </span>
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-3 italic text-center">
                  ✨ {info.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'documents',
      title: 'Documents Requis',
      icon: FileText,
      color: 'from-orange-500 to-red-600',
      content: (
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          <div className="text-center flex-shrink-0 w-96">
            <h4 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-6">
              📋 Pour tous les niveaux:
            </h4>
            <ul className="space-y-4">
              {[
                '📄 Acte de naissance (copie légalisée)',
                '🏥 Certificat médical récent',
                '📸 4 photos d\'identité récentes',
                '📝 Fiche de renseignements (à retirer à l\'école)'
              ].map((doc, index) => (
                <motion.li
                  key={index}
                  className="flex items-start text-orange-800 dark:text-orange-200 justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                  {doc}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="text-center flex-shrink-0 w-96">
            <h4 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-6">
              🎒 Documents scolaires:
            </h4>
            <ul className="space-y-4">
              {[
                '📊 Bulletin de l\'année précédente',
                '🔄 Certificat de transfert (si changement d\'école)',
                '📈 Relevé de notes (pour le secondaire)'
              ].map((doc, index) => (
                <motion.li
                  key={index}
                  className="flex items-start text-orange-800 dark:text-orange-200 justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <span className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                  {doc}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'uniformes',
      title: 'Uniformes & Fournitures',
      icon: GraduationCap,
      color: 'from-red-500 to-amber-600',
      content: (
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          <div className="text-center flex-shrink-0 w-96">
            <h4 className="text-xl font-bold text-red-900 dark:text-red-100 mb-6">
              👕 Uniformes:
            </h4>
            <div className="space-y-6">
              <motion.div
                className="p-6 bg-gradient-to-br from-red-50 to-amber-50 dark:from-red-900/20 dark:to-amber-900/20 rounded-2xl border-4 border-red-400 max-w-sm mx-auto"
                whileHover={{ scale: 1.02 }}
              >
                <h5 className="font-bold text-red-800 dark:text-red-200 mb-2">
                  🧒 Maternelle & Primaire
                </h5>
                <p className="text-red-700 dark:text-red-300 mb-2">
                  Blouse bleue, short/jupe kaki
                </p>
                <p className="text-sm text-red-600 dark:text-red-400">
                  👟 Chaussures noires fermées obligatoires
                </p>
              </motion.div>
              <motion.div
                className="p-6 bg-gradient-to-br from-red-50 to-amber-50 dark:from-red-900/20 dark:to-amber-900/20 rounded-2xl border-4 border-red-400 max-w-sm mx-auto"
                whileHover={{ scale: 1.02 }}
              >
                <h5 className="font-bold text-red-800 dark:text-red-200 mb-2">
                  🎓 Secondaire
                </h5>
                <p className="text-red-700 dark:text-red-300 mb-2">
                  Chemise blanche, pantalon/jupe bleu marine
                </p>
                <p className="text-sm text-red-600 dark:text-red-400">
                  👔 Cravate scolaire fournie
                </p>
              </motion.div>
            </div>
          </div>
          <div className="text-center flex-shrink-0 w-96">
            <h4 className="text-xl font-bold text-red-900 dark:text-red-100 mb-6">
              📚 Fournitures:
            </h4>
            <div className="space-y-4 text-red-800 dark:text-red-200">
              {[
                '📝 Liste détaillée disponible par niveau',
                '✏️ Fournitures de base incluses dans les frais',
                '📖 Livres disponibles à la librairie de l\'école',
                '💻 Matériel informatique fourni par l\'établissement'
              ].map((item, index) => (
                <motion.p
                  key={index}
                  className="flex items-start justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-red-500 mr-2">•</span>
                  {item}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20 relative overflow-hidden">
      {/* Motifs africains traditionnels */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
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
              scale: [1, 1.3, 1],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2]
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
            className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-8"
            variants={itemVariants}
          >
            📝 Inscriptions
          </motion.h2>
          <motion.div
            className="w-32 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto mb-8 rounded-full"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-amber-800 dark:text-amber-200 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            🇧🇯 Toutes les informations nécessaires pour inscrire votre enfant dans notre établissement d'excellence béninoise
          </motion.p>
        </motion.div>

       

        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {accordions.map((accordion, index) => {
            const Icon = accordion.icon;
            const isOpen = openAccordion === accordion.id;
            
            return (
              <motion.div
                key={accordion.id}
                className="mb-6"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => setOpenAccordion(isOpen ? '' : accordion.id)}
                  className="w-full flex items-center justify-between p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-amber-400"
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accordion.color} flex items-center justify-center mr-6 shadow-lg border-2 border-white`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                      {accordion.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-t-4 border-amber-400 rounded-b-2xl">
                        {accordion.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section avec couleurs traditionnelles */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.div
            className="bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-red-900/30 p-12 rounded-3xl text-amber-900 dark:text-amber-100 max-w-4xl mx-auto shadow-2xl relative overflow-hidden border-4 border-amber-400"
            whileHover={{ scale: 1.02 }}
          >
            {/* Motifs décoratifs traditionnels */}
            <div className="absolute top-8 right-8 w-20 h-20 border-3 border-orange-400/40 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-3 border-red-400/40 transform rotate-45"></div>
            
            <div className="relative z-10">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Phone className="w-10 h-10 text-white" />
              </motion.div>
              
              <h3 className="text-4xl font-bold mb-6">
                🇧🇯 Prêt à inscrire votre enfant ?
              </h3>
              <p className="text-xl mb-8 text-amber-700 dark:text-amber-300 leading-relaxed">
                Contactez-nous dès maintenant pour finaliser l'inscription et offrir 
                à votre enfant un avenir brillant dans notre établissement d'excellence béninoise. 
                <strong className="text-orange-700">Vive l'éducation africaine ! 🌟</strong>
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
                📞 Contacter via WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InscriptionSection;