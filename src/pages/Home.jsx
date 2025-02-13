import React, { useState } from "react";
import MovieList from "../components/Movie/MovieList";
import LatestMovies from "../components/WishList/LatestMovies";
import Wishlist from "../components/WishList/Wishlist";

const Home = () => {
  const [view, setView] = useState("movies");

  return (
    <div className="container">
      <h1>🎥 Gestion des Films</h1>
      <div className="menu">
        <button className="btn-primary" onClick={() => setView("movies")}>📜 Ma Liste</button>
        <button className="btn-primary" onClick={() => setView("wishlist")}>⭐ Wishlist</button>
        <button className="btn-primary" onClick={() => setView("latest")}>🎬 Dernières Sorties</button>
      </div>
      {view === "movies" && <MovieList />}
      {view === "wishlist" && <Wishlist />}
      {view === "latest" && <LatestMovies />}
    </div>
  );
};

export default Home;
