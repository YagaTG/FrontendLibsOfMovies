export interface IReview {
  id: number;
  userId: number;
  username: string;
  movieId: number;
  rating: number;
  text: string;
}
const ip = "192.168.0.101"
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
