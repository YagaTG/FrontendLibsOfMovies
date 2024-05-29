import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import Button from "../../ui/Button/Button";
import { Movie, getAllMovies } from "../../api/Movie";
import "./style.scss";
import { Search } from "../../ui/Search/Search";
import { searchMovies } from "../../helpers/search";
import { Selector } from "../../ui/Selector/Selector";
import { MovieAfisha } from "../../components/MovieAfisha";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    getAllMovies(setMovies);
  }, []);

  const handleFindedMovies = (findedMovies, searchText) => {
    setMovies(findedMovies);
    setSearchString(searchText);
  };

  const movieItem = (movieData: Movie) => {
    return (
      <div className="movies__item" key={movieData.id}>
        <a className="movieItem" href={`movie/${movieData.id}`}>
          <MovieAfisha
            path={movieData.img}
            movieName={movieData.name}
            className="movieItem__picture"
          />
          <div className="movieItem_hover">
            <div className="movieItem_hover_content">
              Оценка: {movieData.rating}/10
            </div>
          </div>
        </a>
        <div className="movieItem__handlers">
          <div className="movieItem__title">
            {movieData.name} ({movieData.year})
          </div>
        </div>
      </div>
    );
  };

  const SORTS = [
    { value: "yearUpper", label: "По году выхода ↑" },
    { value: "yearLower", label: "По году выхода ↓" },
    { value: "ratingUpper", label: "По оценке ↑" },
    { value: "ratingLower", label: "По оценке ↓" },
  ];

  const sortMovie = (e) => {
    let sortedMovies = [];
    switch (e.value) {
      case "yearUpper": {
        sortedMovies = [...movies].sort((a, b) => {
          return a.year - b.year;
        });
        break;
      }
      case "yearLower": {
        sortedMovies = [...movies].sort((a, b) => {
          return b.year - a.year;
        });
        break;
      }
      case "ratingUpper": {
        sortedMovies = [...movies].sort((a, b) => {
          return a.rating - b.rating;
        });
        break;
      }
      case "ratingLower": {
        sortedMovies = [...movies].sort((a, b) => {
          return b.rating - a.rating;
        });
        break;
      }
      default:
        return;
    }

    setMovies(() => sortedMovies);
  };

  const filteringMovie = async () => {
    const filteredMovies = await searchMovies(searchString, filters);
    setMovies(filteredMovies);
  };

  return (
    <>
      <Header></Header>
      <div className="container">
        <Search
          handleData={handleFindedMovies}
          searchFunc={searchMovies}
          filters={filters}
        />
        <div className="sort-handlers row">
          <Selector defaultOptions={SORTS} handleChange={sortMovie}></Selector>
          {/* <Selector defaultOptions={options}></Selector> */}
        </div>
        <div className="movies-wrapper">
          <div className="filters">
            <p className="filters__title">Фильтры:</p>
            <div className="filters__filter">
              <div className="filters__sub-title">По годам:</div>
              <div className="filters__row">
                C:{" "}
                <input
                  type="number"
                  className="filters__input"
                  onChange={(e) =>
                    setFilters({ ...filters, yearFrom: e.target.value })
                  }
                />
              </div>
              <div className="filters__row">
                До:{" "}
                <input
                  type="number"
                  className="filters__input"
                  onChange={(e) =>
                    setFilters({ ...filters, yearTo: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="filters__filter">
              <div className="filters__sub-title">По оценке:</div>
              <div className="filters__row">
                C:{" "}
                <input
                  type="number"
                  className="filters__input"
                  onChange={(e) =>
                    setFilters({ ...filters, ratingFrom: e.target.value })
                  }
                />
              </div>
              <div className="filters__row">
                До:{" "}
                <input
                  type="number"
                  className="filters__input"
                  onChange={(e) =>
                    setFilters({ ...filters, ratingTo: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="filters__filter">
              <div className="filters__sub-title">Жанры:</div>
            </div>
            <Button text="Показать" onClick={filteringMovie} />
          </div>
          <div className="movies">
            {movies.map((movie) => {
              return movieItem(movie);
            })}
          </div>
        </div>
      </div>
    </>
  );
}
