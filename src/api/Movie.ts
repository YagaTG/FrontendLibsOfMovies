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
const ip = "192.168.0.101"
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
  const data = fetch(`http://${ip}:3500/api/getMovieData?movieId=${id}`)
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
  return;
};

export const ratingMovie = (): void => {
    //Отправка оценки фильма
  return;
};
