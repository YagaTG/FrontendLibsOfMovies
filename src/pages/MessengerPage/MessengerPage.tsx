import { useState } from "react";

import { useQuery } from "react-query";
import { getAllDialogs } from "../../api/Dialogs";
import Button from "../../ui/Button/Button";
import "./style.scss";
import { Header } from "../../components/Header/Header";

export const MessengerPage = () => {
  // const {isLoading, data: dialogs} = useQuery("dialogs", ()=>getAllDialogs())
  const [activeDialog, setActiveDialog] = useState(null);
  const dialogItem = () => {
    return (
      <div className="dialog">
        <div className="dialog__avatar"></div>
        <div className="dialog__data">
          <div className="dialog__name">тест</div>
          <p className="dialog__last-message">тестовое сообщение</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <Header></Header>
      <div className="messenger">
        <div className="dialogs">
          <div className="dialogs__handlers">
            {/* TODO: Добавить поиск по дилагам */}

            <Button text="Создать диалог"></Button>
          </div>
          {dialogItem()}
          {dialogItem()}
        </div>
        <div
          className={`message-area ${
            activeDialog ? null : "message-area__empty"
          }`}
        >
          {activeDialog ? (
            <></>
          ) : (
            <div className="message-area__empty-text">Выберите диалог</div>
          )}
        </div>
      </div>
    </>
  );
};
