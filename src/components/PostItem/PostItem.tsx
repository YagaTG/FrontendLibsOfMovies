import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { UserAvatar } from "../UserAvatar";

export const PostItem = ({ data }) => {
  return (
    <div className="post">
      <UserAvatar username={data.user.username}></UserAvatar>
      <p className="post__author">{data.user.username}</p>
      <div className="post__content">
        <div className="post__header">
          <p className="post__title">{data.title}</p>
          <p className="post__date">
            {format(new Date(data.createdAt), "H:mm dd-MM-yyyy")}
          </p>
        </div>
        <div className="post__text">{data.text}</div>
        {data.movie && (
          <a className="post__movie" href={`/movie/${data.movieId}`}>
            <div className="post__movie-name">
              {data.movie.name} ({data.movie.year})
            </div>
          </a>
        )}
      </div>
    </div>
  );
};
