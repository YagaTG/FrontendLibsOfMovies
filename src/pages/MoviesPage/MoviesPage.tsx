import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import Button from "../../ui/Button/Button";
import { Movie, getAllMovies } from "../../api/Movie";
import "./style.scss";
import { Search } from "../../ui/Search/Search";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies(setMovies);
  }, []);
  const handleFindedMovies = (findedMovies) => {
    setMovies(findedMovies);
  }
  const movieItem = (movieData: Movie) => {
    return (
      <div
        className="movies__item"
        key={movieData.id}
      >
        <a className="movieItem" href={`movie/${movieData.id}`}>
          <img
            className="movieItem__picture"
            src={`/movies/${movieData.img}`}
            alt={`Постер фильма ${movieData.name}`}
          />
          <div className="movieItem_hover">
           Оценка: {movieData.rating}/10
          </div>
        </a>
        <div className="movieItem__handlers">
          <div className="movieItem__title">{movieData.name}</div>
          <div className="movieItem__share"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header></Header>
      <div className="container">
        <Search handleData={handleFindedMovies}/>
        <div className="movies-wrapper">
          {movies.map((movie) => {
            return movieItem(movie);
          })}
        </div>
      </div>
      {/* <div className="modal">
        <div className="login-form">
          <h2 className="login-form__title">Авторизация</h2>
          <Input placeholder={"Имя пользователя"}></Input>
          <Input placeholder={"Пароль"} type={"password"}></Input>
          <Button text={"Войти"}></Button>
          <span>запомнить меня</span>
        </div>
      </div> */}
    </>
  );
}
