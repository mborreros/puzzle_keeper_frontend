import React, { useState, useEffect } from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import WishlistPuzzleCard from "./wishlist_puzzle_card";
import PuzzleForm from "./puzzle_form";

function WishListPage({ handleClose, handleShow, show }) {

const [wishListData, setWishListData] = useState([]);

useEffect(() => {
  fetch("http://localhost:9292/wishlist")
  .then(response => response.json())
  .then(data => {
    data.map((puzzle) => {
      // addes isRemoved property to each puzzle in order to toggle removal within the individual puzzle cards
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
            {/* passes owned: false as a prop to the shared PuzzleForm, the only input which differentiates Collection vs WishList puzzles within the database */}
            <PuzzleForm formDefaults={{type: 'Wishlist', postUrl: 'wishlist', inputs: {owned: false}}} show={show} handleClose={handleClose} puzzleData={wishListData} setPuzzleData={setWishListData}/>
        </Col>
        </Row>

      <Row>

       <WishlistPuzzleCard wishListPuzzles={wishListData} setWishListPuzzles={setWishListData}/>

      </Row>

    </Container>
  );
}

export default WishListPage;