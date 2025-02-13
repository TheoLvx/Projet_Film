import React, { useContext, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import MovieItem from "./MovieItem";
import MovieForm from "./MovieForm"; 

const MovieList = () => {
  const { movies } = useContext(MovieContext);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const filteredMovies = movies.filter((movie) => {
    if (filter === "4plus") return movie.rating >= 4;
    if (filter === "3") return movie.rating === 3;
    if (filter === "2moins") return movie.rating <= 2;
    return true;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortOrder === "az") return a.title.localeCompare(b.title); 
    if (sortOrder === "za") return b.title.localeCompare(a.title); 
    if (sortOrder === "best") return b.rating - a.rating; 
    if (sortOrder === "worst") return a.rating - b.rating; 
    return 0; 
  });

  return (
    <div>
      <h2>📜 Ma Liste de Films</h2>

      <MovieForm />

      <label>
        Filtrer par note :
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tous les films</option>
          <option value="4plus">4 étoiles et plus</option>
          <option value="3">3 étoiles</option>
          <option value="2moins">2 étoiles et moins</option>
        </select>
      </label>

      <label>
        Trier par :
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Par défaut</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="best">Meilleure note</option>
          <option value="worst">Pire note</option>
        </select>
      </label>

      {sortedMovies.length > 0 ? (
        <div className="movie-grid">
          {sortedMovies.map((movie) => <MovieItem key={movie.id} movie={movie} />)}
        </div>
      ) : (
        <p>Aucun film trouvé.</p>
      )}
    </div>
  );
};

export default MovieList;
