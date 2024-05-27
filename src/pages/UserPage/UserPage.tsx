import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/User";
import { UserAvatar } from "../../components/UserAvatar";

import "./style.scss";

export const UserPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [activePlaylist, setActivePlaylist] = useState(null);
  useEffect(() => {
    getUserProfile(userId).then(setUserData);
  }, []);

  return (
    <>
      <Header></Header>
      {userData ? (
        <div className="user-page">
          <div className="user-page__data">
            <UserAvatar username={userData?.username}></UserAvatar>
            <div className="user-page__info">
              <p className="user-page__name">{userData?.username}</p>
              <div className="user-page__quote">
                <p className="quote__title">Любимая цитата:</p>
                <p className="quote__content"></p>
              </div>
            </div>
          </div>
          <div className="user-page__playlists">
            <p className="user-page__subtitle">Подборки:</p>
            <div className="playlist__container">
              {userData?.playlists.length ? (
                userData?.playlists.map((item) => {
                  return (
                    <div
                      className="playlist-item"
                      onClick={() => {
                        setActivePlaylist(item);
                      }}
                    >
                      <div className="playlist-item__block">
                        <img />
                      </div>
                      <p className="playlist-item__name">{item.name}</p>
                    </div>
                  );
                })
              ) : (
                <p>Нет созданных подборок</p>
              )}
            </div>
          </div>
          {activePlaylist && (
            <div
              className="playlist__modal"
              onClick={() => {
                setActivePlaylist(null);
              }}
            >
              <div
                className="playlist__collection"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="collection">
                  <div className="collection__img"></div>
                  <div className="collection__title">
                    {activePlaylist?.name}
                  </div>
                  <div className="collection__desc">
                    {activePlaylist?.description}
                  </div>
                  <div className="collection__movies">
                    {activePlaylist?.movies &&
                      activePlaylist.movies.map((movie) => (
                        <div className="collection__movie-item">
                          {movie?.name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1>Такого пользователя не существует</h1>
      )}
    </>
  );
};
