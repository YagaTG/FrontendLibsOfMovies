import { ip } from "../config.server";

export interface Movie {
  id: number;
  name: string;
  description: string;
  rating: number;
  img: string;
}

type MovieItem = {
  item: Movie;
};

export const getAllMovies = (succesFunc: () => {}) => {
  // Запрос ко всем фильмам БД
  const data = fetch(`http://${ip}:3500/api/getAllMovies`)
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
  return;
};

export const getMovie = (id: string | undefined, succesFunc) => {
  // Запрос к фильму
  return fetch(`http://${ip}:3500/api/getMovieData?movieId=${id}`).then((r) =>
    r.json()
  );
  // .then((data) => succesFunc(data))
  // .catch((err) => alert(err));
  // return;
};

export const ratingMovie = (): void => {
  //Отправка оценки фильма
  return;
};
