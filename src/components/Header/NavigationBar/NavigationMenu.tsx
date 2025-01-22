import React, { useState } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/components/Auth/cn';
import useAuth from '@/components/hooks/useAuth';
import { marketsData, tradingData, learnData } from './navigationData';

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
      <NavigationMenuPrimitive.List className="flex items-center gap-8">
        {/* Store */}
        <NavItem
          data={marketsData}
          isHovered={hoveredMenu === 'store'}
          onMouseEnter={() => handleMouseEnter('store')}
          onMouseLeave={handleMouseLeave}
          setIsAuthModalOpen={setIsAuthModalOpen}
        />

        {/* Support */}
        <NavItem
          data={tradingData}
          isHovered={hoveredMenu === 'support'}
          onMouseEnter={() => handleMouseEnter('support')}
          onMouseLeave={handleMouseLeave}
          setIsAuthModalOpen={setIsAuthModalOpen}
        />

        {/* Learn */}
        <NavItem
          data={learnData}
          isHovered={hoveredMenu === 'learn'}
          onMouseEnter={() => handleMouseEnter('learn')}
          onMouseLeave={handleMouseLeave}
          setIsAuthModalOpen={setIsAuthModalOpen}
        />
      </NavigationMenuPrimitive.List>

      <NavigationMenuPrimitive.Viewport />
    </NavigationMenuPrimitive.Root>
  );
};

const NavItem: React.FC<{
  data: any;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  setIsAuthModalOpen: (value: boolean) => void;
}> = ({ data, isHovered, onMouseEnter, onMouseLeave, setIsAuthModalOpen }) => {
  return (
    <NavigationMenuPrimitive.Item
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      <NavigationMenuPrimitive.Trigger className="apple-nav-item apple-nav-link flex items-center gap-1">
        {data.label}
        <motion.div
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-3 w-3" />
        </motion.div>
      </NavigationMenuPrimitive.Trigger>

      <AnimatePresence>
        {isHovered && (
          <NavigationMenuPrimitive.Content
            className="apple-nav-dropdown"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="apple-nav-content"
            >
              <div className="max-w-[980px] mx-auto px-8 py-8">
                {/* Featured Section */}
                {data.content.featured && (
                  <div className="mb-8">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      {data.content.featured.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {data.content.featured.items.map((item: any, index: number) => (
                        <div key={index} className="group cursor-pointer">
                          <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                          </div>
                          <h4 className="font-medium text-base">{item.title}</h4>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Content */}
                <div className="grid grid-cols-2 gap-12">
                  {data.content.right.map((section: any, index: number) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {section.title}
                      </h3>
                      <div className="grid gap-3">
                        {section.links.map((link: any, linkIndex: number) => (
                          <NavLink
                            key={linkIndex}
                            href={link.href}
                            icon={link.icon}
                            setIsAuthModalOpen={setIsAuthModalOpen}
                          >
                            <span className="font-medium">{link.title}</span>
                            <span className="text-sm text-gray-500">
                              {link.description}
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
        'group flex items-center gap-3 p-3 rounded-lg apple-nav-item-hover',
        className
      )}
      whileHover={{ x: 4 }}
      onClick={handleClick}
    >
      {icon &&
        React.cloneElement(icon, {
          className: 'h-5 w-5 text-gray-400 group-hover:text-gray-900',
        })}
      <div className="flex flex-col">{children}</div>
    </motion.a>
  );
};

export default NavigationMenu;