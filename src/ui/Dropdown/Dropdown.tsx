import { useState } from "react";
import Button from "../Button/Button";
import "./style.scss";
import { useNavigate } from "react-router-dom";

export default function Dropdown({
  isDarkBackground,
  isHeader = false,
  headerElem,
  items,
}) {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {isHeader ? (
        <div className="dropdown dropdown__header">
          <div
            className="dropdown__btn"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!isOpen);
            }}
          >
            {headerElem}
          </div>
          {isOpen && (
            <div
              className="dropdown__content"
              onClick={(e) => e.stopPropagation()}
            >
              <a className="dropdown__item" href="/profile">
                В профиль
              </a>
              <a className="dropdown__item" href="/profile">
                Друзья
              </a>
              <Button text="Войти" isDarkBackground onClick={() => navigate("/login")}></Button>
            </div>
          )}
        </div>
      ) : (
        <div className="dropdown">
          <div
            className="dropdown__btn"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!isOpen);
            }}
          >
            ...
          </div>
          {isOpen && (
            <div
              className="dropdown__content"
              onClick={(e) => e.stopPropagation()}
            >
              {items}
            </div>
          )}
        </div>
      )}
    </>
  );
}
