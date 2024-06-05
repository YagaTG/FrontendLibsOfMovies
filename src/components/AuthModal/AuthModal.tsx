import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";

import "./style.scss";

export const AuthModal = ({ closeFunc }) => {
  const navigate = useNavigate();
  return (
    <div
      className="modal"
      onClick={() => {
        closeFunc(false);
      }}
    >
      <div className="auth-modal">
        <p className="auth-modal__text">Авторизируйтесь</p>
        <Button text="Войти" onClick={() => navigate("/login")}></Button>
      </div>
    </div>
  );
};
