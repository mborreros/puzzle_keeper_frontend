import React, { useState, useEffect } from "react";
import PuzzleForm from "./puzzle_form";
import CollectionPuzzleCard from "./collection_puzzle_card";
import { Row, Container, Col, Button } from "react-bootstrap";

function PuzzlePage({ handleClose, handleShow, show }) {

  const [ collectionData, setCollectionData ] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/collection")
      .then(response => response.json())
      .then(data => {
        data.map((puzzle) => {
          // addes isRemoved property to each puzzle in order to toggle removal within the individual puzzle cards
          puzzle.isRemoved = false;
      })
      setCollectionData(data)})
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
            {/* passes owned: true as a prop to the shared PuzzleForm, the only input which differentiates Collection vs WishList puzzles within the database */}
            <PuzzleForm formDefaults={{type: "Collection", postUrl: 'collection', inputs: {owned: true}}} show={show} handleClose={handleClose} puzzleData={collectionData} setPuzzleData={setCollectionData}/>
        </Col>
        </Row>

      <Row>

       <CollectionPuzzleCard collectionPuzzles={collectionData} setCollectionPuzzles={setCollectionData}/>

      </Row>

    </Container>
  );
}

export default PuzzlePage;