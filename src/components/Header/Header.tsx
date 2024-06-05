import Dropdown from "../../ui/Dropdown/Dropdown";
import { useUser } from "../../hooks/useUser";

import "./style.scss";

export const Header = () => {
  const { user } = useUser();

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
          {user && (
            <a href="/messenger" className="header__link">
              Сообщения
            </a>
          )}
        </div>
        <div className="header__col">
          {user ? (
            <Dropdown
              isHeader
              headerElem={<a className="header__link">{user.username}</a>}
            />
          ) : (
            <a href="/login" className="header__link">
              Войти
            </a>
          )}
        </div>
      </div>
    </>
  );
};
