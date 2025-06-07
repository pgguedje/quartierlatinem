import React, { useState, useEffect } from 'react';
import { Save, Upload, Download, AlertCircle } from 'lucide-react';

const InfosManager = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Try to load from localStorage first
      const stored = localStorage.getItem('admin_infos');
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        // Fallback to public data
        const response = await fetch('/data/infos.json');
        const result = await response.json();
        setData(result);
        localStorage.setItem('admin_infos', JSON.stringify(result));
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
      localStorage.setItem('admin_infos', JSON.stringify(data));
      setMessage('Données sauvegardées avec succès');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'infos.json';
    link.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setData(importedData);
          setMessage('Fichier importé avec succès');
        } catch (error) {
          setMessage('Erreur: fichier JSON invalide');
        }
      };
      reader.readAsText(file);
    }
  };

  const updateNestedValue = (path, value) => {
    const keys = path.split('.');
    const newData = { ...data };
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-blue-900 dark:text-white">Informations Établissement</h1>
        <div className="flex space-x-3">
          <label className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Importer
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center ${
          message.includes('Erreur') ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
        }`}>
          <AlertCircle className="w-5 h-5 mr-2" />
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* École Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Informations Générales</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom de l'école</label>
              <input
                type="text"
                value={data?.ecole?.nom || ''}
                onChange={(e) => updateNestedValue('ecole.nom', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse</label>
              <input
                type="text"
                value={data?.ecole?.adresse || ''}
                onChange={(e) => updateNestedValue('ecole.adresse', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
              <input
                type="text"
                value={data?.ecole?.telephone || ''}
                onChange={(e) => updateNestedValue('ecole.telephone', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={data?.ecole?.email || ''}
                onChange={(e) => updateNestedValue('ecole.email', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={data?.ecole?.description || ''}
                onChange={(e) => updateNestedValue('ecole.description', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Frais */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Frais de Scolarité</h2>
          <div className="space-y-4">
            {data?.frais && Object.entries(data.frais).map(([niveau, frais]) => (
              <div key={niveau} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 capitalize">{niveau}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Anciens</label>
                    <input
                      type="number"
                      value={frais.anciens || ''}
                      onChange={(e) => updateNestedValue(`frais.${niveau}.anciens`, parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Nouveaux</label>
                    <input
                      type="number"
                      value={frais.nouveaux || ''}
                      onChange={(e) => updateNestedValue(`frais.${niveau}.nouveaux`, parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Description</label>
                  <input
                    type="text"
                    value={frais.description || ''}
                    onChange={(e) => updateNestedValue(`frais.${niveau}.description`, e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Résultats d'Examens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.resultats && Object.entries(data.resultats).map(([annee, resultats]) => (
            <div key={annee} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">{annee}</h3>
              <div className="space-y-2">
                {Object.entries(resultats).map(([examen, taux]) => (
                  <div key={examen}>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{examen}</label>
                    <input
                      type="number"
                      step="0.1"
                      value={taux || ''}
                      onChange={(e) => updateNestedValue(`resultats.${annee}.${examen}`, parseFloat(e.target.value))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfosManager;