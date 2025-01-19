import { useQuery } from '@tanstack/react-query';
import { generateMockMarketData } from './data';

export const useWorldIndices = () => {
  return useQuery({
    queryKey: ['worldIndices'],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return generateMockMarketData();
    },
    refetchInterval: 5000, 
    staleTime: 2000,
  });
};