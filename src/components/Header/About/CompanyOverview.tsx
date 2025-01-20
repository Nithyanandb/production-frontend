import React from 'react';
import { motion } from 'framer-motion';

const CompanyOverview: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4">
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
              About CapX
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing the financial world with cutting-edge technology and innovative solutions.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side - Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-4xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              At CapX, our mission is to democratize access to advanced financial tools and empower individuals to make informed investment decisions. We believe in leveraging technology to create a seamless, transparent, and efficient trading experience for everyone.
            </p>
          </motion.div>

          {/* Right Side - How We Work */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-4xl font-semibold text-gray-900 mb-4">
              How We Work
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              CapX combines the power of **AI-driven analytics**, **quantum computing**, and **machine learning** to provide real-time market insights, predictive analytics, and personalized investment strategies. Our platform is designed to simplify complex financial data and make it accessible to both beginners and seasoned investors.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3" />
                Real-time market analysis and predictions.
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3" />
                Advanced tools for portfolio management.
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3" />
                Secure and transparent trading environment.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Team Members Section */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Our Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the brilliant minds behind CapX, driving innovation and excellence in the financial world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Founder */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=2680"
                alt="Founder"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">X</h3>
              <p className="text-lg text-gray-600">Founder & CEO</p>
              <p className="text-gray-500 mt-2">
                Visionary leader with a passion for democratizing finance through technology.
              </p>
            </motion.div>

            {/* Co-Founder */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=2680"
                alt="Co-Founder"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Y</h3>
              <p className="text-lg text-gray-600">Co-Founder & CTO</p>
              <p className="text-gray-500 mt-2">
                Tech innovator with expertise in AI and quantum computing.
              </p>
            </motion.div>

            {/* Team Member */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=2680"
                alt="Team Member"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Z</h3>
              <p className="text-lg text-gray-600">Head of Product</p>
              <p className="text-gray-500 mt-2">
                Product strategist with a focus on user-centric design.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Company Timeline Section */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Our Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A timeline of key milestones in CapX's journey to revolutionize finance.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {/* Timeline Item 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between"
              >
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-2xl font-semibold text-gray-900">2018</h3>
                  <p className="text-lg text-gray-600">CapX Founded</p>
                  <p className="text-gray-500">
                    CapX was founded with a vision to democratize finance through technology.
                  </p>
                </div>
                <div className="w-1/2 pl-8">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </div>
              </motion.div>

              {/* Timeline Item 2 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center justify-between"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </div>
                <div className="w-1/2 pl-8">
                  <h3 className="text-2xl font-semibold text-gray-900">2020</h3>
                  <p className="text-lg text-gray-600">AI Platform Launched</p>
                  <p className="text-gray-500">
                    Introduced AI-driven analytics for real-time market insights.
                  </p>
                </div>
              </motion.div>

              {/* Timeline Item 3 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center justify-between"
              >
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-2xl font-semibold text-gray-900">2022</h3>
                  <p className="text-lg text-gray-600">Quantum Computing Integration</p>
                  <p className="text-gray-500">
                    Integrated quantum computing for faster and more accurate predictions.
                  </p>
                </div>
                <div className="w-1/2 pl-8">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </div>
              </motion.div>

              {/* Timeline Item 4 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center justify-between"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </div>
                <div className="w-1/2 pl-8">
                  <h3 className="text-2xl font-semibold text-gray-900">2023</h3>
                  <p className="text-lg text-gray-600">Global Expansion</p>
                  <p className="text-gray-500">
                    Expanded operations to serve customers in over 50 countries.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;