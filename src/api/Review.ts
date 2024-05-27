import { ip } from "../config.server";

export interface IReview {
  id: number;
  userId: number;
  username: string;
  movieId: number;
  rating: number;
  text: string;
}

export const getMovieReviews = (movieId: string | undefined) => {
  return fetch(`http://${ip}:3500/api/getMovieReviews?movieId=${movieId}`).then(
    (r) => r.json()
  );
};

export const createReview = (
  userId,
  movieId,
  reviewText,
  reviewPlus,
  reviewMinus
) => {
  return fetch(`http://${ip}:3500/api/createReview`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      movieId,
      reviewText,
      reviewPlus,
      reviewMinus,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
};
