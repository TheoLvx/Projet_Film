import React, { useState, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";

const MovieItem = ({ movie }) => {
  const { dispatch } = useContext(MovieContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(movie.title);
  const [rating, setRating] = useState(movie.rating);
  const [comments, setComments] = useState(movie.comments);

  const handleSave = () => {
    dispatch({ type: "UPDATE_MOVIE", payload: { id: movie.id, title, rating, comments } });
    setIsEditing(false);
  };

  return (
    <div className="movie-card">
      {isEditing ? (
        <>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star} étoiles</option>
            ))}
          </select>
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
          <button className="btn-primary" onClick={handleSave}>Sauvegarder</button>
          <button onClick={() => setIsEditing(false)}>Annuler</button>
        </>
      ) : (
        <>
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-rating">Note : {"⭐".repeat(movie.rating)} ({movie.rating}/5)</p>
          {movie.comments && <p className="movie-comments">{movie.comments}</p>}
          
          <div className="button-group">
            <button className="btn-primary" onClick={() => setIsEditing(true)}>Modifier</button>
            <button className="btn-danger" onClick={() => dispatch({ type: "DELETE_MOVIE", payload: movie.id })}>
              Supprimer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieItem;
