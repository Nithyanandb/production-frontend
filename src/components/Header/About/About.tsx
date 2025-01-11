import React from 'react';
import Header from '../Header';
import ExperienceSection from './ExperienceSection';
import HeroSection from './HeroSection';
import { motion } from 'framer-motion';
import { features } from './data';
import { FeatureBlock } from './FeatureBlock';

const About: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-hidden"  >
      <Header />
      <div className="d" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
    }}>
      <HeroSection  /></div>
  <section className="py-16 relative overflow-hidden bg-black" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
    }}>
    <div className="absolute inset-0 " />
    
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-4"
      >
        <h2 className="text-7xl font-bold mb-8 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            The Future of Finance
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Experience the next generation of financial technology, powered by 
          advanced AI and quantum computing.
        </p>
      </motion.div>

      {/* Feature Blocks */}
      <div className="space-y-16">
        {features.map((feature, index) => (
          <FeatureBlock 
            key={index}
            {...feature}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  </section>

      <ExperienceSection />
    </div>
  );
};

export default About;