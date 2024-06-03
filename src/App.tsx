import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { FeedPage } from "./pages/FeedPage/FeedPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { MessengerPage } from "./pages/MessengerPage/MessengerPage";
import { UserPage } from "./pages/UserPage/UserPage";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ToastContainer progressClassName={"testw"} />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/userpage/:userId" element={<UserPage />} />
          <Route path="/panel" element={<AdminPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/messenger" element={<MessengerPage />} />
          <Route path="/feednews" element={<FeedPage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
