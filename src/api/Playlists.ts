import { ip } from "../config.server";

export const createPlaylist = async (name, description, userId, playlist) => {
  const playlistData = playlist.map((item) => {
    return { id: item.id, name: item.value };
  });
  await fetch(`http://${ip}:3500/api/createPlaylist`, {
    method: "post",
    body: JSON.stringify({
      name,
      description,
      userId,
      playlist: JSON.stringify(playlistData),
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((r) => r.json())
    .then((data) => console.log(data))
    .catch((err) => alert(err));
};

export const getUserPlaylist = (userId: number) => {
  return fetch(`http://${ip}:3500/api/getUserPlaylists?userId=${userId}`).then(
    (res) => res.json()
  );
};

export const deletePlaylist = (id: number) => {
  return fetch(`http://${ip}:3500/api/deletePlaylist?playlistId=${id}`);
};

export const editPlaylist = (name, description, playlistId, playlist) => {
  const playlistData = playlist.map((item) => {
    return { id: item.id, name: item.value };
  });
  console.log(playlistData);
  return fetch(`http://${ip}:3500/api/editPlaylist`, {
    method: "post",
    body: JSON.stringify({
      name,
      description,
      playlist: JSON.stringify(playlistData),
      playlistId,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((r) => r.json());
};

export const addPlaylistImage = (data, id) => {
  return fetch(`http://${ip}:3500/api/addPlaylistImage?playlistId=${id}`, {
    method: "post",
    body: data,
    headers: {
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((r) => r.json());
};
