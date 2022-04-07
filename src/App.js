// move handleFormInputs function to the top level

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from './navbar.js';
import UserPage from "./users_base_page.js";
import PuzzlePage from "./puzzle_base_page.js";
import WishListPage from "./wishlist_base_page.js";
import ReviewPage from "./review_base_page.js";
import HomePage from "./home.js";
import './App.css';

function App() {

  // modal show/hide functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Navigation />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/collection" element={<PuzzlePage handleClose={handleClose} handleShow={handleShow} show={show}/>} />
          <Route path="/wishlist" element={<WishListPage handleClose={handleClose} handleShow={handleShow} show={show}/>} />
          <Route path="/review/:id" element={<ReviewPage handleClose={handleClose} handleShow={handleShow} show={show}/>} />
          <Route path="/users" element={<UserPage handleClose={handleClose} handleShow={handleShow} show={show}/>} />
        </Routes>
    </div>
  );
}

export default App;
