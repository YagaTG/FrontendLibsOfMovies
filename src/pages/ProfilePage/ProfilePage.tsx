import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { useUser } from "../../hooks/useUser";
import "./style.scss";
import { useNavigate } from "react-router-dom";

import {
  SettingsScreen,
  FriendsScreen,
  StatisticScreen,
  HelpScreen,
  PlaylistScreen,
} from "./Screens/screens";
import { RatingsScreen } from "./Screens/RatingsScreen";
import Button from "../../ui/Button/Button";

export default function ProfilePage(currentScreen: string) {
  const { user, refreshUserData } = useUser();
  const navigate = useNavigate();

  const [activeScreen, setActiveScreen] = useState("profile");
  const profileScreens = {
    profile: <SettingsScreen user={user} />,
    friends: <FriendsScreen user={user} refreshFunc={refreshUserData} />,
    statistic: <StatisticScreen />,
    help: <HelpScreen />,
    playlists: <PlaylistScreen user={user} />,
    ratings: <RatingsScreen user={user} />,
  };

  return (
    <>
      <Header></Header>
      {user ? (
        <div className="profile-container">
          <div className="sidebar">
            <ul className="sidebar__nav">
              <li
                className="sidebar__item"
                onClick={() => setActiveScreen("profile")}
              >
                Настройки пользователя
              </li>
              <li
                className="sidebar__item"
                onClick={() => setActiveScreen("friends")}
              >
                Друзья
              </li>
              <li
                className="sidebar__item"
                onClick={() => setActiveScreen("ratings")}
              >
                Оценки
              </li>
              <li
                className="sidebar__item"
                onClick={() => setActiveScreen("playlists")}
              >
                Подборки
              </li>
              <li
                className="sidebar__item"
                onClick={() => setActiveScreen("statistic")}
              >
                Статистика
              </li>
              <li
                className="sidebar__item"
                onClick={() => setActiveScreen("help")}
              >
                Поддержка
              </li>
            </ul>
          </div>
          {activeScreen && profileScreens[activeScreen]}
        </div>
      ) : (
        <div className="profile-container">
          Авторизуйтесь <Button text="Войти"></Button>
        </div>
      )}
    </>
  );
}
