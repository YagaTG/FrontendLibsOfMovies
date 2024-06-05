import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";

import "./style.scss";

export const UnloginScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="unlogin">
      <p className="unlogin__text">Авторизируйтесь:</p>
      <Button text="Войти" onClick={() => navigate("/login")}></Button>
    </div>
  );
};
