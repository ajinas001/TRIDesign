// components/StatCard.js (or wherever your StatCard component is)
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { delay, motion, useInView } from 'framer-motion';

const StatCard = ({ number, suffix, title, illustration, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      const target = parseInt(number.replace(/,/g, ''));
      let start = 0;
      const increment = target / 60; // 60 frames for smooth animation

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [inView, number]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="flex flex-col items-center text-center p-8"
    >
      <div className="mb-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          // Changed: text color to a vibrant pink/purple to stand out
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#B184E5]" 
        >
          {formatNumber(count)}{suffix}
        </motion.span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
        className="mb-6"
      >
        {/* Changed: Title text color to white for contrast */}
        <p className="text-lg md:text-xl text-white mb-4 max-w-xs">
          {title}
        </p>
        <div className="flex justify-center">
          {illustration}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Illustration Components (Colors Changed) ---

const WorkshopIllustration = () => (
  <div className="w-24 h-24 relative">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Workshop/presentation icon - Colors changed */}
      <circle cx="30" cy="40" r="15" fill="#FF69B4" opacity="0.7" /> {/* Vibrant pink */}
      <rect x="45" y="25" width="35" height="25" rx="3" fill="none" stroke="#957DAD" strokeWidth="2" /> {/* Darker purple for stroke */}
      <line x1="50" y1="35" x2="75" y2="35" stroke="#957DAD" strokeWidth="1.5" />
      <line x1="50" y1="40" x2="70" y2="40" stroke="#957DAD" strokeWidth="1.5" />
      <path d="M25 55 L35 65 L45 55" fill="none" stroke="#957DAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 55 L70 65 L80 55" fill="none" stroke="#957DAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const GamesIllustration = () => (
  <div className="w-24 h-24 relative">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Game planning/venue illustration - Colors changed */}
      <rect x="20" y="30" width="25" height="40" rx="3" fill="none" stroke="#FFD700" strokeWidth="2" /> {/* Light Orange */}
      <rect x="55" y="25" width="25" height="45" rx="3" fill="none" stroke="#FFD700" strokeWidth="2" />
      <circle cx="32" cy="15" r="3" fill="#B184E5" /> {/* Lighter purple */}
      <circle cx="67" cy="15" r="3" fill="#B184E5" />
      <circle cx="32" cy="80" r="3" fill="#B184E5" />
      <line x1="32" y1="18" x2="32" y2="30" stroke="#B184E5" strokeWidth="1.5" />
      <line x1="67" y1="18" x2="67" y2="25" stroke="#B184E5" strokeWidth="1.5" />
      <line x1="32" y1="70" x2="32" y2="77" stroke="#B184E5" strokeWidth="1.5" />
      <path d="M15 85 Q32 75 50 85 Q67 75 85 85" fill="none" stroke="#FFD700" strokeWidth="2" />
    </svg>
  </div>
);

const DwellingsIllustration = () => (
  <div className="w-24 h-24 relative">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Buildings/dwellings illustration - Colors changed */}
      <rect x="15" y="40" width="20" height="45" fill="none" stroke="#FF69B4" strokeWidth="2" /> {/* Vibrant pink */}
      <rect x="40" y="30" width="20" height="55" fill="none" stroke="#FF69B4" strokeWidth="2" />
      <rect x="65" y="35" width="20" height="50" fill="none" stroke="#FF69B4" strokeWidth="2" />
      
      {/* Windows - Colors changed */}
      <rect x="18" y="45" width="4" height="4" fill="#B184E5" opacity="0.5" /> {/* Lighter purple */}
      <rect x="27" y="45" width="4" height="4" fill="#B184E5" opacity="0.5" />
      <rect x="18" y="55" width="4" height="4" fill="#B184E5" opacity="0.5" />
      <rect x="27" y="55" width="4" height="4" fill="#B184E5" opacity="0.5" />
      
      <rect x="43" y="35" width="4" height="4" fill="#B184E5" opacity="0.5" />
      <rect x="53" y="35" width="4" height="4" fill="#B184E5" opacity="0.5" />
      <rect x="43" y="45" width="4" height="4" fill="#B184E5" opacity="0.5" />
      <rect x="53" y="45" width="4" height="4" fill="#B184E5" opacity="0.5" />
      
      <rect x="68" y="40" width="4" height="4" fill="#B184E5" opacity="0.5" />
      <rect x="78" y="40" width="4" height="4" fill="#B184E5" opacity="0.5" />
      <rect x="68" y="50" width="4" height="4" fill="#B184E5" opacity="0.5" />
      <rect x="78" y="50" width="4" height="4" fill="#B184E5" opacity="0.5" />
      
      {/* Ground line - Color changed */}
      <line x1="10" y1="85" x2="90" y2="85" stroke="#FF69B4" strokeWidth="2" />
    </svg>
  </div>
);

const MasterPlanIllustration = () => (
  <div className="w-24 h-24 relative">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Master planning/city layout - Colors changed */}
      <path d="M20 30 Q30 20 40 30 Q50 40 60 30 Q70 20 80 30 Q85 35 80 40 Q70 50 60 40 Q50 30 40 40 Q30 50 20 40 Q15 35 20 30" 
            fill="none" stroke="#98FB98" strokeWidth="2" /> {/* Light Green */}
      <circle cx="25" cy="35" r="2" fill="#98FB98" opacity="0.7" />
      <circle cx="45" cy="35" r="2" fill="#98FB98" opacity="0.7" />
      <circle cx="65" cy="35" r="2" fill="#98FB98" opacity="0.7" />
      <circle cx="75" cy="35" r="2" fill="#98FB98" opacity="0.7" />
      
      {/* Planning lines - Colors changed */}
      <line x1="20" y1="50" x2="80" y2="50" stroke="#B184E5" strokeWidth="1.5" strokeDasharray="3,3" />
      <line x1="20" y1="60" x2="80" y2="60" stroke="#B184E5" strokeWidth="1.5" strokeDasharray="3,3" />
      <line x1="20" y1="70" x2="80" y2="70" stroke="#B184E5" strokeWidth="1.5" strokeDasharray="3,3" />
      
      {/* Small squares representing zones - Colors changed */}
      <rect x="25" y="55" width="6" height="6" fill="#98FB98" opacity="0.3" />
      <rect x="35" y="55" width="6" height="6" fill="#98FB98" opacity="0.3" />
      <rect x="45" y="55" width="6" height="6" fill="#98FB98" opacity="0.3" />
      <rect x="55" y="55" width="6" height="6" fill="#98FB98" opacity="0.3" />
      <rect x="65" y="55" width="6" height="6" fill="#98FB98" opacity="0.3" />
    </svg>
  </div>
);


// components/AboutHome.js (or wherever your AboutHome component is)

// Import StatCard and illustrations
// import StatCard, { WorkshopIllustration, GamesIllustration, DwellingsIllustration, MasterPlanIllustration } from './StatCard'; // Adjust path if needed

const   AboutHome = () => {
  
  const stats = [
    {
  number: "150",
  suffix: "+",
  title: "Clients Served",
  illustration:<DwellingsIllustration/>,
  delay:0
},
{
  number: "200",
  suffix: "+",
  title: "Projects Completed",
  illustration:<MasterPlanIllustration/>,
  delay:0.2

},
{
  number: "85",
  suffix: "+",
  title: "Verified Reviews",
  illustration:<WorkshopIllustration/>,
  delay:0.4,
},
{
  number: "500",
  suffix: "+",
  title: "3D Visuals Created",
  illustration:<GamesIllustration/>,
  delay:0.6
},

    
  ];

  return (
    // Changed: Main background to your deep purple
    <div className="min-h-screen bg-[#512361] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-20"
        >
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight">
            We're City Making<br />
            Design Leaders
          </h1>
          
          {/* Changed: Paragraph text color to a lighter gray for better readability on dark background */}
          <p className="text-lg md:text-xl text-[#E0E0E0] mb-12 max-w-2xl">
            From health and knowledge precincts to club houses...
          </p>
          
          <motion.a
          href='/about'
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.98 }}
            // Changed: Link text color and border color to white
            className="group flex items-center gap-4 text-white text-lg font-medium hover:text-white transition-colors duration-300"
          >
            <span className="border-b border-white pb-1 group-hover:border-white transition-colors duration-300">
              Discover Our Process
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Changed: SVG stroke color to white */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.div>
          </motion.a>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              suffix={stat.suffix}
              title={stat.title}
              illustration={stat.illustration}
              delay={stat.delay}
            />
          ))}
        </div>
        
        {/* Decorative dots - Changed: Color to a soft pink/purple that complements */}
        
      </div>
    </div>
  );
};

export default AboutHome;