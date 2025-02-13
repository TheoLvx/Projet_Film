import React, { useEffect, useState, useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";

const LatestMovies = () => {
  const [movies, setMovies] = useState([]);
  const { wishlist, dispatch } = useContext(WishlistContext);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6; 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=b1a9599cd6a10753deacd3b29a039e88&language=fr-FR&page=${currentPage}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };
    fetchMovies();
  }, [currentPage]);

  const addToWishlist = (movie) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: movie });
  };

  return (
    <div>
      <h2>🎬 Dernières sorties</h2>
      <div className="movie-grid">
        {movies.slice(0, moviesPerPage).map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <button
              className="btn-primary"
              onClick={() => addToWishlist(movie)}
              disabled={wishlist.some((m) => m.id === movie.id)}
            >
              {wishlist.some((m) => m.id === movie.id) ? "Déjà ajouté" : "Ajouter à la Wishlist"}
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="btn-primary" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          ⬅ Précédent
        </button>
        <span>Page {currentPage}</span>
        <button className="btn-primary" onClick={() => setCurrentPage(currentPage + 1)}>
          Suivant ➡
        </button>
      </div>
    </div>
  );
};

export default LatestMovies;