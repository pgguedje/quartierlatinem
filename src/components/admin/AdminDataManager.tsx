import React, { useState, useEffect } from 'react';
import { Save, Upload, Download, AlertCircle, Plus, Trash2, Edit } from 'lucide-react';

interface AdminDataManagerProps {
  title: string;
  dataKey: string;
  children?: React.ReactNode;
}

const AdminDataManager: React.FC<AdminDataManagerProps> = ({ title, dataKey, children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, [dataKey]);

  const loadData = () => {
    try {
      const stored = localStorage.getItem(`admin_${dataKey}`);
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        // Load from public data as fallback
        fetch(`/data/${dataKey}.json`)
          .then(res => res.json())
          .then(result => {
            setData(result);
            localStorage.setItem(`admin_${dataKey}`, JSON.stringify(result));
          })
          .catch(err => console.error('Error loading data:', err));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`admin_${dataKey}`, JSON.stringify(data));
      setMessage('Données sauvegardées avec succès');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage('Erreur lors de la sauvegarde');
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataKey}.json`;
    link.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setData(importedData);
          setMessage('Fichier importé avec succès');
        } catch (error) {
          setMessage('Erreur: fichier JSON invalide');
        }
      };
      reader.readAsText(file);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-blue-900 dark:text-white">{title}</h1>
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
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
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

      {children && React.cloneElement(children as React.ReactElement, { data, setData })}
    </div>
  );
};

export default AdminDataManager;