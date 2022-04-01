import React, { useState, useEffect } from "react";
import PuzzleForm from "./puzzle_form";

import ListGroup from 'react-bootstrap/ListGroup';
import { Row, Container, Col, Button } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import PuzzleCard from "./puzzle_card";

function WishListPage() {

const [wishListData, setWishListData] = useState([]);
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


useEffect(() => {
  fetch("http://localhost:9292/wishlist")
    .then(response => response.json())
    .then(data => {setWishListData(data)})
    .catch(error => console.log('error', error));
},[])

  return (
    <div>
    <Container>
      <Row>
        <Col className="col-3">
        <h4>Wishlist</h4>
        </Col>
        {/* need to figure out how to stretch the accordian out! */}
        <Col className="user-accordian d-flex justify-content-end col-9">
        <Button className="float-end" variant="secondary" onClick={handleShow}>
              Add a Puzzle to Wishlist
            </Button>
            <PuzzleForm show={show} handleClose={handleClose}/>
        </Col>
        </Row>

      <Row>

       <PuzzleCard wishListPuzzles={wishListData}/>

      </Row>

    </Container>
  </div>
  );
}

export default WishListPage;