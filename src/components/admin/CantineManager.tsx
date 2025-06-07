import React, { useState, useEffect } from 'react';
import { Save, Upload, Download, AlertCircle, Plus, Trash2 } from 'lucide-react';

const CantineManager = () => {
  const [menuData, setMenuData] = useState(null);
  const [inscriptionData, setInscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('menu');

  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Try localStorage first, then fallback to public data
      const storedMenu = localStorage.getItem('admin_cantine');
      const storedInscription = localStorage.getItem('admin_cantine_inscription');

      if (storedMenu && storedInscription) {
        setMenuData(JSON.parse(storedMenu));
        setInscriptionData(JSON.parse(storedInscription));
      } else {
        const [menuRes, inscriptionRes] = await Promise.all([
          fetch('/data/cantine.json'),
          fetch('/data/cantine_inscription.json')
        ]);

        const menuResult = await menuRes.json();
        const inscriptionResult = await inscriptionRes.json();

        setMenuData(menuResult);
        setInscriptionData(inscriptionResult);
        
        localStorage.setItem('admin_cantine', JSON.stringify(menuResult));
        localStorage.setItem('admin_cantine_inscription', JSON.stringify(inscriptionResult));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (type) => {
    setSaving(true);
    try {
      if (type === 'menu') {
        localStorage.setItem('admin_cantine', JSON.stringify(menuData));
      } else {
        localStorage.setItem('admin_cantine_inscription', JSON.stringify(inscriptionData));
      }
      
      setMessage('Données sauvegardées avec succès');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const updateMenuDay = (day, field, value) => {
    setMenuData(prev => ({
      ...prev,
      menu_hebdomadaire: {
        ...prev.menu_hebdomadaire,
        [day]: {
          ...prev.menu_hebdomadaire[day],
          [field]: value
        }
      }
    }));
  };

  const updateTarif = (niveau, type, value) => {
    setInscriptionData(prev => ({
      ...prev,
      tarifs: {
        ...prev.tarifs,
        [niveau]: {
          ...prev.tarifs[niveau],
          [type]: parseInt(value)
        }
      }
    }));
  };

  const addCondition = () => {
    setInscriptionData(prev => ({
      ...prev,
      conditions: [...prev.conditions, '']
    }));
  };

  const updateCondition = (index, value) => {
    setInscriptionData(prev => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) => 
        i === index ? value : condition
      )
    }));
  };

  const removeCondition = (index) => {
    setInscriptionData(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-blue-900 dark:text-white">Gestion Cantine</h1>
        <button
          onClick={() => handleSave(activeTab)}
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

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'menu'
              ? 'bg-white dark:bg-gray-700 text-blue-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Menu Hebdomadaire
        </button>
        <button
          onClick={() => setActiveTab('tarifs')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'tarifs'
              ? 'bg-white dark:bg-gray-700 text-blue-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Tarifs & Conditions
        </button>
      </div>

      {/* Menu Tab */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {days.map(day => (
              <div key={day} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                  {day}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Plat principal
                    </label>
                    <input
                      type="text"
                      value={menuData?.menu_hebdomadaire?.[day]?.plat_principal || ''}
                      onChange={(e) => updateMenuDay(day, 'plat_principal', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Accompagnement
                    </label>
                    <input
                      type="text"
                      value={menuData?.menu_hebdomadaire?.[day]?.accompagnement || ''}
                      onChange={(e) => updateMenuDay(day, 'accompagnement', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Boisson
                    </label>
                    <input
                      type="text"
                      value={menuData?.menu_hebdomadaire?.[day]?.boisson || ''}
                      onChange={(e) => updateMenuDay(day, 'boisson', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Dessert
                    </label>
                    <input
                      type="text"
                      value={menuData?.menu_hebdomadaire?.[day]?.dessert || ''}
                      onChange={(e) => updateMenuDay(day, 'dessert', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tarifs Tab */}
      {activeTab === 'tarifs' && (
        <div className="space-y-6">
          {/* Tarifs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tarifs par Niveau</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {inscriptionData?.tarifs && Object.entries(inscriptionData.tarifs).map(([niveau, tarifs]) => (
                <div key={niveau} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 capitalize">{niveau}</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Journalier (FCFA)</label>
                      <input
                        type="number"
                        value={tarifs.journalier || ''}
                        onChange={(e) => updateTarif(niveau, 'journalier', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Hebdomadaire (FCFA)</label>
                      <input
                        type="number"
                        value={tarifs.hebdomadaire || ''}
                        onChange={(e) => updateTarif(niveau, 'hebdomadaire', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Mensuel (FCFA)</label>
                      <input
                        type="number"
                        value={tarifs.mensuel || ''}
                        onChange={(e) => updateTarif(niveau, 'mensuel', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Conditions</h2>
              <button
                onClick={addCondition}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </button>
            </div>
            <div className="space-y-3">
              {inscriptionData?.conditions?.map((condition, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={condition}
                    onChange={(e) => updateCondition(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Condition..."
                  />
                  <button
                    onClick={() => removeCondition(index)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Cantine</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Responsable</label>
                <input
                  type="text"
                  value={inscriptionData?.contact?.responsable || ''}
                  onChange={(e) => setInscriptionData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, responsable: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                <input
                  type="text"
                  value={inscriptionData?.contact?.telephone || ''}
                  onChange={(e) => setInscriptionData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, telephone: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Horaires</label>
                <input
                  type="text"
                  value={inscriptionData?.contact?.horaires || ''}
                  onChange={(e) => setInscriptionData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, horaires: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CantineManager;