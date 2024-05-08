const ip = "192.168.0.101";

export const searchMovies = async (movieName) => {
  const res = await fetch(
    `http://${ip}:3500/api/searchMovie?movieName=${movieName}`
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
