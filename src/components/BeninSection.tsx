import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MapPin, BookOpen, Users } from 'lucide-react';

const BeninSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section 
      ref={ref}
      className="relative py-20 overflow-hidden bg-blue-900 dark:bg-gray-900"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.8)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="wax" patternUnits="userSpaceOnUse" width="20" height="20"><circle cx="10" cy="10" r="3" fill="%23f59e0b" opacity="0.1"/><path d="M5,5 Q10,0 15,5 Q10,10 5,5" fill="%23dc2626" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23wax)"/></svg>')`,
        backgroundSize: 'cover'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`text-white transform transition-all duration-1000 ${
            hasIntersected ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-4xl md:text-5xl font-serif">
                Le Bénin
              </h2>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-serif text-yellow-400 mb-6">
              Quartier Latin de l'Afrique
            </h3>
            
            <p className="text-lg leading-relaxed mb-6 text-gray-100">
              Terre de savoir, le Bénin est fier d'être le "Quartier Latin de l'Afrique". 
              Berceau de grandes figures intellectuelles et politiques, notre pays a toujours 
              privilégié l'excellence éducative.
            </p>
            
            <p className="text-lg leading-relaxed mb-8 text-gray-100">
              <strong className="text-yellow-400">CS Quartier Latin</strong> s'inscrit dans cette tradition séculaire 
              d'excellence éducative et humaine, perpétuant les valeurs de rigueur, 
              d'intégrité et de réussite qui font la fierté de notre nation.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center">
                <BookOpen className="w-6 h-6 text-yellow-400 mr-3" />
                <span className="text-gray-100">Excellence académique</span>
              </div>
              <div className="flex items-center">
                <Users className="w-6 h-6 text-yellow-400 mr-3" />
                <span className="text-gray-100">Valeurs humaines</span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className={`relative transform transition-all duration-1000 ${
            hasIntersected ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`} style={{ transitionDelay: '300ms' }}>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8612966/pexels-photo-8612966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="École au Bénin"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-lg"></div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-blue-900 font-bold text-sm">Excellence</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeninSection;