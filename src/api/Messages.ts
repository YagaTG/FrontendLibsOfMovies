import { ip } from "../config.server";

export const getDialogMessages = (dialogId) => {
  return fetch(
    `http://${ip}:3500/api/getDialogMessages?dialogId=${dialogId}`
  ).then((res) => res.json());
};

export const createMessage = (dialogId, authorId, partnerId, text) => {
  return fetch(`http://${ip}:3500/api/postMessage`, {
    method: "post",
    body: JSON.stringify({ dialogId, authorId, partnerId, text }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
