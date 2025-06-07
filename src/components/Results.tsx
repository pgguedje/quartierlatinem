import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { TrendingUp, Award, BarChart3, Trophy, Star, Target } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Results = () => {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [schoolData, setSchoolData] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2022');

  useEffect(() => {
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

  const years = Object.keys(schoolData.resultats).sort((a, b) => a - b);
  const exams = ['CEP', 'BEPC', 'BAC'];

  const getProgressColor = (value) => {
    if (value >= 95) return 'from-amber-500 to-orange-600';
    if (value >= 90) return 'from-orange-500 to-red-600';
    return 'from-red-500 to-amber-600';
  };

  // Configuration du graphique Chart.js avec couleurs harmonieuses
  const chartData = {
    labels: years,
    datasets: exams.map((exam, index) => ({
      label: exam,
      data: years.map(year => schoolData.resultats[year][exam]),
      borderColor: [
        '#f59e0b',  // Amber pour CEP
        '#ea580c',  // Orange pour BEPC
        '#dc2626'   // Rouge pour BAC
      ][index],
      backgroundColor: [
        'rgba(245, 158, 11, 0.1)',
        'rgba(234, 88, 12, 0.1)',
        'rgba(220, 38, 38, 0.1)'
      ][index],
      borderWidth: 4,
      pointRadius: 8,
      pointHoverRadius: 12,
      fill: true,
      tension: 0.4
    }))
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
            weight: 'bold'
          },
          color: '#92400e',
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: '🏆 Évolution des Résultats d\'Examens - Excellence Béninoise',
        font: {
          size: 20,
          weight: 'bold'
        },
        color: '#92400e'
      },
      tooltip: {
        backgroundColor: 'rgba(146, 64, 14, 0.9)',
        titleColor: '#fef3c7',
        bodyColor: '#fef3c7',
        borderColor: '#d97706',
        borderWidth: 2,
        cornerRadius: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}% 🎯`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 85,
        max: 100,
        grid: {
          color: 'rgba(251, 191, 36, 0.3)'
        },
        ticks: {
          color: '#92400e',
          font: {
            size: 14,
            weight: 'bold'
          },
          callback: function(value) {
            return value + '%';
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(251, 191, 36, 0.3)'
        },
        ticks: {
          color: '#92400e',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="resultats" ref={ref} className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20 relative overflow-hidden">
      {/* Motifs africains traditionnels */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute border-4 ${
              i % 3 === 0 ? 'border-amber-400/30' : 
              i % 3 === 1 ? 'border-orange-400/30' : 
              'border-red-400/30'
            } ${
              i % 2 === 0 ? 'rounded-full' : 'transform rotate-45'
            }`}
            style={{
              width: `${60 + i * 25}px`,
              height: `${60 + i * 25}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 360],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête avec couleurs béninoises */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-8"
            variants={itemVariants}
          >
            🏆 Nos Résultats
          </motion.h2>
          <motion.div
            className="w-32 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto mb-8 rounded-full"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-amber-800 dark:text-amber-200 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            🇧🇯 L'excellence de nos résultats témoigne de la qualité de notre enseignement béninois et de l'engagement de nos équipes africaines
          </motion.p>
        </motion.div>

        {/* Image traditionnelle béninoise */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          
        </motion.div>

        {/* Sélecteur d'année avec couleurs traditionnelles */}
        <motion.div
          className="flex justify-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <div className="flex bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-3 shadow-2xl border-4 border-amber-400 gap-2">
            {years.map((year, index) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 whitespace-nowrap ${
                  selectedYear === year
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-xl scale-110 border-2 border-white'
                    : 'text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800/50'
                }`}
                whileHover={{ scale: selectedYear === year ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Affichage des résultats avec couleurs béninoises */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {exams.map((exam, index) => {
            const result = schoolData.resultats[selectedYear][exam];
            const progressColor = getProgressColor(result);
            const examColors = [
              'from-amber-500 to-orange-600',
              'from-orange-500 to-red-600', 
              'from-red-500 to-amber-600'
            ];
            
            return (
              <motion.div
                key={exam}
                className="group flex-shrink-0 w-80"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8 shadow-2xl border-4 border-amber-400 dark:hover:neon-border relative overflow-hidden">
                  {/* Effet de brillance */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent -translate-x-full group-hover:translate-x-full"
                    transition={{ duration: 0.8 }}
                  />
                  
                  {/* Motifs décoratifs traditionnels */}
                  <div className="absolute top-6 right-6 w-16 h-16 border-3 border-orange-400/40 rounded-full"></div>
                  <div className="absolute bottom-6 left-6 w-12 h-12 border-3 border-red-400/40 transform rotate-45"></div>
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${examColors[index]} rounded-2xl mb-6 shadow-2xl border-2 border-white`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Trophy className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-6">
                      {exam} 🎯
                    </h3>
                    
                    {/* Graphique circulaire animé avec couleurs traditionnelles */}
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="3"
                        />
                        <motion.path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={`url(#gradient-${index})`}
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "0, 100" }}
                          animate={hasIntersected ? { strokeDasharray: `${result}, 100` } : { strokeDasharray: "0, 100" }}
                          transition={{ duration: 2, delay: index * 0.3 }}
                        />
                        <defs>
                          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={index === 0 ? '#f59e0b' : index === 1 ? '#ea580c' : '#dc2626'} />
                            <stop offset="100%" stopColor={index === 0 ? '#d97706' : index === 1 ? '#c2410c' : '#b91c1c'} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-4xl font-bold text-amber-900 dark:text-amber-100"
                          initial={{ scale: 0 }}
                          animate={hasIntersected ? { scale: 1 } : { scale: 0 }}
                          transition={{ type: "spring", stiffness: 300, delay: index * 0.3 + 1 }}
                        >
                          {result}%
                        </motion.span>
                      </div>
                    </div>
                    
                    <motion.div
                      className={`inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r ${examColors[index]} shadow-xl border-2 border-white`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Star className="w-5 h-5 mr-2" />
                      <span className="font-bold">Excellence 🌟</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Graphique Chart.js avec design traditionnel béninois */}
        <motion.div
          className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8 shadow-2xl border-4 border-amber-400 dark:hover:neon-border mb-16 relative overflow-hidden"
          variants={itemVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          whileHover={{ scale: 1.01 }}
        >
          {/* Motifs décoratifs traditionnels */}
          <div className="absolute top-6 right-6 w-20 h-20 border-3 border-orange-400/30 rounded-full"></div>
          <div className="absolute bottom-6 left-6 w-16 h-16 border-3 border-red-400/30 transform rotate-45"></div>
          
          <h3 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-8 text-center flex items-center justify-center relative z-10">
            <BarChart3 className="w-8 h-8 mr-3" />
            📊 Évolution des Résultats - Tradition Béninoise (2019-2025)
          </h3>
          
          <div className="h-96 relative z-10">
            <Line data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Message de fierté africaine */}
        <motion.div
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.div
            className="bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-red-900/30 rounded-3xl p-12 shadow-2xl border-4 border-amber-400 dark:hover:neon-border max-w-4xl mx-auto relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Motifs décoratifs traditionnels */}
            <div className="absolute top-8 right-8 w-24 h-24 border-3 border-orange-400/40 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-20 h-20 border-3 border-red-400/40 transform rotate-45"></div>
            
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white relative z-10"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>
            
            <h3 className="text-4xl font-bold bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 bg-clip-text text-transparent mb-6 relative z-10">
              🇧🇯 Fierté Béninoise - Quartier Latin de l'Afrique
            </h3>
            
            <p className="text-xl text-amber-800 dark:text-amber-200 leading-relaxed relative z-10">
              Ces résultats exceptionnels reflètent notre engagement envers l'excellence éducative béninoise 
              et notre mission de former les leaders de demain pour l'Afrique. 
              <strong className="text-orange-700"> Vive le Bénin ! 🌟</strong>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;