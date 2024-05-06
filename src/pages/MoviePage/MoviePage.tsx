import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import { getMovie } from "../../api/Movie";
import { json, useParams } from "react-router-dom";
import { createComment, getMovieComments } from "../../api/Comment";
import { getMovieReviews } from "../../api/Review";
import { useUser } from "../../hooks/useUser";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';

import "./style.scss";

import { Pagination } from 'swiper/modules';

export default function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [ratingMovie, setRatingMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    console.log(movieId);
    getMovie(movieId, setMovie);
    getMovieReviews(movieId, setReviews);
    getMovieComments(movieId, setComments);
  }, []);
  const { checkLogin } = useUser();
  const handleCreateComment = () => {
    const userData = checkLogin();
    console.log(userData);
    if (userData) {
      createComment(movieId, userData.id, commentText, userData.username);
    }
  };
  // review component

  //comments component

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
                <div className="movie__title">{movie?.name}</div>
                <div className="movie__rating">{movie?.rating}/10</div>

                <div className="description__text">{movie?.description}</div>
              </div>
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
                    src={`http://192.168.0.101:3500/api/getTrailer`}
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
            {reviews.map((review) => {
              return <></>;
            })}
            <div className="review">
              <div className="review__user">
                <div className="review__login">{reviews[0]?.username}</div>
                <div className="review__rating">{reviews[0]?.rating}/10</div>
              </div>
              <div className="review__text">{reviews[0]?.text}</div>
              <div className="review__reacting">
                <div className="review__reacting_likes">35</div>
                <div className="review__reacting_dislikes">20</div>
              </div>
              <div className="review__btn review__btn_next"></div>
            </div>
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
            isDisable={commentText}
          ></Button>
        </div>
        <div className="comments__comments">
          {comments &&
            comments.map((comment) => {
              return (
                <div className="comment">
                  <div className="comment__user">
                    <div className="comment__avatar"></div>
                    <div className="comment__nickname">
                      {comment?.authorUsername}
                    </div>
                  </div>
                  <div className="comment__text">{comment?.text}</div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
