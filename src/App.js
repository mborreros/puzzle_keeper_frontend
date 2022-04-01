import React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from './navbar.js';
import UserPage from "./users_base_page.js";
import PuzzlePage from "./puzzle_base_page.js";
import WishListPage from "./wishlist_base_page.js";
import ReviewsPage from "./reviews_base_page.js";
import HomePage from "./home.js";
import './App.css';

function App() {
  return (
    <div>
      <Navigation />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/collection" element={<PuzzlePage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/users" element={<UserPage />} />
        </Routes>
    </div>
  );
}

export default App;
