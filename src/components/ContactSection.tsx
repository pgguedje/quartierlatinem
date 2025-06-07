import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Instagram } from 'lucide-react';

const ContactSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [schoolData, setSchoolData] = useState(null);

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

  return (
    <section id="contact" ref={ref} className="py-20 bg-gray-900 dark:bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Nous Contacter
          </h2>
          <div className="w-24 h-1 bg-gray-200 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions 
            et vous accompagner dans vos démarches.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 transform transition-all duration-1000 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-gray-300 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Téléphone</h4>
                    <p className="text-gray-300">{schoolData.ecole.telephone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-gray-300 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-gray-300">{schoolData.ecole.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-gray-300 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Adresse</h4>
                    <p className="text-gray-300">{schoolData.ecole.adresse}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-gray-300 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Horaires</h4>
                    <p className="text-gray-300">Lun - Ven: {schoolData.ecole.horaires.lundi_vendredi}</p>
                    <p className="text-gray-300">Samedi: {schoolData.ecole.horaires.samedi}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Actions Rapides</h4>
              
              <a
                href="https://wa.me/22995963345?text=Bonjour%2C+je+souhaite+inscrire+mon+enfant+à+l'école+CS+Quartier+Latin."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full bg-green-600 hover:bg-green-700 p-4 rounded-lg transition-colors transform hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                <span className="font-semibold">Inscription via WhatsApp</span>
              </a>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="flex items-center justify-center w-full bg-gray-600 hover:bg-gray-700 p-3 rounded-lg transition-colors"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-full bg-gray-600 hover:bg-gray-700 p-3 rounded-lg transition-colors"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <h3 className="text-2xl font-serif mb-6">Notre Localisation</h3>
            
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31614.776876954!2d2.3292778!3d6.4281394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1024a9649b1e5677%3A0x7f41f8b8e8e8e8e8!2sAbomey-Calavi%2C%20Benin!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-80"
              ></iframe>
              
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Comment nous trouver ?</h4>
              <p className="text-gray-300 text-sm">
                Situés à Zogbadjè, Abomey-Calavi, nous sommes facilement accessibles 
                en transport en commun. N'hésitez pas à nous appeler pour des indications précises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;