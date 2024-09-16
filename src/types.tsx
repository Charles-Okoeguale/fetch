export interface User {
  name: string;
  email: string;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
}

export interface SavedSearch {
  id: string;
  breed: string;
  ageMin: number;
  ageMax: number;
  zipCode: string;
  sortOrder: 'asc' | 'desc';
}

export interface Match {
  id: string;
  dog: Dog;
  timestamp: number;
}

export interface SearchFilters {
  breed: string;
  ageMin: number;
  ageMax: number;
  zipCode: string;
}

// src/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  breed: string;
  ageMin: number;
  ageMax: number;
  zipCode: string;
}