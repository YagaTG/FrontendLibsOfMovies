import { useState } from "react";
import { Header } from "../../components/Header/Header";
import "./style.scss";
import Button from "../../ui/Button/Button";
import { useQuery } from "react-query";
import { createPost, getAllPosts } from "../../api/Posts";
import { PostItem } from "../../components/PostItem/PostItem";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input/Input";
import { Selector } from "../../ui/Selector/Selector";
import { searchMovies } from "../../helpers/search";

export const FeedPage = () => {
  const { data: posts } = useQuery("posts", () => getAllPosts());
  const [isCreatePostWindow, setCreatePostWindow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const form = useForm();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const { register, handleSubmit, reset } = form;
  const onSubmit = (data) => {
    // console.log(data);
    createPost(user.id, data.title, data.text, selectedMovie.id);
  };

  const getMoviesList = async (searchValue, callback) => {
    // const res = await
    const data = await searchMovies(searchValue);
    console.log(data);
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

  const handleMovieSelect = (selectedOption) => {
    console.log("handleChange", selectedOption);
    setSelectedMovie(selectedOption);
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* <h1 className="feed-title">Лента</h1> */}
        {user && user.id && (
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
