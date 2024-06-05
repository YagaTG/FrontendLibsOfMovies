import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/User";

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData") ?? null;

    getMe().then((data) => {
      data.id ? setUser(data) : setUser(null);
    });
  }, []);

  const refreshUserData = () => {
    console.log(user);
    getMe(user?.id)
      .then((data) => {
        console.log(data);
        localStorage.setItem("userData", JSON.stringify(data));
        const userData = localStorage.getItem("userData") ?? null;
        setUser(JSON.parse(userData));
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();
  const checkLogin = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) navigate("/login");
    else return userData;
  };

  const getUserData = () => {
    return JSON.parse(localStorage.getItem("userData"));
  };
  return { user, checkLogin, getUserData, refreshUserData };
}
