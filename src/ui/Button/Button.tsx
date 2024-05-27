import { IButton } from "./IButton";
import "./style.scss";

export default function Button({
  onClick,
  text,
  isDarkBackground = false,

  isDisable = false,
  type = "submit",
}: IButton) {
  return (
    <button
      onClick={onClick}
      className={`button ${isDarkBackground ? "dark-button" : "light-button"}`}
      disabled={isDisable}
      type={type}
    >
      {text}
    </button>
  );
}
