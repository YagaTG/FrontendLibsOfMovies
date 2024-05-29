import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { getAllReviews, publishReview } from "../../api/Review";
import { useNavigate } from "react-router-dom";
import { checkOnAdmin } from "../../api/User";
import { Input } from "../../ui/Input/Input";

import "./style.scss";
import Button from "../../ui/Button/Button";
import { ImageUploader } from "../../ui/ImageUploader/ImageUploader";
import { createMovie, uploadMovieImage } from "../../api/Movie";

export const AdminPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    checkOnAdmin().then((res) => (res ? null : navigate("/movies")));
  }, []);
  const [currentTab, setCurrentTab] = useState("movies");
  const [image, setImage] = useState(null);
  const { register, handleSubmit } = useForm();
  const { data: reviews } = useQuery("admin-reviews", () => getAllReviews());

  const applyReview = (item) => {};

  const onSubmit = (data) => {
    console.log(data);
    createMovie(data).then((res) => {
      console.log(res);
      if (image) {
        uploadMovieImage(image, res.id);
      } else return;
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      console.log(data);
      setImage(data);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__tabs">
        <div
          className={`admin-panel__tab ${
            currentTab == "movies" ? "admin-panel__tab_active" : ""
          }`}
          onClick={() => setCurrentTab("movies")}
        >
          Фильмы
        </div>
        <div
          className={`admin-panel__tab ${
            currentTab == "reviews" ? "admin-panel__tab_active" : ""
          }`}
          onClick={() => setCurrentTab("reviews")}
        >
          Отзывы:
        </div>
      </div>
      {currentTab == "movies" && (
        <div className="admin-panel__movies">
          <form
            action=""
            className="create-movie__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="create-movie__field">
              <Input
                placeholder="Введите название фильма"
                name="name"
                register={register}
              ></Input>
            </div>
            <div className="create-movie__field">
              <Input
                type="textarea"
                placeholder="Введите описание фильма"
                name="description"
                register={register}
              ></Input>
            </div>
            <div className="create-movie__field">
              <Input
                placeholder="Введите год создания"
                name="year"
                register={register}
              ></Input>
            </div>
            <ImageUploader
              handleFileChange={handleFileChange}
              isForm
            ></ImageUploader>
            <Button text="Создать"></Button>
          </form>
        </div>
      )}
      {currentTab == "reviews" && (
        <div className="admin-panel__reviews">
          {reviews &&
            reviews.length &&
            reviews.map(
              (review) =>
                !review.isPublished && (
                  <div className="review admin-panel__review">
                    <div className="review__user">
                      <div className="review__login">
                        {review?.user.username}
                      </div>
                      <div className="review__rating">{/* {reviews */}</div>
                    </div>
                    <div className="review__text">{review.text}</div>
                    <div className="review__list">
                      <p className="review__title">Достоинства:</p>
                      {review.dignities.map((plus) => (
                        <div className="review__plus">{plus.plus}</div>
                      ))}
                    </div>
                    <div className="review__list">
                      <p className="review__title">Недостатки:</p>
                      {review.disadvantages.map((minus) => (
                        <div className="review__minus">{minus.minus}</div>
                      ))}
                    </div>
                    <Button
                      text="Одобрить"
                      isDarkBackground
                      onClick={() => {
                        publishReview(review.id);
                      }}
                    />
                    {/* <div className="review__reacting">
                        <div className="review__reacting_likes">35</div>
                        <div className="review__reacting_dislikes">20</div>
                      </div> */}
                    {/* <div className="review__btn review__btn_next"></div> */}
                  </div>
                )
            )}
        </div>
      )}
    </div>
  );
};
