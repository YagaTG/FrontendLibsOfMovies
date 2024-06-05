import { ip } from "../config.server";

export interface IComment {
  id: number;
  authorId: number;
  authorUsername: string;
  movieId: number;
  text: string;
  createdAt: number;
}

export const getMovieComments = (movieId: string | undefined): void => {
  // Запрос возвращающий все комментарии к фильму
  return fetch(
    `http://${ip}:3500/api/getMovieComments?movieId=${movieId}`
  ).then((r) => r.json());
};

export const createComment = (
  movieId: number,
  authorId: number,
  text: string
) => {
  return fetch(`http://${ip}:3500/api/createComment`, {
    method: "post",
    credentials: "include",
    body: JSON.stringify({ movieId, authorId, text }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((r) => r.json());
};

export const deleteComment = (commentId: number) => {
  // Запрос, удаляющий комментарий
  return;
};
