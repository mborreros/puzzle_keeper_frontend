import React, { useState, useEffect } from "react";
import PuzzleForm from "./puzzle_form";
import CollectionPuzzleCard from "./collection_puzzle_card";
import WishlistPuzzleCard from "./wishlist_puzzle_card";
import { Row, Container, Col, Button } from "react-bootstrap";

function PuzzlePage({ handleClose, handleShow, show, pathname }) {

  const [ puzzleData, setPuzzleData ] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/${pathname.toLowerCase()}`)
    // fetch("http://localhost:9292/collection")
      .then(response => response.json())
      .then(data => {
        data.map((puzzle) => {
          // addes isRemoved property to each puzzle in order to toggle removal within the individual puzzle cards
          puzzle.isRemoved = false;
      })
      setPuzzleData(data)})
      .catch(error => console.log('error', error));
  },[])

  return (
    <Container>
      <Row>
        <Col>
        <h4 className="page-title">Collection</h4>
        </Col>
        <Col>
            <Button className="float-end" variant="secondary" onClick={handleShow}>
              Add a Puzzle to the Collection
            </Button>
            {/* passes owned: true or false as a prop to the shared PuzzleForm, the only input which differentiates Collection vs WishList puzzles within the database */}
            {pathname == "Collection" ? 
            <PuzzleForm formDefaults={{type: pathname, postUrl: pathname, inputs: {owned: true}}} show={show} handleClose={handleClose} puzzleData={puzzleData} setPuzzleData={setPuzzleData}/> :
            <PuzzleForm formDefaults={{type: pathname, postUrl: pathname, inputs: {owned: false}}} show={show} handleClose={handleClose} puzzleData={puzzleData} setPuzzleData={setPuzzleData}/>
          }
        </Col>
        </Row>

      <Row>

        {pathname == "Collection" ? 
        <CollectionPuzzleCard collectionPuzzles={puzzleData} setCollectionPuzzles={setPuzzleData} pathname={pathname} /> :
        <WishlistPuzzleCard wishListPuzzles={puzzleData} setWishListPuzzles={setPuzzleData} pathname={pathname} />
        }

      </Row>

    </Container>
  );
}

export default PuzzlePage;