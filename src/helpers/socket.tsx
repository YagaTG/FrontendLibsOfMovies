import io from "socket.io-client";

const socket = io(window.location.origin.replace("5173", "3500"));

export default socket;
