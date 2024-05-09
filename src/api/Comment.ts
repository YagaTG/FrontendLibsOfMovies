import { ip } from "../config.server";

export interface IComment {
  id: number;
  authorId: number;
  authorUsername: string;
  movieId: number;
  text: string;
  createdAt: number;
}

export const getMovieComments = (
  movieId: string | undefined,
  succesFunc: (data: IComment[]) => {}
): void => {
  // Запрос возвращающий все комментарии к фильму
  const data = fetch(
    `http://${ip}:3500/api/getMovieComments?movieId=${movieId}`
  )
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
  return;
};

export const createComment = (
  movieId: number,
  authorId: number,
  text: string,
  authorUsername: string
) => {
  // Запрос создания комментария к фильму
  const data = fetch(`http://${ip}:3500/api/createComment`, {
    method: "post",
    credentials: "include",
    body: JSON.stringify({ movieId, authorId, text, authorUsername }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((r) => r.json())
    .then((data) => console.log(data))
    .catch((err) => alert(err));
};

export const deleteComment = (commentId: number) => {
  // Запрос, удаляющий комментарий
  return;
};
