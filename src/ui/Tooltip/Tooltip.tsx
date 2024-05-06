import { useState } from "react";
import { Header } from "../../components/Header/Header";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import "./style.scss";

export default function Tooltip() {
  return (
    <>
      <div className="tooltip">
        <a href="/profile">В профиль</a>
        <button>Выйти</button>
      </div>
    </>
  );
}
