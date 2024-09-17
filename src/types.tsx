export interface User {
  name: string;
  email: string;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  img: string;
  zip_code: string;
}

export interface Savedsearch {
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

export interface LoginPageProps {
  onLogin: (user: User) => void;
}


export interface HeaderProps {
  user: User;
  currentPage: 'search' | 'profile' | 'saved'; // Include 'saved' here
  onNavigate: (page: 'search' | 'profile' | 'saved') => void; // Update onNavigate as well
  onLogout: () => void;
}

export interface UserProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onError: (message: string) => void;
}


export interface FavoriteDogsListProps {
  favorites: { id: string; name: string; breed: string; age: number; zip_code: string; img: string }[];
  handleDeleteFavorite: (id: string) => void;
  isLoading: boolean;
}

export interface SearchData {
  dogsData: any[]; 
  totalPages: number;
}

export interface Match {
  name: string;
  breed: string;
  age: number;
  zip_code: string;
  img: string;
}

export interface MatchCardProps {
  match: Match;
}

