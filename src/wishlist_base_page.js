import React, { useState, useEffect } from "react";
import PuzzleForm from "./puzzle_form";

import ListGroup from 'react-bootstrap/ListGroup';
import { Row, Container, Col, Button } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import WishlistPuzzleCard from "./wishlist_puzzle_card";

function WishListPage({ handleClose, handleShow, show }) {

const [wishListData, setWishListData] = useState([]);

// data fetch is defined outside of useEffect to allow for the page to fetch updated data upon form submission
async function fetchWishlistData() {
  fetch("http://localhost:9292/wishlist")
    .then(response => response.json())
    .then(data => {
      data.map((puzzle) => {
        puzzle.isRemoved = false;
    })
    setWishListData(data)})
    .catch(error => console.log('error', error));
}

useEffect(() => {
  fetchWishlistData()
},[])

  return (
    <Container>
      <Row>
        <Col>
        <h4 className="page-title">Wishlist</h4>
        </Col>
        <Col>
            <Button className="float-end" variant="secondary" onClick={handleShow}>
              Add a Puzzle to the Wishlist
            </Button>
            <PuzzleForm formDefaults={{type: 'Wishlist', postUrl: 'wishlist', inputs: {owned: false}}} show={show} handleClose={handleClose} fetchPuzzles={fetchWishlistData}/>
        </Col>
        </Row>

      <Row>

       <WishlistPuzzleCard wishListPuzzles={wishListData} setWishListPuzzles={setWishListData}/>

      </Row>

    </Container>
  );
}

export default WishListPage;