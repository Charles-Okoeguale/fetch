import { useMutation } from 'react-query';

export const generateMatch = async (favorites: string[]): Promise<any> => {
    const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(favorites),
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate match');
    }
  
    const matchData = await response.json();
    const matchId = matchData.match;
  
    const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([matchId]),
      credentials: 'include',
    });
  
    if (!dogsResponse.ok) {
      throw new Error('Failed to fetch dog details');
    }
  
    const dogsData = await dogsResponse.json();
    return dogsData[0];
  };
  
