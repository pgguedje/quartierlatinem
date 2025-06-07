import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Sparkles, Zap, Trophy } from 'lucide-react';

const ValuesSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver();

  const values = [
    {
      mot: "Vouloir",
      description: "Volonté d'apprendre et de progresser",
      icon: Sparkles,
      color: "from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"
    },
    {
      mot: "Pouvoir",
      description: "Un cadre et des moyens pour réussir",
      icon: Zap,
      color: "from-yellow-500 to-orange-600 dark:from-yellow-400 dark:to-orange-500"
    },
    {
      mot: "Réussir",
      description: "Transformer le rêve en réalité",
      icon: Trophy,
      color: "from-green-600 to-green-800 dark:from-green-500 dark:to-green-700"
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-blue-900 dark:text-white mb-6">
            Notre Philosophie
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.mot}
                className={`text-center transform transition-all duration-1000 ${
                  hasIntersected
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${value.color} mb-6 transform hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-serif text-blue-900 dark:text-white mb-4 tracking-wide">
                  {value.mot}
                </h3>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs mx-auto">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className={`inline-block transform transition-all duration-1000 ${
            hasIntersected ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <p className="text-2xl font-serif text-blue-900 dark:text-white italic">
              "L'éducation est l'arme la plus puissante pour changer le monde"
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">— Nelson Mandela</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;