import React, { createContext, useReducer, useEffect } from "react";

// Création du contexte
export const MovieContext = createContext();

// Définition des actions pour le reducer
const movieReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return [...state, { ...action.payload, id: Date.now() }];
    case "UPDATE_MOVIE":
      return state.map((movie) =>
        movie.id === action.payload.id ? action.payload : movie
      );
    case "DELETE_MOVIE":
      return state.filter((movie) => movie.id !== action.payload);
    case "SET_MOVIES":
      return action.payload; // Chargement des films depuis localStorage
    default:
      return state;
  }
};

// Provider avec `useReducer` et `useEffect`
export const MovieProvider = ({ children }) => {
  const [movies, dispatch] = useReducer(movieReducer, [], () => {
    // Récupérer les films depuis localStorage au démarrage
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <MovieContext.Provider value={{ movies, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
