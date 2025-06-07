import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit, AlertCircle, Calendar, Users } from 'lucide-react';

const AnnoncesManager = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newAnnonce, setNewAnnonce] = useState({
    type: 'evenement',
    titre: '',
    date: '',
    public: '',
    description: '',
    important: false
  });

  const types = [
    { value: 'excursion', label: 'Excursion', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
    { value: 'reunion', label: 'Réunion', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
    { value: 'fermeture', label: 'Fermeture', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' },
    { value: 'evenement', label: 'Événement', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const stored = localStorage.getItem('admin_annonces');
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        const response = await fetch('/data/annonces.json');
        const result = await response.json();
        setData(result);
        localStorage.setItem('admin_annonces', JSON.stringify(result));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('admin_annonces', JSON.stringify(data));
      setMessage('Données sauvegardées avec succès');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleAddAnnonce = async () => {
    try {
      const newId = Math.max(...data.annonces.map(a => a.id), 0) + 1;
      const annonceWithId = { ...newAnnonce, id: newId };
      
      setData(prev => ({
        ...prev,
        annonces: [...prev.annonces, annonceWithId]
      }));
      
      setNewAnnonce({
        type: 'evenement',
        titre: '',
        date: '',
        public: '',
        description: '',
        important: false
      });
      
      setMessage('Annonce ajoutée avec succès');
    } catch (error) {
      console.error('Error adding annonce:', error);
      setMessage('Erreur lors de l\'ajout');
    }
  };

  const handleDeleteAnnonce = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        setData(prev => ({
          ...prev,
          annonces: prev.annonces.filter(a => a.id !== id)
        }));
        setMessage('Annonce supprimée avec succès');
      } catch (error) {
        console.error('Error deleting annonce:', error);
        setMessage('Erreur lors de la suppression');
      }
    }
  };

  const updateAnnonce = (id, field, value) => {
    setData(prev => ({
      ...prev,
      annonces: prev.annonces.map(annonce =>
        annonce.id === id ? { ...annonce, [field]: value } : annonce
      )
    }));
  };

  const getTypeInfo = (type) => {
    return types.find(t => t.value === type) || types[0];
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-blue-900 dark:text-white">Gestion des Annonces</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
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

      {/* Add New Annonce */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Nouvelle Annonce</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              value={newAnnonce.type}
              onChange={(e) => setNewAnnonce(prev => ({ ...prev, type: e.target.value }))}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {types.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre</label>
            <input
              type="text"
              value={newAnnonce.titre}
              onChange={(e) => setNewAnnonce(prev => ({ ...prev, titre: e.target.value }))}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Titre de l'annonce"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
            <input
              type="date"
              value={newAnnonce.date}
              onChange={(e) => setNewAnnonce(prev => ({ ...prev, date: e.target.value }))}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Public</label>
            <input
              type="text"
              value={newAnnonce.public}
              onChange={(e) => setNewAnnonce(prev => ({ ...prev, public: e.target.value }))}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: Tous niveaux, CM1 à 3e"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <input
              type="text"
              value={newAnnonce.description}
              onChange={(e) => setNewAnnonce(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Description de l'annonce"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="important"
              checked={newAnnonce.important}
              onChange={(e) => setNewAnnonce(prev => ({ ...prev, important: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="important" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Annonce importante
            </label>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddAnnonce}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter l'annonce
          </button>
        </div>
      </div>

      {/* Existing Annonces */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Annonces Existantes ({data?.annonces?.length || 0})
        </h2>
        <div className="space-y-4">
          {data?.annonces?.map(annonce => {
            const typeInfo = getTypeInfo(annonce.type);
            const isEditing = editingId === annonce.id;

            return (
              <div key={annonce.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                    {annonce.important && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-full text-xs font-medium">
                        Important
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(isEditing ? null : annonce.id)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAnnonce(annonce.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre</label>
                      <input
                        type="text"
                        value={annonce.titre}
                        onChange={(e) => updateAnnonce(annonce.id, 'titre', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                      <input
                        type="date"
                        value={annonce.date}
                        onChange={(e) => updateAnnonce(annonce.id, 'date', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Public</label>
                      <input
                        type="text"
                        value={annonce.public}
                        onChange={(e) => updateAnnonce(annonce.id, 'public', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                      <select
                        value={annonce.type}
                        onChange={(e) => updateAnnonce(annonce.id, 'type', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {types.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                      <textarea
                        value={annonce.description}
                        onChange={(e) => updateAnnonce(annonce.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={annonce.important}
                        onChange={(e) => updateAnnonce(annonce.id, 'important', e.target.checked)}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Annonce importante
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{annonce.titre}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">
                          {new Date(annonce.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{annonce.public}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{annonce.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnnoncesManager;