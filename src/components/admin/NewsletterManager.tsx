import React, { useState, useEffect } from 'react';
import { Mail, Download, AlertCircle, Users } from 'lucide-react';

const NewsletterManager = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const stored = localStorage.getItem('admin_newsletter');
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        setData({ subscribers: [] });
        localStorage.setItem('admin_newsletter', JSON.stringify({ subscribers: [] }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!data?.subscribers?.length) {
      setMessage('Aucun abonné à exporter');
      return;
    }

    const csvContent = 'Email\n' + data.subscribers.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'newsletter-subscribers.csv';
    link.click();
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-blue-900 dark:text-white">Gestion Newsletter</h1>
        <button
          onClick={handleExport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Exporter CSV
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center ${
          message.includes('Erreur') ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
        }`}>
          <AlertCircle className="w-5 h-5 mr-2" />
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-4">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Abonnés</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{data?.subscribers?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mr-4">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emails Valides</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {data?.subscribers?.filter(email => email.includes('@')).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mr-4">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dernière Inscription</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Aujourd'hui</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribers List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Liste des Abonnés ({data?.subscribers?.length || 0})
        </h2>
        
        {data?.subscribers?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Date d'inscription</th>
                </tr>
              </thead>
              <tbody>
                {data.subscribers.map((email, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-900 dark:text-white">{email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        email.includes('@') 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {email.includes('@') ? 'Valide' : 'Invalide'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {new Date().toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Aucun abonné pour le moment</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Les emails collectés via le formulaire de newsletter apparaîtront ici
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-2">
          À propos de la Newsletter
        </h3>
        <p className="text-blue-800 dark:text-blue-300 mb-4">
          La newsletter permet de collecter les emails des visiteurs intéressés par les actualités de l'école.
          Le formulaire apparaît automatiquement après 10 secondes sur le site public.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">Fonctionnalités:</h4>
            <ul className="space-y-1 text-blue-800 dark:text-blue-300">
              <li>• Collecte automatique des emails</li>
              <li>• Validation des adresses email</li>
              <li>• Export en format CSV</li>
              <li>• Affichage unique par visiteur</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">Utilisation:</h4>
            <ul className="space-y-1 text-blue-800 dark:text-blue-300">
              <li>• Envoi d'actualités scolaires</li>
              <li>• Notifications d'événements</li>
              <li>• Informations importantes</li>
              <li>• Communication avec les parents</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterManager;