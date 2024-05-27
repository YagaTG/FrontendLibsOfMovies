import { ip } from "../config.server";

export const searchMovies = async (movieName, filters) => {
  let queryString = ``;
  if (filters) {
    if (filters.yearFrom) queryString += `&yearFrom=${filters.yearFrom}`;
    if (filters.yearTo) queryString += `&yearTo=${filters.yearTo}`;
    if (filters.ratingFrom) queryString += `&ratingFrom=${filters.ratingFrom}`;
    if (filters.ratingTo) queryString += `&ratingTo=${filters.ratingTo}`;
  }
  const res = await fetch(
    `http://${ip}:3500/api/searchMovie?movieName=${movieName}${queryString}`
  );
  const movies = await res.json();
  console.log(movies);
  return movies;
};

export const searchUser = async (username) => {
  const res = await fetch(
    `http://${ip}:3500/api/searchUser?username=${username}`
  );
  const users = await res.json();
  return users;
};
