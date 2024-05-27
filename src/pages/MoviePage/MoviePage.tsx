import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import Button from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { getMovie, getMovieRating, ratingMovie } from "../../api/Movie";
import { useParams } from "react-router-dom";
import { createComment, getMovieComments } from "../../api/Comment";
import { createReview, getMovieReviews } from "../../api/Review";
import { useUser } from "../../hooks/useUser";
import { UserAvatar } from "../../components/UserAvatar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "./style.scss";

import { Pagination } from "swiper/modules";
import { useQuery } from "react-query";
import { useForm, useFieldArray } from "react-hook-form";

export default function MoviePage() {
  const { isLoading: isRatingLoading, data: prevRating } = useQuery(
    "movieRating",
    () =>
      getMovieRating(JSON.parse(localStorage.getItem("userData")).id, movieId)
  );
  const { isLoading, data: movie } = useQuery("movieData", () =>
    getMovie(movieId)
  );
  const { data: reviews } = useQuery("reviews", () => getMovieReviews(movieId));
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [currentRating, setCurrentRating] = useState(null);
  const [isCreateReviewWindow, setCreateReviewWindow] = useState(false);
  const { movieId } = useParams();

  const form = useForm({
    defaultValues: {
      reviewText: "",
      reviewPlus: [],
      reviewMinus: [],
    },
  });
  const { register, reset, handleSubmit, control } = form;
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "reviewPlus", // unique name for your Field Array
  });
  const { fields: fieldsMinuses, append: appendMinus } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "reviewMinus", // unique name for your Field Array
  });
  useEffect(() => {
    console.log(movieId);
    getMovieComments(movieId, setComments);
  }, []);

  const handleRating = () => {
    if (true && currentRating) {
      ratingMovie(
        JSON.parse(localStorage.getItem("userData")).id,
        movieId,
        currentRating
      ).then(() => {
        console.log(1);
      });
    } else {
      // TODO: сделать модальное окно, предлагающее авторизацию
      return;
    }
  };

  const handleCreateComment = () => {
    console.log(userData);
    if (true) {
      createComment(movieId, userData.id, commentText);
    }
  };
  // review component

  const checkLogin = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setCreateReviewWindow(true);
    } else {
      console.log("Unlogin");
    }
  };

  const onSubmit = (data) => {
    const pluses = [...data.reviewPlus];
    const onlyFilledPlus = pluses.filter((item) => item.plus.trim());
    const minuses = [...data.reviewMinus];
    const onlyFilledMinus = minuses.filter((item) => item.minus.trim());
    createReview(
      JSON.parse(localStorage.getItem("userData")).id,
      movieId,
      data.reviewText,
      onlyFilledPlus,
      onlyFilledMinus
    );
    setCreateReviewWindow(false);
    reset();
  };
  //comments component

  if (isLoading) {
    return <h2 style={{ color: "black" }}>Loading..</h2>;
  }
  return (
    <>
      <Header></Header>
      <div className="movie-container">
        <div className="movie-wrapper">
          <div className="movie-row">
            <div className="movie__afisha">
              {/* <img className="movie__img" src={`${movie?.img}`} alt={`Постер фильма ${movie?.name}`}/> */}
              <img
                className="movie__img"
                src={`/movies/${movie?.img}`}
                alt={`Постер фильма ${movie?.name}`}
              />
              <Button isDarkBackground text={"Смотреть позже"}></Button>
            </div>
            <div className="movie__info">
              <div className="description">
                <div className="movie__title">
                  {movie?.name} ({movie.year})
                </div>
                <div className="movie__rating">{movie?.rating}/10</div>

                <div className="description__text">{movie?.description}</div>
              </div>
              {prevRating ? (
                <div>
                  <p>Ваша оценка {prevRating.rating}</p>
                  <Button
                    isDarkBackground
                    text="Изменить"
                    onClick={handleRating}
                  />
                </div>
              ) : (
                <div>
                  <input
                    type="number"
                    onChange={(e) => {
                      setCurrentRating(e.currentTarget.value);
                    }}
                  ></input>
                  <Button
                    isDarkBackground
                    text="Оценить"
                    onClick={handleRating}
                  />
                </div>
              )}
              <Swiper
                slidesPerView={3}
                className="screenshots"
                spaceBetween={24}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
              >
                <SwiperSlide className="screenshots__slide">
                  <video
                    src={`http://192.168.0.198:3500/api/getTrailer`}
                    width={"100%"}
                    height={200}
                    controls
                    controlsList="nodownload"
                  >
                    <p style={{ color: "white" }}>Браузер не поддерживает</p>
                  </video>
                </SwiperSlide>
                <SwiperSlide className="screenshots__slide">
                  <img
                    src="/movies/test1.jpg"
                    alt=""
                    className="screenshots__img"
                  />
                </SwiperSlide>
                <SwiperSlide className="screenshots__slide">
                  <img
                    src="/movies/drive.jpg"
                    alt=""
                    className="screenshots__img"
                  />
                </SwiperSlide>
                <SwiperSlide className="screenshots__slide">
                  <img
                    src="/movies/drive.jpg"
                    alt=""
                    className="screenshots__img"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        <div className="movie-row">
          <div className="reviews">
            <div className="reviews__title">Отзывы:</div>

            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              {reviews?.length ? (
                reviews.map((review) => {
                  return (
                    <SwiperSlide className="review">
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
                      {/* <div className="review__reacting">
                        <div className="review__reacting_likes">35</div>
                        <div className="review__reacting_dislikes">20</div>
                      </div> */}
                      {/* <div className="review__btn review__btn_next"></div> */}
                    </SwiperSlide>
                  );
                })
              ) : (
                <p className="reviews__empty">Отзывов нет</p>
              )}
            </Swiper>
            <Button
              text="Написать отзыв"
              isDarkBackground
              onClick={checkLogin}
            />
          </div>
          <div className="actors">
            <div className="reviews__title">Актёры:</div>
          </div>
        </div>
      </div>
      <div className="movie__comments">
        <div className="comments__heading">Комментарии:</div>
        <div className="comments__form">
          <textarea
            name=""
            id=""
            className="comments__input"
            placeholder="Оставьте ваш комментарий"
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <Button
            color="white"
            text={"Отправить"}
            onClick={handleCreateComment}
            // isDisable={commentText}
          ></Button>
        </div>
        <div className="comments__comments">
          {comments &&
            comments.map((comment) => {
              return (
                <div className="comment">
                  <div className="comment__user">
                    <UserAvatar
                      username={comment?.user.username}
                      className="comment__avatar"
                    ></UserAvatar>
                    <div className="comment__nickname">
                      {comment?.user.username}
                    </div>
                  </div>
                  <div className="comment__text">{comment?.text}</div>
                </div>
              );
            })}
        </div>
        {isCreateReviewWindow && (
          <div
            className="playlist__modal"
            onClick={() => {
              setCreateReviewWindow(false);
              reset();
            }}
          >
            <form
              className="review-form"
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="review-form__title">Ваш отзыв:</p>
              <Input
                type={"textarea"}
                register={register}
                placeholder="Введите текст"
                name="reviewText"
              ></Input>
              <p className="review-form__title">Достоинства:</p>

              {fields.map((field, index) => {
                return (
                  <div className="row review-form__field" key={field.id}>
                    <p className="review-form__point">+</p>
                    <Input
                      // type={"textarea"}
                      register={register}
                      placeholder="Введите текст"
                      name={`reviewPlus.${index}.plus`}
                    ></Input>
                  </div>
                );
              })}
              <Button
                type={"button"}
                text="Добавить"
                onClick={() => append({ plus: "" })}
              ></Button>
              <p className="review-form__title">Недостатки:</p>
              {fieldsMinuses.map((field, index) => {
                return (
                  <div className="row review-form__field" key={field.id}>
                    <p className="review-form__point">-</p>
                    <Input
                      // type={"textarea"}
                      register={register}
                      placeholder="Введите текст"
                      name={`reviewMinus.${index}.minus`}
                    ></Input>
                  </div>
                );
              })}
              <Button
                type={"button"}
                text="Добавить"
                onClick={() => appendMinus({ minus: "" })}
              ></Button>

              <Button text="Отправить" />
            </form>
          </div>
        )}
      </div>
    </>
  );
}
