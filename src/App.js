import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from './navbar.js';
import UserPage from "./users_base_page.js";
import PuzzlePage from "./puzzle_base_page.js";
import ReviewPage from "./review_base_page.js";
import HomePage from "./home.js";
import './App.css';

function App() {

  // modal show/hide functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // format dates from database
  function formatDate(dateFromData){
    let parsed_join_date;
    let date = new Date(dateFromData);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return parsed_join_date = month+'-' + dt + '-'+year
  }

  return (
    <div>
      <Navigation />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/collection" element={<PuzzlePage handleClose={handleClose} handleShow={handleShow} show={show} pathname={"Collection"}/>} />
          <Route path="/wishlist" element={<PuzzlePage handleClose={handleClose} handleShow={handleShow} show={show} pathname={"Wishlist"}/>} />
          <Route path="/review/:id" element={<ReviewPage handleClose={handleClose} handleShow={handleShow} show={show}/>} />
          <Route path="/users" element={<UserPage handleClose={handleClose} handleShow={handleShow} show={show} formatDate={formatDate}/>} />
        </Routes>
    </div>
  );
}

export default App;
