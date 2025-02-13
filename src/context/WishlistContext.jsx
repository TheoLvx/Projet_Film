import React, { createContext, useReducer, useEffect } from "react";

export const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return [...state, action.payload];
    case "REMOVE_FROM_WISHLIST":
      return state.filter((movie) => movie.id !== action.payload);
    case "SET_WISHLIST":
      return action.payload; // Charger depuis localStorage
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [], () => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // Sauvegarde en localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};
