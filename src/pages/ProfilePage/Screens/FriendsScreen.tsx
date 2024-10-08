import { useEffect, useState } from "react";
import { Search } from "../../../ui/Search/Search";

import {
  addFriend,
  deleteFriend,
  dismissRequest,
  getFriendsRequest,
  getIncommingFriendsRequest,
  inviteFriends,
} from "../../../api/User";

import { searchUser } from "../../../helpers/search";
import { UserAvatar } from "../../../components/UserAvatar";

export const FriendsScreen = ({ user, refreshFunc }) => {
  const [outcommingRequests, setOutcommingRequests] = useState(null);
  const [incommingRequests, setIncommingRequests] = useState(null);
  const [friends, setFriends] = useState([]);
  const [isOutcommingTab, setOutcommingTab] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [globalUsers, setGlobalUsers] = useState([]);

  useEffect(() => {
    refreshFunc();
  }, []);

  useEffect(() => {
    console.log(user);
    if (user) {
      setFriends(user.friends);
      getFriendsRequest(user.id, setOutcommingRequests);
      getIncommingFriendsRequest(user.id, setIncommingRequests);
    }
  }, [JSON.stringify(user)]);

  const handleFindedUsers = (data, searchString: string) => {
    console.log(data);
    setGlobalUsers(data);
    setSearchString(searchString);
  };

  const friendItem = (item, type: string, dismiss = false) => {
    return (
      <div className="friends-item" key={item?.id}>
        <UserAvatar
          username={item?.username}
          className="friends-item__avatar"
        ></UserAvatar>
        <div className="friends-item__data">
          <a href={`userpage/${item?.id}`} className="friends-item__name">
            {item?.username}
          </a>
          {type != "friend" ?? (
            <div className="friends-item__stats">
              <p className="friends-item__stat">Друзей: {item?.friends}</p>
              <p className="friends-item__stat">Оценки: 0</p>
              <p className="friends-item__stat">Плейлисты: 0</p>
            </div>
          )}
          {/* <div className="friends-item__stats">
            <p className="friends-item__stat">
              Друзей: {JSON.parse(item?.friends).length}
            </p>
            <p className="friends-item__stat">Оценки: 0</p>
            <p className="friends-item__stat">Плейлисты: 0</p>
          </div> */}
          {type === "newFriend" && (
            <button
              className="friends-item__button friends-item__button_add"
              onClick={() => {
                inviteFriends(item.id, user.id, (data) =>
                  getFriendsRequest(user.id, setOutcommingRequests)
                );
              }}
            >
              Добавить в друзья
            </button>
          )}
          {type === "acceptInvite" && (
            <>
              <button
                className="friends-item__button friends-item__button_add"
                onClick={() => {
                  addFriend(
                    user.id,
                    [
                      ...user.friends,
                      { id: item.outcomming_user, username: item.username },
                    ],
                    item.outcomming_user,
                    [
                      ...JSON.parse(item.friends),
                      { id: user.id, username: user.username },
                    ],
                    (data) => refreshFunc()
                  );
                }}
              >
                Принять запрос
              </button>
              <button
                className="friends-item__button friends-item__button_del"
                onClick={() => {
                  dismissRequest(user.id, item.outcomming_user, (data) =>
                    console.log(data)
                  );
                }}
              >
                Отклонить запрос
              </button>
            </>
          )}
          {type === "alreadyInvited" && (
            <button
              className="friends-item__button friends-item__button_del"
              onClick={() => {
                dismissRequest(item.incoming_user ?? item.id, user.id, (data) =>
                  getFriendsRequest(user.id, setOutcommingRequests)
                );
              }}
            >
              Отклонить
            </button>
          )}
          {type === "friend" && (
            <button
              className="friends-item__button friends-item__button_del"
              onClick={() => {
                const oldUserFriendsList = [...user.friends];
                const newUserFriendsList = oldUserFriendsList.filter(
                  (friend) => friend.id != item.id
                );
                deleteFriend(user.id, newUserFriendsList, item.id).then(
                  (data) => refreshFunc()
                );
              }}
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="profile__wrapper">
      <h2 className="profile__title">Список друзей</h2>
      <Search
        placeholder={"Введите имя пользователя"}
        searchFunc={searchUser}
        handleData={handleFindedUsers}
      />
      {searchString && (
        <div className="friends__global">
          <div className="friends__title">Все пользователи:</div>
          {globalUsers?.length > 0 ? (
            <div className="friends__list">
              {globalUsers.map((item) => {
                if (
                  user.id != item.id &&
                  !user.friends.find((friend) => {
                    console.log(friend);
                    console.log(item);
                    return friend.id == item.id;
                  })
                ) {
                  if (
                    outcommingRequests.find((req) => {
                      return req.incoming_user == item.id;
                    })
                  ) {
                    return friendItem(item, "alreadyInvited");
                  } else if (
                    incommingRequests.find((req) => {
                      return req.outcomming_user == item.id;
                    })
                  )
                    return friendItem(item, "acceptInvite");
                  else return friendItem(item, "newFriend");
                }
              })}
            </div>
          ) : (
            <p className="friends__empty-msg">Список пуст</p>
          )}
        </div>
      )}
      <div className="friends__approved">
        <div className="friends__title">Ваши друзья:</div>
        {friends?.length > 0 ? (
          <div className="friends__list">
            {friends.map((item) => {
              return friendItem(item, "friend");
            })}
          </div>
        ) : (
          <p className="friends__empty-msg">Список пуст</p>
        )}
      </div>

      <div className="friends__not-approved">
        <div className="friends__categories">
          <div
            className={`friends__category  ${
              !isOutcommingTab && "friends__category_active"
            }`}
            onClick={() => setOutcommingTab(false)}
          >
            Входящие запросы: ({incommingRequests?.length ?? 0})
          </div>
          <div
            className={`friends__category  ${
              isOutcommingTab && "friends__category_active"
            }`}
            onClick={() => setOutcommingTab(true)}
          >
            Исходящие запросы: ({outcommingRequests?.length ?? 0})
          </div>
        </div>
        <div className="friends__list">
          {isOutcommingTab ? (
            outcommingRequests && outcommingRequests.length > 0 ? (
              outcommingRequests.map((item) => {
                return friendItem(item, "alreadyInvited");
              })
            ) : (
              <p className="friends__empty-msg">Список пуст</p>
            )
          ) : incommingRequests && incommingRequests.length > 0 ? (
            incommingRequests.map((item) => {
              return friendItem(item, "acceptInvite");
            })
          ) : (
            <p className="friends__empty-msg">Список пуст</p>
          )}
        </div>
      </div>
    </div>
  );
};
