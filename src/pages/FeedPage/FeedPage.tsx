import { useState } from "react";
import { Header } from "../../components/Header/Header";
import Button from "../../ui/Button/Button";
import { useQuery } from "react-query";
import { createPost, getAllPosts } from "../../api/Posts";
import { PostItem } from "../../components/PostItem/PostItem";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input/Input";
import { Selector } from "../../ui/Selector/Selector";
import { searchMovies } from "../../helpers/search";
import { useUser } from "../../hooks/useUser";

import "./style.scss";
import { useNotify } from "../../hooks/useNotify";

export const FeedPage = () => {
  const { data: posts, refetch: postsRefetch } = useQuery("posts", () =>
    getAllPosts()
  );
  const [isCreatePostWindow, setCreatePostWindow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const form = useForm();
  const { notify } = useNotify();
  const { user } = useUser();
  const { register, handleSubmit, reset } = form;
  const onSubmit = (data) => {
    createPost(user.id, data.title, data.text, selectedMovie?.id).then(
      (data) => {
        if (data.message == "success") {
          notify("Запись успешно создана!");
        }
        setSelectedMovie(null);
        setCreatePostWindow(false);
        postsRefetch();
      }
    );
  };

  const getMoviesList = async (searchValue, callback) => {
    const data = await searchMovies(searchValue);
    const moviess = data.map((item) => {
      return { value: item.name, label: item.name, id: item.id };
    });

    const filteredMovies = moviess.filter((item) => {
      return item.label.toLowerCase().includes(searchValue.toLowerCase());
    });
    callback(filteredMovies);
  };

  const handleMovieSelect = (selectedOption) => {
    console.log("handleChange", selectedOption);
    setSelectedMovie(selectedOption);
  };

  return (
    <>
      <Header />
      <div className="container">
        {user && (
          <Button
            text="Создать запись"
            onClick={() => setCreatePostWindow(true)}
          />
        )}
        <div className="posts">
          {posts && posts.length ? (
            posts.map((post) => {
              return <PostItem data={post} />;
            })
          ) : (
            <p className="posts__empty">Записей не найдено</p>
          )}
        </div>
      </div>
      {isCreatePostWindow && (
        <div
          className="modal"
          onClick={() => {
            setCreatePostWindow(false);
            reset();
          }}
        >
          <form
            action=""
            className="create-post__form"
            onSubmit={handleSubmit(onSubmit)}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="create-post__title">Создание записи</p>
            <div className="create-post__field">
              <Input
                placeholder="Введите название записи"
                name="title"
                register={register}
              ></Input>
            </div>
            <div className="create-post__field">
              <Input
                type="textarea"
                placeholder="Описание..."
                name="text"
                register={register}
              ></Input>
            </div>
            <div className="create-post__field">
              <Selector
                type="single-async"
                loadOptions={getMoviesList}
                handleChange={handleMovieSelect}
              ></Selector>
            </div>

            <Button text="Создать" />
          </form>
        </div>
      )}
    </>
  );
};
