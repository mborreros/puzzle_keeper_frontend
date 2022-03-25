import React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from './navbar.js';
import UserPage from "./users_base_page.js";
import PuzzlePage from "./puzzle_base_page.js";
import ReviewsPage from "./reviews_base_page.js";
import HomePage from "./home.js";
import './App.css';

function App() {
  return (
    <div>
      <Navigation />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/puzzles" element={<PuzzlePage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/users" element={<UserPage />} />
        </Routes>
    </div>
  );
}

export default App;
