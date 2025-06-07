import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  title?: string;
  subtitle?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ title, subtitle }) => {
  return (
    <div className="relative py-16 flex items-center justify-center">
      {/* Ligne néon animée */}
      <div className="section-divider w-full max-w-4xl"></div>
      
      {/* Titre de section avec gradient coloré */}
      {title && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="bg-white dark:bg-gray-900 px-8 py-4 rounded-2xl shadow-2xl border-2 neon-border">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-orange-500 to-red-600 bg-clip-text text-transparent neon-text text-center">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate-600 dark:text-slate-300 text-center mt-2 text-sm lg:text-base">
                {subtitle}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SectionDivider;