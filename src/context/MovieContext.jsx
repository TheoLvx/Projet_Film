import React, { createContext, useReducer, useEffect } from "react";

export const MovieContext = createContext();

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
      return action.payload; 
    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [movies, dispatch] = useReducer(movieReducer, [], () => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <MovieContext.Provider value={{ movies, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
