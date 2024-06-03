import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
export function useNotify() {
  const notify = (text: string) =>
    toast(text, {
      progressClassName: "custom-progress-bar",
      hideProgressBar: false,
      autoClose: 2000,
      position: "top-center",
    });
  return { notify };
}
