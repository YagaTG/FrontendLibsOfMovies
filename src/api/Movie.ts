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

export const ratingMovie = (
  userId: number,
  movieId: number,
  rating: number
) => {
  //Отправка оценки фильма
  return fetch(`http://${ip}:3500/api/ratingMovie`, {
    method: "post",
    credentials: "include",
    body: JSON.stringify({ userId, movieId, rating }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((r) => r.json());
};

export const getMovieRating = (userId: string, movieId: string) => {
  return fetch(
    `http://${ip}:3500/api/getMovieRating?userId=${userId}&movieId=${movieId}`,
    { credentials: "include" }
  ).then((r) => r.json());
};
