import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "CS Quartier Latin EM - École d'Excellence au Bénin | Maternelle, Primaire, Secondaire",
  description = "CS Quartier Latin Emmanuel Mounier - École de référence au Bénin. Formation d'excellence de la maternelle au secondaire à Abomey-Calavi. Inscriptions ouvertes. Taux de réussite 95%.",
  keywords = "école Bénin, CS Quartier Latin, école Abomey-Calavi, maternelle Bénin, primaire Bénin, secondaire Bénin, école privée Bénin, éducation Bénin, inscription école, Emmanuel Mounier",
  image = "https://quartierlatinem.site/IMG-20221220-WA0022.jpg",
  url = "https://quartierlatinem.site/",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEOHead;