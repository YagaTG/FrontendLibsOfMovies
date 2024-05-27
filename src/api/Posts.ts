import { ip } from "../config.server";

export const getAllPosts = () => {
  return fetch(`http://${ip}:3500/api/getAllPosts`).then((res) => res.json());
};

export const createPost = (userId, title, text, movieId) => {
  return fetch(`http://${ip}:3500/api/createPost`, {
    method: "post",
    body: JSON.stringify({ userId, title, text, movieId }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((r) => r.json());
};
