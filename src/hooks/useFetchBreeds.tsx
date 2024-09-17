import { useState, useEffect } from 'react';

const useFetchBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setBreeds(data);
        } else {
          throw new Error('Failed to fetch breeds');
        }
      } catch (error) {
        setError('Error fetching breeds. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  return { breeds, loading, error };
};

export default useFetchBreeds;
