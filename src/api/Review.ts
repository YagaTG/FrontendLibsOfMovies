import { ip } from "../config.server";

export interface IReview {
  id: number;
  userId: number;
  username: string;
  movieId: number;
  rating: number;
  text: string;
}

export const getMovieReviews = (
  movieId: string | undefined,
  succesFunc
): void => {
  const data = fetch(
    `http://${ip}:3500/api/getMovieReviews?movieId=${movieId}`
  )
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
  return;
};
