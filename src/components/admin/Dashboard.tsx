import React, { useState, useEffect } from 'react';
import { School, UtensilsCrossed, Megaphone, Mail, TrendingUp, Users, FileText } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAnnouncements: 0,
    newsletterSubscribers: 0,
    lastUpdate: '',
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get data from localStorage or fallback to public data
      const annoncesData = JSON.parse(localStorage.getItem('admin_annonces') || '{"annonces":[]}');
      const newsletterData = JSON.parse(localStorage.getItem('admin_newsletter') || '{"subscribers":[]}');

      setStats({
        totalAnnouncements: annoncesData.annonces?.length || 0,
        newsletterSubscribers: newsletterData.subscribers?.length || 0,
        lastUpdate: new Date().toLocaleDateString('fr-FR'),
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const cards = [
    {
      title: 'Infos Établissement',
      description: 'Gérer les informations générales',
      icon: School,
      color: 'bg-blue-500',
      link: '/djidjognon/infos'
    },
    {
      title: 'Cantine',
      description: 'Menus et tarifs de la cantine',
      icon: UtensilsCrossed,
      color: 'bg-green-500',
      link: '/djidjognon/cantine'
    },
    {
      title: 'Annonces',
      description: `${stats.totalAnnouncements} annonces actives`,
      icon: Megaphone,
      color: 'bg-yellow-500',
      link: '/djidjognon/annonces'
    },
    {
      title: 'Newsletter',
      description: `${stats.newsletterSubscribers} abonnés`,
      icon: Mail,
      color: 'bg-purple-500',
      link: '/djidjognon/newsletter'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-blue-900 dark:text-white">Tableau de bord</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Dernière mise à jour: {stats.lastUpdate}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => window.location.href = card.link}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${card.color} text-white mr-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{card.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
            <span className="text-blue-900 dark:text-blue-400 font-medium">Voir les statistiques</span>
          </button>
          <button 
            onClick={() => window.location.href = '/djidjognon/annonces'}
            className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <Megaphone className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
            <span className="text-green-900 dark:text-green-400 font-medium">Nouvelle annonce</span>
          </button>
          <button className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3" />
            <span className="text-purple-900 dark:text-purple-400 font-medium">Gérer les données</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Activité récente</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700 dark:text-gray-300">Système d'administration initialisé</span>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">Il y a quelques instants</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-gray-700 dark:text-gray-300">Interface d'administration prête</span>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">Il y a quelques instants</span>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-2 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          À propos de cette interface
        </h3>
        <p className="text-blue-800 dark:text-blue-300 mb-4">
          Cette interface d'administration vous permet de gérer facilement le contenu du site web de l'école CS Quartier Latin.
          Toutes les modifications sont sauvegardées localement pour cette démonstration.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">Fonctionnalités:</h4>
            <ul className="space-y-1 text-blue-800 dark:text-blue-300">
              <li>• Gestion des informations de l'école</li>
              <li>• Mise à jour des menus de cantine</li>
              <li>• Publication d'annonces</li>
              <li>• Suivi des abonnés newsletter</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">Sécurité:</h4>
            <ul className="space-y-1 text-blue-800 dark:text-blue-300">
              <li>• Authentification requise</li>
              <li>• Sauvegarde automatique</li>
              <li>• Export/Import des données</li>
              <li>• Interface responsive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;