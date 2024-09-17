import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { User, SavedSearch, Match } from './types';
import UserProfile from './pages/userProfile';
import LoginPage from './pages/loginPage';
import SearchPage from './pages/searchPage';
import Header from './components/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ffa726',
    },
  },
});

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [savedMatches, setSavedMatches] = useState<Match[]>([]);
  const [currentPage, setCurrentPage] = useState<'search' | 'profile' | 'saved'>('search');
  const queryClient = new QueryClient();

  useEffect(() => {
    // Load saved searches and matches from local storage
    const loadedSearches = localStorage.getItem('savedSearches');
    const loadedMatches = localStorage.getItem('savedMatches');
    if (loadedSearches) setSavedSearches(JSON.parse(loadedSearches));
    if (loadedMatches) setSavedMatches(JSON.parse(loadedMatches));
  }, []);

  const handleSaveSearch = (search: SavedSearch) => {
    const updatedSearches = [...savedSearches, search];
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
  };

  const handleSaveMatch = (match: Match) => {
    const updatedMatches = [...savedMatches, match];
    setSavedMatches(updatedMatches);
    localStorage.setItem('savedMatches', JSON.stringify(updatedMatches));
  };

  const handleLogout = () => {
    setUser(null);
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <QueryClientProvider client={queryClient}>
       <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        {user ? (
          <>
            <Header user={user} onLogout={handleLogout} onNavigate={setCurrentPage} currentPage={'search'} />
            <Box sx={{ mt: 15}}>
              {currentPage === 'search' && (
                <SearchPage 
                  user={user} 
                  onSaveSearch={handleSaveSearch} 
                  onSaveMatch={handleSaveMatch}
                />
              )}
              {currentPage === 'profile' && <UserProfile user={user} onUpdateUser={setUser} onError={function (message: string): void {
                throw new Error('Function not implemented.');
              } }/>}
            </Box>
          </>
        ) : (
          <LoginPage onLogin={setUser} />
        )}
      </Container>
    </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;