import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function toastText(text) {


  return toast.dark(text, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
    draggablePercent: 60,
    hideProgressBar: true,
    closeOnClick: true,
  });
};