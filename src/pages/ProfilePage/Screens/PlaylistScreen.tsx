import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import { Input } from "../../../ui/Input/Input";

import { useForm } from "react-hook-form";
import { getAllMovies } from "../../../api/Movie";
import { Selector } from "../../../ui/Selector/Selector";
import {
  addPlaylistImage,
  createPlaylist,
  deletePlaylist,
  editPlaylist,
  getUserPlaylist,
} from "../../../api/Playlists";
import { useQuery } from "react-query";
import Dropdown from "../../../ui/Dropdown/Dropdown";
import { searchMovies } from "../../../helpers/search";
import { ImageUploader } from "../../../ui/ImageUploader/ImageUploader";

import { useNotify } from "../../../hooks/useNotify";
import { PlaylistImage } from "../../../components/PlaylistImage";

export const PlaylistScreen = ({ user }) => {
  const [isCreateWindow, setCreateWindow] = useState(false);
  const [isEditWindow, setEditWindow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [playlistImage, setPlaylistImage] = useState(null);

  const { isLoading, data: playlists } = useQuery("getPlaylists", () =>
    getUserPlaylist(user.id)
  );

  const { notify } = useNotify();

  useEffect(() => {
    getAllMovies(setMovies);
  }, []);

  const form = useForm();
  const { register, handleSubmit, reset } = form;

  const onSubmit = (data) => {
    console.log(data);
    const { name, description } = data;
    console.log(selectedItems);
    createPlaylist(name, description, user.id, selectedItems);
  };

  const onEditSubmit = (data) => {
    const { name, description } = data;
    console.log(selectedItems);
    console.log(activePlaylist);
    if (name.trim()) {
      console.log(playlistImage);
      editPlaylist(name, description, activePlaylist.id, selectedItems).then(
        (data) => {
          if (data?.message == "success") {
            if (playlistImage) {
              addPlaylistImage(playlistImage, data.id).then((data) => {
                data?.message == "success"
                  ? notify("Подборка обновлена")
                  : notify("Не удалось обновить подборку");
                // TODO:
                // Обновление списка плейлистов
              });
            } else {
              notify("Подборка обновлена");
              // TODO:
              // Обновление списка плейлистов
            }
          }
        }
      );
    }
  };

  const handleChange = (selectedOptions: []) => {
    console.log("handleChange", selectedOptions);
    setSelectedItems(selectedOptions);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      setPlaylistImage(data);
    }
  };

  const [movies, setMovies] = useState([]);

  const getMoviesList = async (searchValue, callback) => {
    const data = await searchMovies(searchValue);
    const moviess = data.map((item) => {
      return { value: item.name, label: item.name, id: item.id };
    });
    console.log(moviess);

    const filteredMovies = moviess.filter((item) => {
      return item.label.toLowerCase().includes(searchValue.toLowerCase());
    });
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
                  setActivePlaylist(item);
                }}
              >
                <div className="playlist-item__block">
                  <PlaylistImage
                    path={item.img}
                    playlistName={item.name}
                    className={"playlist-item__img"}
                  />
                </div>
                <p className="playlist-item__name">{item.name}</p>
                <Dropdown
                  items={
                    <div className="dropdown__items">
                      <p
                        className="dropdown__item"
                        onClick={() => {
                          setEditWindow(true);
                          setActivePlaylist(item);
                          setSelectedItems(
                            item.movies.map((item) => {
                              return {
                                ...item,
                                value: item.name,
                                label: item.name,
                              };
                            })
                          );
                        }}
                      >
                        Изменить
                      </p>
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
            reset();
            setSelectedItems([]);
          }}
        >
          <div className="playlist__form" onClick={(e) => e.stopPropagation()}>
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
                type={"async"}
                loadOptions={getMoviesList}
              />

              <Button text="Создать"></Button>
            </form>
          </div>
        </div>
      )}
      {activePlaylist && !isEditWindow && (
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
      {isEditWindow && (
        <div
          className="playlist__modal"
          onClick={() => {
            setEditWindow(false);
            setActivePlaylist(null);
            setSelectedItems([]);
            reset();
          }}
        >
          {/* <div
            className="playlist__collection"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="collection">
              <div className="collection__img"></div>
            </div>
          </div> */}
          <div className="playlist__form" onClick={(e) => e.stopPropagation()}>
            <form
              action=""
              className="create-form"
              onSubmit={handleSubmit(onEditSubmit)}
            >
              <p className="create-form__title">Изменение плейлиста</p>
              <Input
                placeholder="Введите название"
                name={"name"}
                defaultValue={activePlaylist?.name}
                register={register}
              ></Input>
              <Input
                placeholder="Введите описание"
                name={"description"}
                defaultValue={activePlaylist?.description}
                type="textarea"
                register={register}
              ></Input>
              <Selector
                handleChange={handleChange}
                loadOptions={getMoviesList}
                defaultValues={selectedItems}
                type={"async"}
              />
              <ImageUploader handleFileChange={handleFileChange} isForm />
              <Button text="Сохранить"></Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
