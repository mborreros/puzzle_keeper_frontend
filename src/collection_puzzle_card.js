import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPuzzlePiece, faTrashCan, faCartShopping, faFilePen } from "@fortawesome/free-solid-svg-icons";
import default_image from "./img/default_puzzle.jpg";

function CollectionPuzzleCard({ collectionPuzzles, setCollectionPuzzles }) {
  // adds puzzle piece icon to the library for the puzzle card
  library.add(faPuzzlePiece);
  library.add(faTrashCan);
  library.add(faCartShopping);
  library.add(faFilePen);

  // allows for the puzzle card to remain visible to the user and toggle removing a puzzle from their collection with minimal consequences 
  function handleRemove(thisPuzzle, id) {
    thisPuzzle.isRemoved = !thisPuzzle.isRemoved;
    let postHeaders = {
      method: thisPuzzle.isRemoved ? 'DELETE' : 'POST' , 
      headers: {"Content-type": "application/json"}, 
    },
    postBody = JSON.parse(JSON.stringify(thisPuzzle)),
    postUrl = 'http://localhost:9292/collection';
    // sends a remove request for the puzzle if it has not yet been removed by the user on click
    if (!thisPuzzle.isRemoved){
      delete postBody.isRemoved;
      delete postBody.id;
      postHeaders.body = JSON.stringify(postBody)
    } else {
      // sends a post request for the puzzle if it has already been removed by the user on click
      postUrl = `http://localhost:9292/collection/${thisPuzzle.id}`
    }
      fetch(postUrl, postHeaders)
        .then(response => response.json())
        .then(() => setCollectionPuzzles(
          collectionPuzzles.map((puzzle) => {
              return puzzle.id === thisPuzzle.id ? thisPuzzle : puzzle;
          })
      ))
        .catch(error => console.log("error", error));
  }

  let collectionListEntries = collectionPuzzles.map((puzzle) => {
    return(
      <Col sm="4" className="pb-4" key={puzzle.id}>
        <Card key={puzzle.id}>
          {/* displays image associated with the server data if it exists, if it does not - displays a default image */}
          <Card.Img variant="top" src={puzzle.image ? puzzle.image : default_image} />
          <Container className="px-1 pb-2">
            <Card.Body className="px-2 pb-0">
              <Card.Title as="div" className="row mb-0">
                <h5 className="col-6">{puzzle.title}</h5>
                <span className="col-6 small text-end text-muted">
                  <FontAwesomeIcon className="piece-icon" icon="puzzle-piece" />
                  &nbsp;{puzzle.pieces}
                </span>
              </Card.Title>
              <p className="px-0 mb-0"><a href={puzzle.purchase_link} className="text-decoration-none"><FontAwesomeIcon icon=" fa-cart-shopping" size="xs"/>&nbsp;${puzzle.price}</a></p>
              <p className="mb-0">Produced by {puzzle.manufacturer}</p>
              {/* conditional rendering needed for is the puzzle style exists or not */}
              <p className="mb-2">{puzzle.style}</p>
            </Card.Body>
            <Row className="px-2 mt-4">
              <Col sm="6">

                {/* Links to specific reviews for this puzzle id */}
                <Link to={{pathname: `/review/${puzzle.id}`}} className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-file-pen" /><span>&nbsp;Reviews</span></Link>

                </Col>
                <Col sm="6">
                {/* Conditional rendering of the remove button and icon based on the isRemoved puzzle property */}
                <Button variant={puzzle.isRemoved ? "danger" : "outline-danger"} className="remove-button float-end" onClick={(e) => handleRemove(puzzle)}>
                  {puzzle.isRemoved ? 
                  <span className="removed-text">Removed</span> : 
                  <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                  }
                </Button>
              </Col>
            </Row>
          </Container>
        </Card>
      </Col>
    )
  })

  return (
    <>
      {collectionListEntries}
    </>
  );
}

export default CollectionPuzzleCard;