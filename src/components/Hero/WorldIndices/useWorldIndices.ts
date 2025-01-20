// useWorldIndices.ts
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
    refetchInterval: 50000, // Update every second
    staleTime: 1, // Data is considered fresh for 500ms
    refetchIntervalInBackground: true, // Keep refetching even when the tab is not active
  });
};