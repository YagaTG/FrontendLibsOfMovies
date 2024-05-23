import { useState } from "react";
import Button from "../Button/Button";
import "./style.scss";
import { useNavigate } from "react-router-dom";

export default function Dropdown({
  isDarkBackground,
  isHeader = false,
  items,
}) {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {isHeader ? (
        <div className="dropdown">
          <div className="dropdown__btn">Войти</div>
          <a className="dropdown__link" href="/profile">
            В профиль
          </a>
          <Button text="Войти" onClick={() => navigate("/login")}></Button>
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
