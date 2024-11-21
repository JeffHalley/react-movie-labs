import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import HomePage from "./pages/homePage";
import UpcomingPage from "./pages/upcomingPage";
import PopularPage from "./pages/popularPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import AuthPage from "./pages/authPage";


import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const AppRoutes = () => {
  const { authUser } = useAuth(); // Use authUser from AuthContext

  return (
    <Routes>
      {/* Redirect unauthenticated users to the auth page */}
      {!authUser ? (
        <>
          <Route path="/" element={<Navigate to="/auth" />} /> {/* Redirect root to /auth */}
          <Route path="/auth" element={<AuthPage />} />
        </>
      ) : (
        <>
          {/* Authenticated routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/reviews/:id" element={<MovieReviewPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/movies/upcoming" element={<UpcomingPage />} />
          <Route path="/movies/popular" element={<PopularPage />} />
          <Route path="/movies/now_playing" element={<NowPlayingPage />} />
          <Route path="/reviews/form" element={<AddMovieReviewPage />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Default route */}
        </>
      )}
    </Routes>
  );
};

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
        <AuthProvider>
          <SiteHeader />
          <MoviesContextProvider>
            <div style={backgroundStyle}>
              <AppRoutes />
            </div>
          </MoviesContextProvider>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
