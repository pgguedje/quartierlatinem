import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { UtensilsCrossed, Clock, Phone, Star, Utensils, Coffee } from 'lucide-react';

const CantineSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [cantineData, setCantineData] = useState(null);
  const [inscriptionData, setInscriptionData] = useState(null);
  const [activeDay, setActiveDay] = useState('lundi');

  useEffect(() => {
    // Try localStorage first, then fallback to public data
    const storedMenu = localStorage.getItem('admin_cantine');
    const storedInscription = localStorage.getItem('admin_cantine_inscription');

    if (storedMenu && storedInscription) {
      setCantineData(JSON.parse(storedMenu));
      setInscriptionData(JSON.parse(storedInscription));
    } else {
      Promise.all([
        fetch('/data/cantine.json').then(res => res.json()),
        fetch('/data/cantine_inscription.json').then(res => res.json())
      ])
      .then(([cantine, inscription]) => {
        setCantineData(cantine);
        setInscriptionData(inscription);
      })
      .catch(err => console.error('Error loading cantine data:', err));
    }
  }, []);

  if (!cantineData || !inscriptionData) return <div>Chargement...</div>;

  const days = [
    { id: 'lundi', label: 'Lundi', icon: '🌟' },
    { id: 'mardi', label: 'Mardi', icon: '🍽️' },
    { id: 'mercredi', label: 'Mercredi', icon: '🥘' },
    { id: 'jeudi', label: 'Jeudi', icon: '🍲' },
    { id: 'vendredi', label: 'Vendredi', icon: '🎉' }
  ];

  return (
    <section id="cantine" ref={ref} className="py-12 lg:py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Motifs décoratifs africains - RESPONSIVE */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-10 left-4 lg:left-10 w-24 lg:w-32 h-24 lg:h-32 border-4 border-amber-600 rounded-full"></div>
        <div className="absolute top-20 right-8 lg:right-20 w-16 lg:w-24 h-16 lg:h-24 border-4 border-orange-600 transform rotate-45"></div>
        <div className="absolute bottom-20 left-8 lg:left-20 w-20 lg:w-28 h-20 lg:h-28 border-4 border-red-600 rounded-full"></div>
        <div className="absolute bottom-10 right-4 lg:right-10 w-16 lg:w-20 h-16 lg:h-20 border-4 border-amber-600 transform rotate-45"></div>
        
        {/* Motifs géométriques */}
        <div className="absolute top-1/2 left-1/4 w-12 lg:w-16 h-12 lg:h-16 border-2 border-orange-600 transform rotate-12"></div>
        <div className="absolute top-1/3 right-1/3 w-8 lg:w-12 h-8 lg:h-12 border-2 border-amber-600 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-amber-900 dark:text-amber-100 mb-6">
            Cantine Scolaire
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-lg text-amber-800 dark:text-amber-200 max-w-2xl mx-auto">
            Une alimentation saine et équilibrée pour accompagner la réussite de vos enfants.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16 transform transition-all duration-1000 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Menu Section - CENTRÉ ET STYLÉ RESPONSIVE */}
          <div>
            <h3 className="text-2xl font-serif text-amber-900 dark:text-amber-100 mb-6 lg:mb-8 flex items-center justify-center">
              <UtensilsCrossed className="w-6 lg:w-8 h-6 lg:h-8 mr-4" />
              Menu de la Semaine
            </h3>

            {/* Day Selector - CENTRÉ AVEC MOTIFS RESPONSIVE */}
            <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-6 lg:mb-8">
              {days.map(day => (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  className={`flex items-center px-3 lg:px-6 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm lg:text-base ${
                    activeDay === day.id
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xl'
                      : 'bg-white dark:bg-gray-800 text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-gray-700 shadow-md'
                  }`}
                >
                  <span className="text-lg lg:text-2xl mr-1 lg:mr-2">{day.icon}</span>
                  <span className="hidden sm:inline">{day.label}</span>
                  <span className="sm:hidden">{day.label.slice(0, 3)}</span>
                </button>
              ))}
            </div>

            {/* Menu Display - DESIGN MODERNE AVEC MOTIFS RESPONSIVE */}
            <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-700 p-6 lg:p-8 rounded-2xl shadow-xl border-2 border-amber-200 dark:border-amber-700 relative overflow-hidden">
              {/* Motifs décoratifs dans la carte */}
              <div className="absolute top-4 right-4 w-12 lg:w-16 h-12 lg:h-16 border-2 border-amber-300 dark:border-amber-500 rounded-full opacity-20"></div>
              <div className="absolute bottom-4 left-4 w-8 lg:w-12 h-8 lg:h-12 border-2 border-orange-300 dark:border-orange-500 transform rotate-45 opacity-20"></div>
              
              <div className="relative z-10">
                <h4 className="text-xl lg:text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4 lg:mb-6 capitalize text-center">
                  <span className="text-2xl lg:text-3xl mr-3">{days.find(d => d.id === activeDay)?.icon}</span>
                  Menu du {activeDay}
                </h4>
                
                {cantineData.menu_hebdomadaire[activeDay] && (
                  <div className="space-y-4 lg:space-y-6">
                    <div className="flex items-start bg-white dark:bg-gray-800 p-3 lg:p-4 rounded-xl shadow-md">
                      <div className="w-5 lg:w-6 h-5 lg:h-6 bg-red-500 rounded-full mt-1 mr-3 lg:mr-4 flex-shrink-0 flex items-center justify-center">
                        <Utensils className="w-2 lg:w-3 h-2 lg:h-3 text-white" />
                      </div>
                      <div>
                        <strong className="text-amber-800 dark:text-amber-200 text-base lg:text-lg">Plat principal:</strong>
                        <p className="text-amber-700 dark:text-amber-300 mt-1 text-sm lg:text-base">{cantineData.menu_hebdomadaire[activeDay].plat_principal}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white dark:bg-gray-800 p-3 lg:p-4 rounded-xl shadow-md">
                      <div className="w-5 lg:w-6 h-5 lg:h-6 bg-green-500 rounded-full mt-1 mr-3 lg:mr-4 flex-shrink-0 flex items-center justify-center">
                        <Star className="w-2 lg:w-3 h-2 lg:h-3 text-white" />
                      </div>
                      <div>
                        <strong className="text-amber-800 dark:text-amber-200 text-base lg:text-lg">Accompagnement:</strong>
                        <p className="text-amber-700 dark:text-amber-300 mt-1 text-sm lg:text-base">{cantineData.menu_hebdomadaire[activeDay].accompagnement}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white dark:bg-gray-800 p-3 lg:p-4 rounded-xl shadow-md">
                      <div className="w-5 lg:w-6 h-5 lg:h-6 bg-blue-500 rounded-full mt-1 mr-3 lg:mr-4 flex-shrink-0 flex items-center justify-center">
                        <Coffee className="w-2 lg:w-3 h-2 lg:h-3 text-white" />
                      </div>
                      <div>
                        <strong className="text-amber-800 dark:text-amber-200 text-base lg:text-lg">Boisson:</strong>
                        <p className="text-amber-700 dark:text-amber-300 mt-1 text-sm lg:text-base">{cantineData.menu_hebdomadaire[activeDay].boisson}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white dark:bg-gray-800 p-3 lg:p-4 rounded-xl shadow-md">
                      <div className="w-5 lg:w-6 h-5 lg:h-6 bg-yellow-500 rounded-full mt-1 mr-3 lg:mr-4 flex-shrink-0 flex items-center justify-center">
                        <Star className="w-2 lg:w-3 h-2 lg:h-3 text-white" />
                      </div>
                      <div>
                        <strong className="text-amber-800 dark:text-amber-200 text-base lg:text-lg">Dessert:</strong>
                        <p className="text-amber-700 dark:text-amber-300 mt-1 text-sm lg:text-base">{cantineData.menu_hebdomadaire[activeDay].dessert}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                  <div className="flex items-center text-amber-900 dark:text-amber-100 mb-3">
                    <Clock className="w-5 lg:w-6 h-5 lg:h-6 mr-3" />
                    <strong className="text-base lg:text-lg">Horaires de service</strong>
                  </div>
                  <p className="text-amber-700 dark:text-amber-300 text-base lg:text-lg">{cantineData.horaires.service}</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                    Inscription: {cantineData.horaires.inscription}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Info - RESPONSIVE */}
          <div>
            <h3 className="text-2xl font-serif text-amber-900 dark:text-amber-100 mb-6 lg:mb-8 text-center">
              Tarifs & Inscription
            </h3>

            <div className="space-y-4 lg:space-y-6">
              {Object.entries(inscriptionData.tarifs).map(([niveau, tarifs]) => (
                <div key={niveau} className="bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <h4 className="text-lg lg:text-xl font-bold text-amber-900 dark:text-amber-100 mb-3 lg:mb-4 capitalize text-center">
                    {niveau}
                  </h4>
                  <div className="grid grid-cols-3 gap-2 lg:gap-4 text-center">
                    <div className="p-2 lg:p-3 bg-amber-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-amber-700 dark:text-amber-300 text-xs lg:text-sm">Journalier</p>
                      <p className="font-bold text-sm lg:text-lg text-amber-900 dark:text-amber-100">{tarifs.journalier} FCFA</p>
                    </div>
                    <div className="p-2 lg:p-3 bg-amber-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-amber-700 dark:text-amber-300 text-xs lg:text-sm">Hebdomadaire</p>
                      <p className="font-bold text-sm lg:text-lg text-amber-900 dark:text-amber-100">{tarifs.hebdomadaire} FCFA</p>
                    </div>
                    <div className="p-2 lg:p-3 bg-amber-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-amber-700 dark:text-amber-300 text-xs lg:text-sm">Mensuel</p>
                      <p className="font-bold text-sm lg:text-lg text-amber-900 dark:text-amber-100">{tarifs.mensuel} FCFA</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 lg:mt-8 bg-amber-50 dark:bg-gray-800 p-4 lg:p-6 rounded-xl border-2 border-amber-200 dark:border-amber-700">
              <h4 className="text-base lg:text-lg font-bold text-amber-900 dark:text-amber-100 mb-3 lg:mb-4">Conditions</h4>
              <ul className="space-y-2 lg:space-y-3">
                {inscriptionData.conditions.map((condition, index) => (
                  <li key={index} className="flex items-start text-amber-800 dark:text-amber-200 text-sm lg:text-base">
                    <span className="w-2 lg:w-3 h-2 lg:h-3 bg-amber-600 dark:bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 lg:mt-8 bg-amber-100 dark:bg-gray-700 p-4 lg:p-6 rounded-xl border-2 border-amber-300 dark:border-amber-500">
              <h4 className="text-base lg:text-lg font-bold text-amber-900 dark:text-amber-100 mb-3 flex items-center">
                <Phone className="w-5 lg:w-6 h-5 lg:h-6 mr-3" />
                Contact Cantine
              </h4>
              <p className="text-amber-800 dark:text-amber-200 font-semibold text-sm lg:text-base">
                {inscriptionData.contact.responsable}
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-base lg:text-lg">{inscriptionData.contact.telephone}</p>
              <p className="text-xs lg:text-sm text-amber-600 dark:text-amber-400">{inscriptionData.contact.horaires}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CantineSection;