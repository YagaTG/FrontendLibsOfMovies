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
  const data = fetch(`http://${ip}:3500/api/getFriendsRequests?userId=${userId}`)
    .then((r) => r.json())
    .then((data) => succesFunc(data))
    .catch((err) => alert(err));
  return;
};

export const getIncommingFriendsRequest = (userId: number, succesFunc): void => {
    const data = fetch(`http://${ip}:3500/api/getIncommingFriendsRequests?userId=${userId}`)
      .then((r) => r.json())
      .then((data) => succesFunc(data))
      .catch((err) => alert(err));
    return;
  };
