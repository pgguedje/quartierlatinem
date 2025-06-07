import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Baby, BookOpen, GraduationCap } from 'lucide-react';

const SchoolPresentation = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [activeTab, setActiveTab] = useState('maternelle');
  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    fetch('/data/infos.json')
      .then(res => res.json())
      .then(data => setSchoolData(data))
      .catch(err => console.error('Error loading school data:', err));
  }, []);

  const tabs = [
    { 
      id: 'maternelle', 
      label: 'Maternelle', 
      icon: Baby,
      image: 'https://images.pexels.com/photos/8613104/pexels-photo-8613104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    { 
      id: 'primaire', 
      label: 'Primaire', 
      icon: BookOpen,
      image: 'https://images.pexels.com/photos/8612969/pexels-photo-8612969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    { 
      id: 'secondaire', 
      label: 'Secondaire', 
      icon: GraduationCap,
      image: 'https://images.pexels.com/photos/8613074/pexels-photo-8613074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  if (!schoolData) return <div>Chargement...</div>;

  const currentLevel = schoolData.niveaux[activeTab];

  return (
    <section id="presentation" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-blue-900 mb-6">
            Nos Niveaux d'Enseignement
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            De la maternelle au secondaire, nous accompagnons chaque élève 
            vers l'excellence avec une pédagogie adaptée à chaque âge.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-900 text-white shadow-lg'
                      : 'text-blue-900 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center transform transition-all duration-1000 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <img
              src={tabs.find(tab => tab.id === activeTab)?.image}
              alt={currentLevel.titre}
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-lg"></div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-serif text-blue-900 mb-4">
              {currentLevel.titre}
            </h3>
            
            <p className="text-lg text-gray-600 mb-6">
              {currentLevel.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Classes:</h4>
              <div className="flex flex-wrap gap-2">
                {currentLevel.classes.map((classe, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                  >
                    {classe}
                  </span>
                ))}
              </div>
            </div>

            {currentLevel.series && (
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">Séries:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentLevel.series.map((serie, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      Série {serie}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Pédagogie:</h4>
              <p className="text-gray-700">{currentLevel.pedagogie}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolPresentation;