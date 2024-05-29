import { ip } from "../config.server";

export const MovieAfisha = ({ path, movieName, className }) => {
  console.log(path);
  return (
    <img
      className={className}
      src={`http://${ip}:3500/api/getMovieAfisha?path=${path}`}
      alt={`Постер фильма ${movieName}`}
    />
  );
};
