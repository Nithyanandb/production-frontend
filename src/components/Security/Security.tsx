import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Protected by leading financial security standards. Enterprise-level encryption."
    },
    {
      icon: Lock,
      title: "Multi-Factor Auth",
      description: "Advanced authentication layers. Biometric security. Hardware key support."
    }
  ];

  return (
    <section className="relative py-12 md:py-24 bg-black">
      {/* Grok-style glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-xl"
          >
            <span className="text-sm text-white/40 uppercase tracking-wider mb-4 block">Security First</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-6">
              Protected by
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Design
              </span>
            </h2>

            <div className="space-y-8 mt-8">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                      <feature.icon className="w-5 h-5 text-white/60" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-2">{feature.title}</h3>
                    <p className="text-white/40 text-base leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-4 py-2 bg-white rounded-full text-black text-base 
                font-medium tracking-wide flex items-center gap-2 overflow-hidden transition-all duration-300 mt-8"
            >
              <span className="relative z-10">Explore Security</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 
                opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Security First Trading"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Security;