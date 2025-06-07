import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { TrendingUp, Award, BarChart3 } from 'lucide-react';

const ResultsSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [schoolData, setSchoolData] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2022');

  useEffect(() => {
    // Try localStorage first, then fallback to public data
    const stored = localStorage.getItem('admin_infos');
    if (stored) {
      setSchoolData(JSON.parse(stored));
    } else {
      fetch('/data/infos.json')
        .then(res => res.json())
        .then(data => setSchoolData(data))
        .catch(err => console.error('Error loading school data:', err));
    }
  }, []);

  if (!schoolData) return <div>Chargement...</div>;

  const years = Object.keys(schoolData.resultats).sort((a, b) => b - a);
  const exams = ['CEP', 'BEPC', 'BAC'];

  const getProgressColor = (value) => {
    if (value >= 95) return 'bg-green-500';
    if (value >= 90) return 'bg-yellow-500';
    return 'bg-gray-600';
  };

  return (
    <section id="resultats" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6">
            Résultats d'Examens
          </h2>
          <div className="w-24 h-1 bg-gray-800 dark:bg-gray-200 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Nos excellents résultats témoignent de la qualité de notre enseignement 
            et de l'engagement de nos équipes pédagogiques.
          </p>
        </div>

        <div className={`max-w-6xl mx-auto transform transition-all duration-1000 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Year Selector */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-2">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                    selectedYear === year
                      ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 shadow-xl'
                      : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Results Display */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {exams.map((exam, index) => {
              const result = schoolData.resultats[selectedYear][exam];
              const progressColor = getProgressColor(result);
              
              return (
                <div
                  key={exam}
                  className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 border-2 border-gray-200 dark:border-gray-600 ${
                    hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
                      <Award className="w-10 h-10 text-gray-600 dark:text-gray-400" />
                    </div>
                    
                    <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-4">{exam}</h3>
                    
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#4b5563"
                          strokeWidth="3"
                          strokeDasharray={`${result}, 100`}
                          strokeLinecap="round"
                          className={hasIntersected ? 'animate-progress' : ''}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{result}%</span>
                      </div>
                    </div>
                    
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-white ${progressColor}`}>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Excellent</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparative Chart */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-600">
            <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
              <BarChart3 className="w-8 h-8 mr-3" />
              Évolution sur 4 ans
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {exams.map(exam => (
                <div key={exam} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">{exam}</h4>
                  <div className="space-y-3">
                    {years.reverse().map(year => {
                      const result = schoolData.resultats[year][exam];
                      return (
                        <div key={year} className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{year}</span>
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-3 mr-3">
                              <div
                                className={`h-3 rounded-full ${getProgressColor(result)} transition-all duration-1000`}
                                style={{ 
                                  width: hasIntersected ? `${result}%` : '0%',
                                  transitionDelay: `${years.indexOf(year) * 100}ms`
                                }}
                              ></div>
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-white w-12">{result}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;