import { useQuery } from "@tanstack/react-query";
import { Dog } from "../types";

export const useFavorites = () => {
  return useQuery<Dog[], Error>({
    queryKey: ['favorites'],
    queryFn: async () => {  
      const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (favoriteIds.length === 0) {
        return [];
      }
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteIds),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch favorite dogs');
      }
      return response.json();
    },
  });
};