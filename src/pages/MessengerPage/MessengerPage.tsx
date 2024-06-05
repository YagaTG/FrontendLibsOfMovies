import { useEffect, useState } from "react";

import { useQuery } from "react-query";
import { createDialog, getUserDialogs } from "../../api/Dialogs";
import Button from "../../ui/Button/Button";
import "./style.scss";
import { Header } from "../../components/Header/Header";
import { searchUser } from "../../helpers/search";
import { Search } from "../../ui/Search/Search";
import { useUser } from "../../hooks/useUser";
import { Input } from "../../ui/Input/Input";
import { useForm } from "react-hook-form";
import { createMessage, getDialogMessages } from "../../api/Messages";
import socket from "../../helpers/socket";
import { UnloginScreen } from "../../components/UnloginScreen/UnloginScreen";

export const MessengerPage = () => {
  const { user } = useUser();
  const { isLoading, data: dialogs } = useQuery(
    "dialogs",
    () => {
      const uid = JSON.parse(localStorage.getItem("userData")).id;
      if (uid) return getUserDialogs(uid);
      else console.log("Авторизируйтесь");
    },
    { enabled: Boolean(user) }
  );

  const form = useForm();
  const { register, handleSubmit } = form;
  const [currentDialog, setCurrentDialog] = useState(null);
  const [isCreateDialogWindow, setCreateDialogWindow] = useState(false);
  const [isNewDialogWindow, setNewDialogWindow] = useState(false);
  const [findedUsers, setFindedUsers] = useState([]);
  const [messages, setMessages] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(() => {
    socket.on("SERVER:DIALOG_CREATED", () => {
      getUserDialogs(JSON.parse(localStorage.getItem("userData")).id);
    });
  }, []);

  useEffect(() => {
    currentDialog
      ? getDialogMessages(currentDialog.id).then((data) => setMessages(data))
      : null;
    if (currentDialog) {
      socket.on("SERVER:NEW_MESSAGE", (data) => {
        getDialogMessages(currentDialog.id).then((data) => setMessages(data));
      });
    }
  }, [JSON.stringify(currentDialog)]);

  const dialogItem = (item) => {
    return (
      <div className="dialog" onClick={() => setCurrentDialog(item)}>
        <div className="dialog__avatar"></div>
        <div className="dialog__data">
          <div className="dialog__name">
            {item?.authorId == JSON.parse(localStorage.getItem("userData")).id
              ? item?.partner.username
              : item?.author.username}
          </div>
          <p className="dialog__last-message">Я: {item?.message.text}</p>
        </div>
      </div>
    );
  };

  const postMessage = () => {
    JSON.parse(localStorage.getItem("userData")).id == currentDialog.authorId
      ? createMessage(
          currentDialog.id,
          currentDialog?.authorId,
          currentDialog?.partnerId,
          currentMessage
        )
      : createMessage(
          currentDialog.id,
          currentDialog?.partnerId,
          currentDialog?.authorId,
          currentMessage
        );
  };

  const handleFindedUsers = (data) => {
    setFindedUsers(data);
  };

  const onSubmit = (data) => {
    createDialog(
      JSON.parse(localStorage.getItem("userData")).id,
      isNewDialogWindow.id,
      data.newMessage
    );
    setNewDialogWindow(false);
  };

  return (
    <>
      <Header></Header>
      {user ? (
        <div className="messenger">
          <div className="dialogs">
            <div className="dialogs__handlers">
              {/* TODO: Добавить поиск по диологам */}

              <Button
                text="Создать диалог"
                onClick={() => setCreateDialogWindow(true)}
              ></Button>
            </div>
            {dialogs && dialogs.map((item) => dialogItem(item))}
          </div>
          <div
            className={`message-area ${
              currentDialog ? null : "message-area__empty"
            }`}
          >
            {currentDialog ? (
              <div className="message-area__wrapper">
                <div className="message-area__header">
                  <div className="message-area__avatar"></div>
                  <div className="message-area__name">
                    {currentDialog?.partner.username}
                  </div>
                </div>
                <div className="message-area__messages">
                  {messages &&
                    messages.map((mes) => (
                      <div
                        className={`message ${
                          JSON.parse(localStorage.getItem("userData")).id ==
                          mes.authorId
                            ? "message_my"
                            : ""
                        }`}
                      >
                        {mes.text}
                      </div>
                    ))}
                </div>
                <div className="message-area__handler row">
                  <textarea
                    name=""
                    id=""
                    className="comments__input"
                    placeholder="Оставьте ваш комментарий"
                    onChange={(e) => setCurrentMessage(e.target.value)}
                  ></textarea>
                  <Button text="Отправить" onClick={postMessage} />
                </div>
              </div>
            ) : (
              <div className="message-area__empty-text">
                Выберите диалог, {user?.username}
              </div>
            )}
          </div>
        </div>
      ) : (
        <UnloginScreen />
      )}
      {isCreateDialogWindow && (
        <div
          className="playlist__modal"
          onClick={() => {
            setCreateDialogWindow(false);
          }}
        >
          <div className="create-dialog" onClick={(e) => e.stopPropagation()}>
            <Search
              placeholder={"Введите имя пользователя"}
              searchFunc={searchUser}
              handleData={handleFindedUsers}
            />
            {findedUsers.map((item) => {
              return (
                <div className="user-item">
                  <div className="user-item__avatar"></div>
                  <div className="user-item__name">{item.username}</div>
                  <Button
                    text="Написать"
                    onClick={() => {
                      setCreateDialogWindow(false);
                      setNewDialogWindow(item);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isNewDialogWindow && (
        <div
          className="playlist__modal"
          onClick={() => {
            setNewDialogWindow(false);
          }}
        >
          <div className="create-dialog" onClick={(e) => e.stopPropagation()}>
            <form
              className="create-dialog__form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                placeholder="Введите сообщение"
                name="newMessage"
                register={register}
              ></Input>
              <Button text="Отправить"></Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
