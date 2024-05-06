import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { useUser } from "../../hooks/useUser";
import { searchUsers } from "../../helpers/search";
import "./style.scss";
import { useNavigate } from "react-router-dom";

import { SettingsScreen, FriendsScreen } from "./Screens/screens";

export default function ProfilePage(currentScreen: string) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  // Вынести в хук

  const navigate = useNavigate();
  const { checkLogin, getUserData } = useUser();

  const [activeScreen, setActiveScreen] = useState("profile");
  const profileScreens = {
    profile: <SettingsScreen user={user} />,
    friends: <FriendsScreen user={user} />,
  };
  useEffect(() => {
    if (!checkLogin()) navigate("/login");
    else setUser(getUserData());
  }, []);

  return (
    <>
      <Header></Header>
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
              onClick={() => setActiveScreen("statistics")}
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

        {/* Friends Screen */}
      </div>

      <footer className="footer"></footer>
    </>
  );
}
