import { useQuery } from "react-query";
import { getMyMoviesRatings } from "../../../api/User";
import { useNavigate } from "react-router-dom";

export const RatingsScreen = ({ user }) => {
  const { isLoading, data: movies } = useQuery("my-ratings-data", () =>
    getMyMoviesRatings(user?.id)
  );
  const navigate = useNavigate();

  const ratingItem = (ratingItem) => {
    return (
      <div className="rating-item">
        <div
          className="rating-item__afisha"
          onClick={() => {
            navigate(`/movie/${ratingItem.movieId}`);
          }}
        >
          <p className="rating-item__name">{ratingItem?.movie.name}</p>
          <span className="rating-item__name">({ratingItem?.movie.year})</span>
        </div>
        <div className="rating-item__rating">{ratingItem?.rating}/10</div>
        <div className="rating-item__rating">
          {ratingItem?.movie.movieRating}/10
        </div>
      </div>
    );
  };

  return (
    <div className="profile__wrapper">
      <h2 className="profile__title">Список просмотренных фильмов</h2>
      <div className="ratings">
        <div className="ratings__header">
          <div className="ratings__col_afisha">Фильм:</div>
          <div className="ratings__col_rate">Ваша оценка:</div>
          <div className="ratings__col_rate">Оценка фильма:</div>
        </div>
        {movies?.length && movies.map((item) => ratingItem(item))}
      </div>
    </div>
  );
};
