import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import UpcomingPage from "./pages/upcomingPage";
import PopularPage from "./pages/popularPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const backgroundStyle = {
    background: `url('/images/back3.png') no-repeat center center fixed`, 
    backgroundSize: "cover", 
    height: "100vh", 
    width: "100%", 
    overflowX: "hidden", 
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <div style={backgroundStyle}>  {/* Apply to the outermost div */}
            <Routes>
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/movies/upcoming" element={<UpcomingPage/>} />
              <Route path="/movies/popular" element={<PopularPage/>} />
              <Route path="/movies/now_playing" element={<NowPlayingPage/>} />
              <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
          </div>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
