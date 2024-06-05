import { ip } from "../config.server";

export const getUserDialogs = (userId) => {
  return fetch(`http://${ip}:3500/api/getUserDialogs?userId=${userId}`).then(
    (res) => res.json()
  );
};

export const createDialog = (authorId, partnerId, lastMessage) => {
  console.log(JSON.stringify({ authorId, partnerId, lastMessage }));

  return fetch(`http://${ip}:3500/api/createDialog`, {
    method: "post",
    body: JSON.stringify({ authorId, partnerId, newMessage: lastMessage }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((res) => res.json);
};

export const deleteDialog = (dialogId) => {
  return fetch(`http://${ip}:3500/api/getUserDialogs?userId=${dialogId}`).then(
    (res) => res.json()
  );
};
