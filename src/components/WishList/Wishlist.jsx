import React, { useContext, useState } from "react";
import { WishlistContext } from "../../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, dispatch } = useContext(WishlistContext);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6; // 🔥 9 films par page

  const removeFromWishlist = (id) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  };

  const totalPages = Math.ceil(wishlist.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const selectedMovies = wishlist.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div>
      <h2>🎥 Ma Wishlist</h2>
      {wishlist.length === 0 ? <p>Aucun film dans votre wishlist.</p> : null}
      <div className="movie-grid">
        {selectedMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <button className="btn-danger" onClick={() => removeFromWishlist(movie.id)}>
              Retirer
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {wishlist.length > moviesPerPage && (
        <div className="pagination">
          <button className="btn-primary" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            ⬅ Précédent
          </button>
          <span>Page {currentPage} / {totalPages}</span>
          <button className="btn-primary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Suivant ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;