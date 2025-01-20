import React from 'react';
import Header from '../Header';
import ExperienceSection from './ExperienceSection';
import HeroSection from './HeroSection';
import CompanyOverview from './CompanyOverview';
import {motion}  from 'framer-motion';
import { features } from './data';
import { FeatureBlock } from './FeatureBlock';

const About: React.FC = () => {
  return (
    <div className="bg-white text-black min-h-screen font-sans overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="relative">
        <HeroSection />
      </div>

      {/* Company Overview Section */}
      <CompanyOverview />

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto relative z-10 px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                The Future of Finance
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the next generation of financial technology, powered by advanced AI and quantum computing.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureBlock key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />
    </div>
  );
};

export default About;