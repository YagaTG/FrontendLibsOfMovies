import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const navigate = useNavigate();
  const checkLogin = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) navigate("/login");
    else return userData;
  };

  const getUserData = () => {
    return JSON.parse(localStorage.getItem("userData"));
  };
  return { checkLogin, getUserData };
}
