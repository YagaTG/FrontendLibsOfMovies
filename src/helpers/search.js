const ip = "192.168.0.101";

export const searchMovies = async (movieName) => {
  const res = await fetch(
    `http://${ip}:3500/api/searchMovie?movieName=${movieName}`
  );
  const movies = await res.json();
  console.log(movies);
  return movies;
};

export const searchUsers = async (username) => {
  const res = await fetch(
    `http://${ip}:3500/api/searchUsers?username=${username}`
  );
  const users = await res.json();
  console.log(movies);
  return users;
};
