import { useNavigate } from "react-router-dom";

export interface User {
  id: number;
  username: string;
  password: string;
  mail: string;
}

// const navigate = useNavigate();
const ip = "192.168.0.101";

export const registerUser = () => {};
export const logout = () => {
  localStorage.removeItem("userData");
  //   navigate(0);
};

export const getFriendsRequest = (userId: number, succesFunc): void => {
  const data = fetch(
    `http://${ip}:3500/api/getFriendsRequests?userId=${userId}`
  )
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
  return;
};

export const getIncommingFriendsRequest = (
  userId: number,
  succesFunc
): void => {
  const data = fetch(
    `http://${ip}:3500/api/getIncommingFriendsRequests?userId=${userId}`
  )
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
  return;
};

export const inviteFriends = async (
  incommingUser: number,
  outcommingUser: number,
  succesFunc
): void => {
  await fetch(`http://${ip}:3500/api/inviteFriend`, {
    method: "post",
    body: JSON.stringify({ incommingUser, outcommingUser }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
};

export const dismissRequest = async (
  incommingUser: number,
  outcommingUser: number,
  succesFunc
): void => {
  console.log(incommingUser, outcommingUser);
  await fetch(`http://${ip}:3500/api/dismissFriendRequest`, {
    method: "post",
    body: JSON.stringify({ incommingUser, outcommingUser }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
};

export const addFriend = async (
  userId: number,
  newFriends: [],
  outcommingUser: number,
  outcommingUserFriends: [],
  succesFunc
) => {
  console.log(newFriends);
  await fetch(`http://${ip}:3500/api/addFriend`, {
    method: "post",
    body: JSON.stringify({
      id: userId,
      friends: JSON.stringify(newFriends),
      outcommingUser,
      outcommingUserFriends: JSON.stringify(outcommingUserFriends),
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
};

export const getUserAvata = async (username: string) => {
  if (username) {
    const res = await fetch(
      `http://${ip}:3500/api/getUserAvatar?username=${username}`
    );
    return await res.json();
  }
};

export const addUserAvatar = async (data) => {
  await fetch(`http://${ip}:3500/api/addFriend`, {
    method: "post",
    body: new FormData(data),
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
};
