import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { BookOpen, Users, Trophy, Heart, Star, Target, Lightbulb, Award, Zap } from 'lucide-react';

const SchoolCredoSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver();

  const values = [
    {
      icon: Lightbulb,
      title: "Vouloir",
      subtitle: "La motivation d'apprendre",
      description: "Cultiver la curiosité naturelle et l'envie d'apprendre chez chaque élève pour développer leur potentiel.",
      color: "from-amber-600 to-orange-700",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      textColor: "text-amber-800 dark:text-amber-200"
    },
    {
      icon: Zap,
      title: "Pouvoir",
      subtitle: "Les moyens de réussir",
      description: "Fournir tous les outils, ressources et accompagnement nécessaires pour transformer les ambitions en réalité.",
      color: "from-orange-600 to-red-700",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-800 dark:text-orange-200"
    },
    {
      icon: Award,
      title: "Réussir",
      subtitle: "L'accomplissement personnel",
      description: "Atteindre l'excellence académique et humaine grâce à un environnement stimulant et bienveillant.",
      color: "from-red-600 to-amber-700",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-800 dark:text-red-200"
    }
  ];

  return (
    <section ref={ref} className="py-12 lg:py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Motifs décoratifs africains - RESPONSIVE */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-10 lg:top-20 left-8 lg:left-16 w-32 lg:w-40 h-32 lg:h-40 border-4 border-amber-600 rounded-full"></div>
        <div className="absolute top-16 lg:top-32 right-12 lg:right-24 w-24 lg:w-32 h-24 lg:h-32 border-4 border-orange-600 transform rotate-45"></div>
        <div className="absolute bottom-12 lg:bottom-24 left-16 lg:left-32 w-28 lg:w-36 h-28 lg:h-36 border-4 border-red-600 rounded-full"></div>
        <div className="absolute bottom-8 lg:bottom-16 right-8 lg:right-16 w-20 lg:w-28 h-20 lg:h-28 border-4 border-amber-600 transform rotate-45"></div>
        
        {/* Motifs géométriques supplémentaires */}
        <div className="absolute top-1/2 left-1/4 w-16 lg:w-20 h-16 lg:h-20 border-3 border-orange-600 transform rotate-12"></div>
        <div className="absolute top-1/3 right-1/3 w-12 lg:w-16 h-12 lg:h-16 border-3 border-amber-600 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-18 lg:w-24 h-18 lg:h-24 border-3 border-red-600 transform rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* En-tête de section - RESPONSIVE */}
        <div className={`text-center mb-12 lg:mb-16 transform transition-all duration-1000 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-amber-900 dark:text-amber-100 mb-6">
            Valeurs Fondamentales
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl text-amber-800 dark:text-amber-200 max-w-3xl mx-auto leading-relaxed">
            Notre philosophie éducative repose sur trois piliers essentiels qui guident chaque élève 
            vers l'épanouissement et la réussite.
          </p>
        </div>

        {/* Grille des valeurs - RESPONSIVE */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12 lg:mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className={`group transform transition-all duration-1000 ${
                  hasIntersected
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border-2 border-amber-200 dark:border-amber-700 relative overflow-hidden">
                  {/* Motifs décoratifs dans chaque carte */}
                  <div className="absolute top-4 right-4 w-8 lg:w-12 h-8 lg:h-12 border-2 border-amber-300 dark:border-amber-500 rounded-full opacity-20"></div>
                  <div className="absolute bottom-4 left-4 w-6 lg:w-8 h-6 lg:h-8 border-2 border-orange-300 dark:border-orange-500 transform rotate-45 opacity-20"></div>
                  
                  <div className="relative z-10">
                    {/* Icône */}
                    <div className={`inline-flex items-center justify-center w-16 lg:w-20 h-16 lg:h-20 rounded-2xl bg-gradient-to-br ${value.color} mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-8 lg:w-10 h-8 lg:h-10 text-white" />
                    </div>
                    
                    {/* Titre principal */}
                    <h3 className="text-2xl lg:text-3xl font-serif text-amber-900 dark:text-amber-100 mb-2 lg:mb-3 tracking-wide">
                      {value.title}
                    </h3>
                    
                    {/* Sous-titre */}
                    <h4 className={`text-base lg:text-lg font-semibold ${value.textColor} mb-3 lg:mb-4`}>
                      {value.subtitle}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-amber-700 dark:text-amber-300 leading-relaxed text-sm lg:text-base">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section d'engagement - RESPONSIVE */}
        <div className={`text-center transform transition-all duration-1000 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-amber-50 dark:bg-gray-800 rounded-2xl p-6 lg:p-10 shadow-xl max-w-4xl mx-auto border-2 border-amber-200 dark:border-amber-700 relative overflow-hidden">
            {/* Motifs décoratifs dans la section d'engagement */}
            <div className="absolute top-6 right-6 w-12 lg:w-16 h-12 lg:h-16 border-2 border-amber-300 dark:border-amber-500 rounded-full opacity-20"></div>
            <div className="absolute bottom-6 left-6 w-8 lg:w-12 h-8 lg:h-12 border-2 border-orange-300 dark:border-orange-500 transform rotate-45 opacity-20"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-4 lg:mb-6">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 shadow-lg">
                  <Heart className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif text-amber-900 dark:text-amber-100 text-center sm:text-left">
                  Notre Engagement
                </h3>
              </div>
              
              <p className="text-lg lg:text-xl text-amber-800 dark:text-amber-200 leading-relaxed mb-6 lg:mb-8">
                Nous nous engageons à offrir à chaque élève un environnement d'apprentissage 
                stimulant où <strong className="text-amber-900 dark:text-amber-100">VOULOIR</strong>, 
                <strong className="text-amber-900 dark:text-amber-100"> POUVOIR</strong> et 
                <strong className="text-amber-900 dark:text-amber-100"> RÉUSSIR</strong> ne font qu'un.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4 lg:gap-6 text-center">
                <div className="p-4 lg:p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md">
                  <Star className="w-8 lg:w-10 h-8 lg:h-10 text-amber-600 dark:text-amber-400 mx-auto mb-3" />
                  <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2 text-base lg:text-lg">Excellence</h4>
                  <p className="text-xs lg:text-sm text-amber-700 dark:text-amber-300">Dans tous nos enseignements</p>
                </div>
                
                <div className="p-4 lg:p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md">
                  <Users className="w-8 lg:w-10 h-8 lg:h-10 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
                  <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2 text-base lg:text-lg">Bienveillance</h4>
                  <p className="text-xs lg:text-sm text-amber-700 dark:text-amber-300">Accompagnement personnalisé</p>
                </div>
                
                <div className="p-4 lg:p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md">
                  <Trophy className="w-8 lg:w-10 h-8 lg:h-10 text-red-600 dark:text-red-400 mx-auto mb-3" />
                  <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2 text-base lg:text-lg">Réussite</h4>
                  <p className="text-xs lg:text-sm text-amber-700 dark:text-amber-300">Résultats exceptionnels</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Citation inspirante - RESPONSIVE */}
        <div className={`text-center mt-12 lg:mt-16 transform transition-all duration-1000 ${
          hasIntersected ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif text-amber-900 dark:text-amber-100 italic mb-4">
            "L'éducation est l'arme la plus puissante pour changer le monde"
          </blockquote>
          <cite className="text-amber-700 dark:text-amber-300 text-lg lg:text-xl">— Nelson Mandela</cite>
        </div>
      </div>
    </section>
  );
};

export default SchoolCredoSection;