import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, TrendingUp, Globe2, Building2, Landmark, Flag, ArrowRight, X } from 'lucide-react';
import axios from 'axios';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: 'market' | 'company' | 'politics' | 'national' | 'global' | 'technology' | 'business' | 'top news';
  timestamp: string;
  source: string;
  image: string;
}

const MarketWatch: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://finnhub.io/api/v1/news', {
          params: {
            category: 'general',
            token: 'cu147s1r01qjiern2jmgcu147s1r01qjiern2jn0' // Replace with your actual API key
          }
        });

        // Fetch different slices of the news data
        const slice1 = response.data.slice(13, 17); // Fetch items from index 13 to 16
        const slice2 = response.data.slice(21, 22); // Fetch items from index 21 to 21
        const slice3 = response.data.slice(25, 27); // Fetch items from index 25 to 26
        const slice4 = response.data.slice(33, 34); // Fetch items from index 33 to 33
        const slice5 = response.data.slice(39, 40); // Fetch items from index 39 to 39

        // Combine the slices into a single array
        const combinedNews = [...slice1, ...slice2, ...slice3, ...slice4, ...slice5];

        const mappedNews = combinedNews.map((item: any) => ({
          id: item.id.toString(),
          title: item.headline,
          description: item.summary,
          category: item.category, // Use the category directly from the API
          timestamp: new Date(item.datetime * 1000).toLocaleTimeString(),
          source: item.source,
          image: item.image,
        }));

        setNewsItems(mappedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '0px 0px 100px 0px', // Load images 100px before they enter the viewport
      }
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => {
      imageRefs.current.forEach((img) => {
        if (img) observer.unobserve(img);
      });
    };
  }, [newsItems]);

  const filters = [
    { id: 'all', label: 'Top Stories', icon: Newspaper },
    { id: 'market', label: 'Markets', icon: TrendingUp },
    { id: 'company', label: 'Companies', icon: Building2 },
    { id: 'politics', label: 'Politics', icon: Landmark },
    { id: 'national', label: 'India', icon: Flag },
    { id: 'global', label: 'Global', icon: Globe2 },
  ];

  const filteredNews = activeFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.target as HTMLImageElement;
    target.src = 'https://placehold.co/400x200?text=Image+Not+Available'; 
  };

  const openModal = (news: NewsItem) => {
    setSelectedNews(news);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg animate-pulse">
            <div className="w-full h-40 bg-gray-300" />
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2" />
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
              <div className="h-3 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <div className="absolute inset-0" />

      <div className="relative flex items-center justify-between py-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Market Watch</h2>
        </div>
      </div>

      <div className="relative flex gap-4 mb-8 overflow-x-auto hide-scrollbar">
        <div className="hidden sm:flex gap-4">
          {filters.map(filter => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all
                ${activeFilter === filter.id 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <filter.icon className="w-4 h-4" />
              <span>{filter.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => openModal(news)}
            >
              {/* Image with hover overlay */}
              <div className="relative w-full h-40">
                <img 
                  ref={(el) => (imageRefs.current[index] = el)}
                  data-src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.opacity = '1';
                  }}
                  onError={handleImageError}
                  style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">View Details</span>
                </div>
              </div>

              {/* Content section */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-gray-500">{news.timestamp}</span>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight">{news.title}</h3>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-xs font-medium text-gray-500">{news.source}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{selectedNews.title}</h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6">
                <div className="relative h-48 sm:h-64 mb-4 sm:mb-6">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover rounded-lg"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">{selectedNews.description}</p>
                <div className="text-xs sm:text-sm text-gray-500">
                  <span>Source: {selectedNews.source}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedNews.timestamp}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketWatch;