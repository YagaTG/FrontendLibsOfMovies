import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import { Input } from "../../../ui/Input/Input";

import { useForm } from "react-hook-form";
import { getAllMovies } from "../../../api/Movie";
import { Selector } from "../../../ui/Selector/Selector";
import {
  createPlaylist,
  deletePlaylist,
  getUserPlaylist,
} from "../../../api/Playlists";
import { useQuery } from "react-query";
import Dropdown from "../../../ui/Dropdown/Dropdown";

export const PlaylistScreen = ({ user }) => {
  //   const [playlists, setPlaylists] = useState([1]);
  const [isCreateWindow, setCreateWindow] = useState(false);
  const [isPlaylistItemMenu, setPlaylistItemMenu] = useState(false);
  const [isEditPlaylist, setEditPlaylist] = useState(false);
  const [isPlaylistWindow, setPlaylistWindow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activePlaylist, setActivePlaylist] = useState(null);

  const { isLoading, data: playlists } = useQuery("getPlaylists", () =>
    getUserPlaylist(user.id)
  );

  const form = useForm();
  const { register, handleSubmit } = form;

  const onSubmit = (data) => {
    console.log(data);
    const { name, description } = data;
    console.log(selectedItems);
    createPlaylist(name, description, user.id, selectedItems);
  };

  const handleChange = (selectedOptions: []) => {
    console.log("handleChange", selectedOptions);
    setSelectedItems(selectedOptions);
  };

  const options = [
    {
      value: "choc",
      label: "chok",
    },
  ];
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies(setMovies);
  }, []);

  const getMoviesList = (searchValue, callback) => {
    console.log(movies);
    const test = movies.map((item) => {
      return { value: item.name, label: item.name, img: item.img, id: item.id };
    });
    const filteredMovies = test.filter((item) => {
      return item.label.toLowerCase().includes(searchValue.toLowerCase());
    });
    console.log(test);
    console.log(filteredMovies);
    callback(filteredMovies);
  };
  return (
    <div className="profile__wrapper">
      <div className="playlist__handlers">
        <Button
          text="Создать плейлист"
          onClick={() => {
            setCreateWindow(true);
          }}
        ></Button>
      </div>
      <div className="playlist__container">
        {playlists &&
          playlists.map((item) => {
            return (
              <div
                className="playlist-item"
                onClick={() => {
                  setPlaylistWindow(true);
                  setActivePlaylist(item);
                }}
              >
                <div className="playlist-item__block">
                  <img />
                </div>
                <p className="playlist-item__name">{item.name}</p>
                <Dropdown
                  items={
                    <div className="dropdown__items">
                      <p className="dropdown__item">Изменить</p>
                      <p
                        className="dropdown__item"
                        onClick={() => {
                          deletePlaylist(item.id).then((data) => {
                            console.log(data);
                          });
                        }}
                      >
                        Удалить
                      </p>
                    </div>
                  }
                />
              </div>
            );
          })}
      </div>
      {isCreateWindow && (
        <div
          className="playlist__modal"
          onClick={() => {
            setCreateWindow(false);
          }}
        >
          <div
            className="playlist__create-form"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              action=""
              className="create-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="create-form__title">Создание плейлиста</p>
              <Input
                placeholder="Введите название"
                name={"name"}
                register={register}
              ></Input>
              <Input
                placeholder="Введите описание"
                name={"description"}
                type="textarea"
                register={register}
              ></Input>
              <Selector
                handleChange={handleChange}
                loadOptions={getMoviesList}
              />

              <Button text="Создать"></Button>
            </form>
          </div>
        </div>
      )}
      {isPlaylistWindow && (
        <div
          className="playlist__modal"
          onClick={() => {
            setPlaylistWindow(false);
          }}
        >
          <div
            className="playlist__collection"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="collection">
              <div className="collection__img"></div>
              <div className="collection__title">{activePlaylist?.name}</div>
              <div className="collection__desc">
                {activePlaylist?.description}
              </div>
              <div className="collection__movies">
                {activePlaylist?.movies &&
                  activePlaylist.movies.map((movie) => (
                    <div className="collection__movie-item">{movie?.name}</div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
