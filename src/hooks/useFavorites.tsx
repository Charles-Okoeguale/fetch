import { useState, useCallback, useEffect } from 'react';

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
}

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];
      if (favoriteIds.length > 0) {
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(favoriteIds),
          credentials: 'include',
        });
        if (response.ok) {
          const favoriteDogs = await response.json() as Dog[];
          setFavorites(favoriteDogs);
        } else {
          throw new Error('Failed to fetch favorite dogs');
        }
      }
    } catch (error) {
      setError('Error loading favorites: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addFavorite = useCallback((dog: Dog) => {
    setFavorites(prev => [...prev, dog]);
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];
    localStorage.setItem('favorites', JSON.stringify([...favoriteIds, dog.id]));
  }, []);

  const removeFavorite = useCallback((dogId: string) => {
    setFavorites(prev => prev.filter(dog => dog.id !== dogId));
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];
    localStorage.setItem('favorites', JSON.stringify(favoriteIds.filter(id => id !== dogId)));
  }, []);

  return { favorites, loading, error, addFavorite, removeFavorite, loadFavorites };
};

export default useFavorites;



// const { breeds, loading: breedsLoading, error: breedsError } = useFetchBreeds();
//   const { dogs, totalPages, loading: searchLoading, error: searchError, searchDogs } = useSearchDogs();
//   const { favorites, loading: favoritesLoading, error: favoritesError, addFavorite, removeFavorite } = useFavorites();


// const useFetchBreeds = (): { breeds: string[]; loading: boolean; error: string | null } => {
//     // ... hook implementation ...
//   };


// const { breeds, loading, error } = useFetchBreeds();


// const { favorites, loading, error, addFavorite, removeFavorite, loadFavorites } = useFavorites();


// const { dogs, totalPages, loading, error, searchDogs } = useSearchDogs();
