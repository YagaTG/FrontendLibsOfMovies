import { useState } from "react";
import { Header } from "../../components/Header/Header";
import "./style.scss";
import Button from "../../ui/Button/Button";

export const FeedPage = () => {
  const [posts, setPosts] = useState([1]);
  return (
    <>
      <Header />
      <div className="container">
        <h1 className="feed-title">Лента</h1>
        <Button text="Создать запись" color="black" />
        <div className="posts">
          {posts.map((post) => {
            return (
              <div className="post">
                <p className="post__author">yagatg</p>
                <div className="post__content">
                  <div className="post__title">Тестовое название</div>
                  <div className="post__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore perferendis, quos, distinctio totam minus ea
                    provident vitae aliquid praesentium cupiditate, alias
                    doloremque. Cupiditate iusto quibusdam eum possimus non
                    temporibus harum!
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
