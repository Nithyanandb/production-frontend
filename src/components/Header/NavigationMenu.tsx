import React, { useState } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  BarChart2,
  DollarSign,
  PieChart,
  Briefcase,
  TrendingUp,
  Landmark,
  Binary,
  LineChart,
  BookOpen,
  Target,
  Building2,
  Laptop,
  Brain,
  Lightbulb,
  Info,
} from 'lucide-react';
import { cn } from '../Auth/cn';
import useAuth from '../hooks/useAuth';

interface NavigationMenuProps {
  className?: string;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (value: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  className,
  isAuthModalOpen,
  setIsAuthModalOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const handleMouseEnter = (menuId: string) => {
    setHoveredMenu(menuId);
  };
  const handleMouseLeave = () => {
    if (!hoveredMenu) {
      setHoveredMenu(null);
    }
  };
  return (
    <NavigationMenuPrimitive.Root className={className}>
      <NavigationMenuPrimitive.List
        className={`flex flex-col md:flex-row items-center gap-6 ${isMobileMenuOpen ? 'block' : 'hidden'} md:flex`}
      >
        {/* Markets */}
        <NavItem
          href="/markets"
          label="Markets"
          isHovered={hoveredMenu === 'markets'}
          onMouseEnter={() => handleMouseEnter('markets')}
          onMouseLeave={handleMouseLeave}
          icon={<BarChart2 size={18} />}
        >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-12">
            {/* Left Side - Markets Content */}
            <div className="space-y-6 hidden md:block">
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0 }}
                className="relative aspect-[16/9] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </div>

            {/* Right Side - Menu Items */}
            <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
                  Stock Market
                </h3>
                <div className="grid gap-2">
                  <NavLink
                    href="/stock/all"
                    icon={<BarChart2 size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">All Stocks</span>
                  </NavLink>
                  <NavLink
                    href="/stock/buy"
                    icon={<DollarSign size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">Buy Stocks</span>
                  </NavLink>
                  <NavLink
                    href="/stock/sell"
                    icon={<PieChart size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">Sell Stocks</span>
                  </NavLink>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider -mt-[20px] mb-4">
                  Market Indices
                </h3>
                <div className="grid gap-2">
                  <NavLink
                    href="/indices/nifty"
                    icon={<Target size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">NIFTY 50</span>
                  </NavLink>
                  <NavLink
                    href="/indices/sensex"
                    icon={<LineChart size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">SENSEX</span>
                  </NavLink>
                  <NavLink
                    href="/indices/banknifty"
                    icon={<Landmark size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">BANK NIFTY</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </NavItem>

        {/* Trading */}
        <NavItem
          href="/trading"
          label="Trading"
          isHovered={hoveredMenu === 'trading'}
          onMouseEnter={() => handleMouseEnter('trading')}
          onMouseLeave={handleMouseLeave}
          icon={<TrendingUp size={18} />}
        >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-12">
            {/* Left Side - Trading Image */}
            <div className="space-y-6 hidden md:block">
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0 }}
                className="relative aspect-[16/9] overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </div>

            {/* Right Side - Trading Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
                  Basic Trading
                </h3>
                <div className="space-y-2">
                  <NavLink
                    href="/trading/spot"
                    icon={<TrendingUp size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">Spot Trading</span>
                  </NavLink>
                  <NavLink
                    href="/trading/margin"
                    icon={<Briefcase size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">Margin Trading</span>
                  </NavLink>
                  <NavLink
                    href="/trading/futures"
                    icon={<LineChart size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">Futures</span>
                  </NavLink>
                  <NavLink
                    href="/trading/options"
                    icon={<Binary size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">Options</span>
                  </NavLink>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
                  Advanced
                </h3>
                <div className="space-y-2">
                  <NavLink
                    href="/trading/algo"
                    icon={<Laptop size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">Algo Trading</span>
                  </NavLink>
                  <NavLink
                    href="/trading/derivatives"
                    icon={<Building2 size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">Derivatives</span>
                  </NavLink>
                  <NavLink
                    href="/trading/analysis"
                    icon={<Brain size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">Technical Analysis</span>
                  </NavLink>
                  <NavLink
                    href="/trading/scanner"
                    icon={<Target size={20} />}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                  >
                    <span className="font-medium">Market Scanner</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </NavItem>

        {/* Learn */}
        <NavItem
          href="/learn"
          label="Learn"
          isHovered={hoveredMenu === 'learn'}
          onMouseEnter={() => handleMouseEnter('learn')}
          onMouseLeave={handleMouseLeave}
          icon={<BookOpen size={18} />}
        >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-12">
            {/* Left Side - Learn Image */}
            <div className="space-y-6 hidden md:block">
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0 }}
                className="relative aspect-[16/9] overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </div>

            {/* Right Side - Learning Paths */}
            <div className="space-y-4">
              <NavLink
                href="/learn/basics"
                icon={<BookOpen size={20} />}
                setIsAuthModalOpen={setIsAuthModalOpen}
              >
                <span className="font-medium">Trading Basics</span>
              </NavLink>
              <NavLink
                href="/learn/technical"
                icon={<LineChart size={20} />}
                setIsAuthModalOpen={setIsAuthModalOpen}
              >
                <span className="font-medium">Technical Analysis</span>
              </NavLink>
              <NavLink
                href="/learn/fundamental"
                icon={<Brain size={20} />}
                setIsAuthModalOpen={setIsAuthModalOpen}
              >
                <span className="font-medium">Fundamental Analysis</span>
              </NavLink>
              <NavLink
                href="/learn/strategies"
                icon={<Lightbulb size={20} />}
                setIsAuthModalOpen={setIsAuthModalOpen}
              >
                <span className="font-medium">Trading Strategies</span>
              </NavLink>
            </div>
          </div>
        </NavItem>

        {/* About */}
        <SimpleNavLink href="/about">
          <div className="flex items-center gap-1.5">
            <Info size={18} className="text-white/80 hover:text-white" />
            <span>About</span>
          </div>
        </SimpleNavLink>
      </NavigationMenuPrimitive.List>

      <NavigationMenuPrimitive.Viewport className="absolute left-0 right-0 top-full" />
    </NavigationMenuPrimitive.Root>
  );
};

const NavItem: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  icon?: React.ReactElement;
}> = ({ label, children, isHovered, onMouseEnter, onMouseLeave, icon }) => {
  return (
    <NavigationMenuPrimitive.Item
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <NavigationMenuPrimitive.Trigger className="group flex items-center gap-1.5 text-white/80 hover:text-white transition-colors outline-none">
        {icon && React.cloneElement(icon, { className: "h-4 w-4 text-white/80 group-hover:text-white" })}
        <span className="text-sm font-medium tracking-wide">{label}</span>
        <motion.div animate={{ rotate: isHovered ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.div>
      </NavigationMenuPrimitive.Trigger>

      <AnimatePresence>
        {isHovered && (
          <NavigationMenuPrimitive.Content
            className="absolute left-0 right-0 top-full z-50 w-screen md:w-auto"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-black backdrop-blur-lg border-t border-black/10 shadow-lg"
            >
              {children}
            </motion.div>
          </NavigationMenuPrimitive.Content>
        )}
      </AnimatePresence>
    </NavigationMenuPrimitive.Item>
  );
};

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
  setIsAuthModalOpen: (value: boolean) => void;
}> = ({ href, children, icon, className, setIsAuthModalOpen }) => {
  const { isAuthenticated } = useAuth();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    window.location.href = href;
  };

  return (
    <motion.a
      href={href}
      className={cn(
        "group flex flex-col gap-0.5 p-4 rounded-lg hover:bg-black/5 transition-all duration-200",
        className
      )}
      whileHover={{ x: 0 }}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        {icon && React.cloneElement(icon, { className: "h-5 w-5 text-white/60 group-hover:text-white" })}
        <div className="flex flex-col">
          <span className="font-medium text-white/60 group-hover:text-white">{children}</span>
        </div>
      </div>
    </motion.a>
  );
};

const SimpleNavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <NavigationMenuPrimitive.Item>
    <NavigationMenuPrimitive.Link
      href={href}
      className="text-sm text-white/70 hover:text-white transition-colors"
    >
      {children}
    </NavigationMenuPrimitive.Link>
  </NavigationMenuPrimitive.Item>
);

export default NavigationMenu;