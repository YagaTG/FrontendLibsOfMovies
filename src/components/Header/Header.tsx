import { useEffect, useState } from "react";
import "./style.scss";
import Dropdown from "../../ui/Dropdown/Dropdown";

export const Header = () => {
  const [isShowTooltip, setShowTooltip] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUser(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);
  const showTooltip = () => {
    if (isShowTooltip) setShowTooltip(false);
    else setShowTooltip(true);
  };

  return (
    <>
      <div className="header">
        <div className="header__col">
          {!user && <a className="header__link">Главная</a>}
          <a href="/movies" className="header__link">
            Все фильмы
          </a>
          <a href="/feednews" className="header__link">
            Лента
          </a>
          <a href="/messenger" className="header__link">
            Сообщения
          </a>
        </div>
        <div className="header__col">
          {user ? (
            <Dropdown
              isHeader
              headerElem={<a className="header__link">{user.username}</a>}
            />
          ) : (
            <Dropdown
              isHeader
              headerElem={
                <a href="/login" className="header__link">
                  Войти
                </a>
              }
            />
          )}
        </div>
      </div>
    </>
  );
};
