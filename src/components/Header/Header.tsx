import { useEffect, useState } from "react";
import "./style.scss";
import Tooltip from "../../ui/Tooltip/Tooltip";

export const Header = () => {
  const [isShowTooltip, setShowTooltip] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(()=> {
    if(localStorage.getItem("userData")) {
      setUser(JSON.parse(localStorage.getItem("userData")))
    }
  }, [])
  const showTooltip = () => {
    if (isShowTooltip) setShowTooltip(false)
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
          <a href="/movies" className="header__link">
            Сообщения
          </a>
          
        </div>
        <div className="header__col">
          {user ? (
            <a className="header__link" onClick={showTooltip}>
              {user.username}
            </a>
          ) : (
            <a href="/login" className="header__link">
              Войти
            </a>
          )}
        </div>
      </div>
      {isShowTooltip && <Tooltip></Tooltip>}
    </>
  );
};
