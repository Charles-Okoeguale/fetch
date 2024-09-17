import { useState, useCallback } from 'react';

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
}

interface SearchFilters {
  breed?: string;
  ageMin?: number;
  ageMax?: number;
  zipCode?: string;
}

const useSearchDogs = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchDogs = useCallback(async (filters: SearchFilters, sortOrder: 'asc' | 'desc', page: number) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (filters.breed) queryParams.append('breeds[]', filters.breed);
      if (filters.ageMin) queryParams.append('ageMin', filters.ageMin.toString());
      if (filters.ageMax) queryParams.append('ageMax', filters.ageMax.toString());
      if (filters.zipCode) queryParams.append('zipCodes[]', filters.zipCode);
      queryParams.append('sort', `breed:${sortOrder}`);
      queryParams.append('size', '20');
      queryParams.append('from', ((page - 1) * 20).toString());

      const url = `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`;

      const response = await fetch(url, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const dogIds = data.resultIds as string[];
        const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dogIds),
          credentials: 'include',
        });

        if (dogsResponse.ok) {
          const dogsData = await dogsResponse.json() as Dog[];
          setDogs(dogsData);
          setTotalPages(Math.ceil(data.total / 20));
        } else {
          throw new Error('Failed to fetch dog details');
        }
      } else {
        throw new Error('Failed to search dogs');
      }
    } catch (error) {
      setError('Error searching dogs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { dogs, totalPages, loading, error, searchDogs };
};

export default useSearchDogs;