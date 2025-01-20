import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { number: 99.9, label: "Accuracy Rate" },
  { number: 0.001, label: "Processing Time" },
  { number: 50, label: "Assets Analyzed" },
  { number: 24, label: "Neural Network" }
];

const ExperienceSection: React.FC = () => {
  // State to hold the animated values
  const [animatedNumbers, setAnimatedNumbers] = useState([0, 0, 0, 0]);

  // Detect when the section is in view
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      // Function to animate the numbers
      const animateNumbers = () => {
        const duration = 2000; // Animation duration in milliseconds
        const increments = stats.map((stat) => stat.number / (duration / 16)); // Increment per frame

        let startTime: number;

        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;

          // Update the numbers based on progress
          setAnimatedNumbers((prev) =>
            prev.map((value, index) => {
              const target = stats[index].number;
              const increment = increments[index];
              return progress < duration
                ? Math.min(value + increment, target)
                : target;
            })
          );

          // Continue the animation until duration is reached
          if (progress < duration) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
      };

      animateNumbers();
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl font-bold mb-8 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              Quantum-Scale Performance
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
              <div className="relative bg-white backdrop-blur-xl border border-gray-200 p-8 rounded-2xl group-hover:border-gray-300 transition-all duration-500 shadow-lg">
                <h3 className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-4">
                  {stat.label === "Processing Time"
                    ? `${animatedNumbers[index].toFixed(3)}s`
                    : stat.label === "Assets Analyzed"
                    ? `$${animatedNumbers[index].toFixed(0)}B+`
                    : `${animatedNumbers[index].toFixed(1)}%`}
                </h3>
                <p className="text-gray-600 font-light text-xl">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;