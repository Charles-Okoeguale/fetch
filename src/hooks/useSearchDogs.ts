import { SearchData } from '../types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';


interface SearchDogsParams {
  filters: any;
  sortOrder: any;
  page: number;
}

const fetchDogs = async ({ filters, sortOrder, page }: SearchDogsParams) => {
  const queryParams = new URLSearchParams();

  if (filters.breed) queryParams.append('breeds[]', filters.breed);
  if (filters.ageMin) queryParams.append('ageMin', filters.ageMin.toString());
  if (filters.ageMax) queryParams.append('ageMax', filters.ageMax.toString());
  if (filters.zipCode) queryParams.append('zipCodes[]', filters.zipCode);
  queryParams.append('sort', `breed:${sortOrder}`);
  queryParams.append('size', '12');
  queryParams.append('from', ((page - 1) * 12).toString());

  const url = `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`;
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    throw new Error('Failed to search dogs');
  }

  const data = await response.json();
  const dogIds = data.resultIds;
  const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dogIds),
    credentials: 'include',
  });

  if (!dogsResponse.ok) {
    throw new Error('Failed to fetch dog details');
  }

  const dogsData = await dogsResponse.json();
  // return { dogsData, totalPages: Math.ceil(data.total / 12) };
  return { dogsData, totalPages: Math.ceil(data.total / 12) };
};

export const useSearchDogs = (params: SearchDogsParams): UseQueryResult<SearchData, Error> => {
  return useQuery<SearchData, Error>({
    queryKey: ['searchDogs', params],
    queryFn: () => fetchDogs(params)
  });
};