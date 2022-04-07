import React, { useState, useEffect } from "react";
import PuzzleForm from "./puzzle_form";

import ListGroup from 'react-bootstrap/ListGroup';
import { Row, Container, Col, Button } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import WishlistPuzzleCard from "./wishlist_puzzle_card";

function WishListPage({ handleClose, handleShow, show }) {

const [wishListData, setWishListData] = useState([]);

useEffect(() => {
  fetch("http://localhost:9292/wishlist")
    .then(response => response.json())
    .then(data => {
      data.map((puzzle) => {
        puzzle.isRemoved = false;
    })
    setWishListData(data)})
    .catch(error => console.log('error', error));
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
            <PuzzleForm formDefaults={{type: 'Wishlist', postUrl: 'wishlist', inputs: {owned: false}}} show={show} handleClose={handleClose}/>
        </Col>
        </Row>

      <Row>

       <WishlistPuzzleCard wishListPuzzles={wishListData} setWishListPuzzles={setWishListData}/>

      </Row>

    </Container>
  );
}

export default WishListPage;