import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronDown, Settings, Loader2, Briefcase, Menu } from 'lucide-react';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import useAuth from '../hooks/useAuth';
import AuthModal from '../Auth/AuthModal';
import { SearchPopover } from './SearchPopover';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../Auth/SuccessModal';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAuthenticating, showSuccessModal, setShowSuccessModal } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const { scrollY } = useScroll();

  // Transform values for smooth animations
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/portfolio');
  };
  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10"
      style={{
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur}px)`,
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14"> {/* Reduced height to h-14 */}
          {/* Logo */}
          <Logo />

          {/* Navigation Menu */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex items-center gap-8`}>
            <NavigationMenu
              isAuthModalOpen={isAuthModalOpen}
              setIsAuthModalOpen={setIsAuthModalOpen}
            />

            {/* Search and User Menu */}
            <div className="flex items-center gap-6">
              <SearchPopover />

              {/* User Menu */}
              {isAuthenticated ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <motion.button
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-white hover:text-white/80 transition-colors duration-200"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="text-sm font-medium">{user?.name}</span>
                    <motion.div
                      animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 opacity-60" />
                    </motion.div>
                  </motion.button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        className="absolute mt-2 right-0 w-64 py-2 bg-white/95 backdrop-blur-lg rounded-lg shadow-lg border border-white/10"
                      >
                        {user?.roles?.includes('ADMIN') && (
                          <div className="px-4 py-2 mb-1">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-500 rounded-full">
                              Admin Access
                            </span>
                          </div>
                        )}

                        <div className="px-2">
                          <motion.button
                            onClick={handleProfileClick}
                            className="w-full px-4 py-2 text-sm text-black hover:bg-black/5 rounded-md transition-colors flex items-center gap-3"
                          >
                            <Briefcase className="w-4 h-4 opacity-70" />
                            <span>Portfolio</span>
                          </motion.button>

                          <motion.button
                            onClick={handleSettingsClick}
                            className="w-full px-4 py-2 text-sm text-black hover:bg-black/5 rounded-md transition-colors flex items-center gap-3"
                          >
                            <Settings className="w-4 h-4 opacity-70" />
                            <span>Settings</span>
                          </motion.button>
                        </div>

                        <div className="my-2 border-t border-white/10" />

                        <div className="px-2">
                          <motion.button
                            onClick={logout}
                            className="w-full px-4 py-2 text-sm text-black hover:text-red-600 hover:bg-black/5 rounded-md transition-colors flex items-center gap-3"
                          >
                            <LogOut className="w-4 h-4 opacity-70" />
                            <span>Sign Out</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-6  text-white/90 text-sm font-medium tracking-wide hover:text-white transition-all duration-300"
                >
                  Sign In
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Loading Overlay */}
      <AnimatePresence>
        {isAuthenticating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-xl"
          >
            <div className="bg-black/95 p-8 rounded-xl text-center">
              <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
              <h2 className="text-xl text-white font-light tracking-wider">
                Authenticating...
              </h2>
              <p className="text-white/60 mt-2">
                Connecting to your credentials
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AuthModal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Success Modal */}
      <AnimatePresence>
       {showSuccessModal && (
 <div className='mt-32 flex justify-center items-center bg-black/90 backdrop-blur-lg text-white text-2xl font-bold '> 
          <SuccessModal
            message="Successfully signed out!"
            onClose={() => setShowSuccessModal(false)}
          />
     </div>
        )}

      </AnimatePresence>
    </motion.header>
  );
};

export default Header;