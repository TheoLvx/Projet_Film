import React, { useState, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(3);
  const [comments, setComments] = useState("");
  const { dispatch } = useContext(MovieContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    dispatch({ type: "ADD_MOVIE", payload: { title, rating, comments } });
    setTitle("");
    setRating(3);
    setComments("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un film</h2>
      <input type="text" placeholder="Titre du film" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>{star} étoiles</option>
        ))}
      </select>
      <textarea placeholder="Ajouter un commentaire (optionnel)" value={comments} onChange={(e) => setComments(e.target.value)} />
      <button className="btn-primary" type="submit">Ajouter</button>
    </form>
  );
};

export default MovieForm;
