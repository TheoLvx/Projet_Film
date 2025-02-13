import React from "react";
import { MovieProvider } from "./context/MovieContext";
import { WishlistProvider } from "./context/WishlistContext";
import Home from "./pages/Home"; // ✅ Vérifie bien l'importation
import "./App.css";

const App = () => {
  return (
    <WishlistProvider>
      <MovieProvider>
        <Home /> 
      </MovieProvider>
    </WishlistProvider>
  );
};

export default App;
