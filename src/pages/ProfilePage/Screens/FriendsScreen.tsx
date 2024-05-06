import { useEffect, useState } from "react";
import { Search } from "../../../ui/Search/Search";

import {
  getFriendsRequest,
  getIncommingFriendsRequest,
} from "../../../api/User";

export const FriendsScreen = ({ user }) => {
  const [outcommingRequests, setOutcommingRequests] = useState(null);
  const [incommingRequests, setIncommingRequests] = useState(null);
  const [friends, setFriends] = useState([1]);
  const [isOutcommingTab, setOutcommingTab] = useState(true);
  useEffect(() => {
    if (user) {
      setFriends(JSON.parse(user.friends));
      getFriendsRequest(user.id, setOutcommingRequests);
      getIncommingFriendsRequest(user.id, setIncommingRequests);
    }
  }, [JSON.stringify(user)]);
  return (
    <div className="friends">
      <div className="friends__title">Список друзей</div>
      <Search placeholder={"Введите имя пользователя"} />
      <div className="friends__approved">
        <div className="friends__category">Ваши друзья:</div>
        {friends?.length > 0 ? (
          <div className="friends__list">
            {friends.map((item) => {
              return (
                <div className="friends__item" key={Date.now()}>
                  <div className="friends-item__avatar"></div>
                  <div className="friends-item__data">
                    <div className="friends-item__name">{item?.username}</div>
                    <div className="friends-item__stats">
                      <p className="friends-item__stat">Друзей: 0</p>
                      <p className="friends-item__stat">Оценки: 0</p>
                      <p className="friends-item__stat">Плейлисты: 0</p>
                    </div>
                    <button className="friends-item__button">
                      Добавить в друзья
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Список пуст</p>
        )}
      </div>

      <div className="friends__not-approved">
        <div className="friends__categories">
          <div className="friends__category">
            Входящие запросы: ({incommingRequests?.length ?? 0})
          </div>
          <div
            className={`friends__category  ${
              isOutcommingTab && "friends__category_active"
            }`}
          >
            Исходящие запросы: ({outcommingRequests?.length ?? 0})
          </div>
        </div>
        <div className="friends__list">
          {outcommingRequests &&
            outcommingRequests.map((item) => {
              console.log(item);
              return (
                <div className="friends-item" key={item.incommingUser}>
                  <div className="friends-item__avatar"></div>
                  <div className="friends-item__data">
                    <div className="friends-item__name">{item?.username}</div>
                    <div className="friends-item__stats">
                      <p className="friends-item__stat">Друзей: 0</p>
                      <p className="friends-item__stat">Оценки: 0</p>
                      <p className="friends-item__stat">Плейлисты: 0</p>
                    </div>
                    <button className="friends-item__button">
                      Добавить в друзья
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
