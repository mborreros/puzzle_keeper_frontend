import React, { useState, useEffect } from "react";
import PuzzleForm from "./puzzle_form";

import { Row, Container, Col, Button } from "react-bootstrap";
import CollectionPuzzleCard from "./collection_puzzle_card";

function PuzzlePage({ handleClose, handleShow, show }) {

  const [ collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/collection")
      .then(response => response.json())
      .then(data => {
        data.map((puzzle) => {
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
            <PuzzleForm formDefaults={{type: "Collection", postUrl: 'collection', inputs: {owned: true}}} show={show} handleClose={handleClose}/>
        </Col>
        </Row>

      <Row>

       <CollectionPuzzleCard collectionPuzzles={collectionData} setCollectionPuzzles={setCollectionData}/>

      </Row>

    </Container>
  );
}

export default PuzzlePage;