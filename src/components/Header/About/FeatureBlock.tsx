import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureBlockProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  image: string;
  alt: string;
  featuresList?: string[]; // Additional list of features
  cta?: {
    text: string;
    link: string;
  }; // Call-to-action button
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({
  title,
  description,
  icon: Icon,
  gradient,
  image,
  alt,
  featuresList,
  cta,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col items-center bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/10" />
      </div>

      {/* Content Section */}
      <div className="p-8 text-center">
        <div
          className={`w-16 h-16 mb-6 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-lg mx-auto`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-semibold mb-4 tracking-tight text-gray-900">
          {title}
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">{description}</p>

        {/* Additional Features List */}
        {featuresList && (
          <ul className="space-y-3 mb-6">
            {featuresList.map((feature, index) => (
              <li key={index} className="flex items-center justify-center text-gray-600">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Call-to-Action Button */}
        {cta && (
          <a
            href={cta.link}
            className="inline-block px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300"
          >
            {cta.text}
          </a>
        )}
      </div>
    </motion.div>
  );
};