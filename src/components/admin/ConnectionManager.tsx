import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, EyeOff, Key, User, AlertCircle, CheckCircle } from 'lucide-react';

const ConnectionManager = () => {
  const [currentEmail, setCurrentEmail] = useState('admin@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleUpdateCredentials = (e) => {
    e.preventDefault();
    
    // Vérification du mot de passe actuel
    if (currentPassword !== 'admin') {
      setMessage('Mot de passe actuel incorrect');
      setMessageType('error');
      return;
    }

    // Vérification que les nouveaux mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setMessage('Les nouveaux mots de passe ne correspondent pas');
      setMessageType('error');
      return;
    }

    // Vérification de la longueur du mot de passe
    if (newPassword.length < 4) {
      setMessage('Le nouveau mot de passe doit contenir au moins 4 caractères');
      setMessageType('error');
      return;
    }

    // Vérification de l'email
    if (newEmail && !newEmail.includes('@')) {
      setMessage('Veuillez entrer une adresse email valide');
      setMessageType('error');
      return;
    }

    try {
      // Mise à jour des informations de connexion
      const updatedCredentials = {
        email: newEmail || currentEmail,
        password: newPassword
      };

      // Sauvegarder dans localStorage (pour cette démo)
      localStorage.setItem('admin_credentials', JSON.stringify(updatedCredentials));
      
      // Mettre à jour l'état local
      setCurrentEmail(updatedCredentials.email);
      
      // Réinitialiser les champs
      setCurrentPassword('');
      setNewEmail('');
      setNewPassword('');
      setConfirmPassword('');
      
      setMessage('Informations de connexion mises à jour avec succès');
      setMessageType('success');
      
      // Effacer le message après 5 secondes
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
      
    } catch (error) {
      setMessage('Erreur lors de la mise à jour');
      setMessageType('error');
    }
  };

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-blue-900 dark:text-white">Informations de Connexion</h1>
      </div>

      {message && (
        <motion.div
          className={`p-4 rounded-lg flex items-center ${
            messageType === 'error' 
              ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800' 
              : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {messageType === 'error' ? (
            <AlertCircle className="w-5 h-5 mr-2" />
          ) : (
            <CheckCircle className="w-5 h-5 mr-2" />
          )}
          {message}
        </motion.div>
      )}

      <motion.div
        className="grid lg:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Informations actuelles */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-600" />
            Informations Actuelles
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email actuel
              </label>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
                <span className="text-gray-900 dark:text-white font-medium">{currentEmail}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
                <span className="text-gray-500 dark:text-gray-400">••••••••</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-2">
              Sécurité
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Changez régulièrement vos informations de connexion pour maintenir la sécurité de votre compte administrateur.
            </p>
          </div>
        </motion.div>

        {/* Formulaire de modification */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Key className="w-6 h-6 mr-3 text-green-600" />
            Modifier les Informations
          </h2>

          <form onSubmit={handleUpdateCredentials} className="space-y-6">
            {/* Mot de passe actuel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe actuel *
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Entrez votre mot de passe actuel"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Nouvel email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nouvel email (optionnel)
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Laissez vide pour conserver l'email actuel"
              />
            </div>

            {/* Nouveau mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nouveau mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Entrez le nouveau mot de passe"
                  required
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirmation du mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirmer le nouveau mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Confirmez le nouveau mot de passe"
                  required
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-5 h-5 mr-2" />
              Mettre à jour les informations
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* Conseils de sécurité */}
      <motion.div
        className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 border border-amber-200 dark:border-amber-800"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-400 mb-4">
          💡 Conseils de Sécurité
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Mot de passe sécurisé :</h4>
            <ul className="space-y-1 text-amber-700 dark:text-amber-400">
              <li>• Au moins 8 caractères recommandés</li>
              <li>• Mélange de lettres, chiffres et symboles</li>
              <li>• Évitez les mots du dictionnaire</li>
              <li>• Unique pour ce compte admin</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Bonnes pratiques :</h4>
            <ul className="space-y-1 text-amber-700 dark:text-amber-400">
              <li>• Changez le mot de passe régulièrement</li>
              <li>• Ne partagez jamais vos identifiants</li>
              <li>• Déconnectez-vous après utilisation</li>
              <li>• Utilisez un email professionnel</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConnectionManager;