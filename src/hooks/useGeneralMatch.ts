import { UseMutationResult, useMutation } from "@tanstack/react-query";

export const generateMatch = async (favorites: string[], setMatch: (match: any) => void): Promise<any> => {
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

  setMatch(matchId);

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


export const useGenerateMatch = (
  onSuccess: (match: any) => void,
  setMatch: (match: any) => void
): UseMutationResult<any, Error, string[]> => {
  return useMutation({
    mutationFn: (favorites: string[]) => generateMatch(favorites, setMatch),
    onSuccess,
  });
};