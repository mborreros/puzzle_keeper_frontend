// on click of collect button, show check "collected" rather than reload page
// on click of remove button, show trash "removed" rather than reload page

import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPuzzlePiece, faCirclePlus, faTrashCan, faCartShopping, faListCheck } from "@fortawesome/free-solid-svg-icons";

import { Card, Row, Col, Button, Container } from "react-bootstrap";


function PuzzleCard({ wishListPuzzles, setWishListPuzzles }) {
  // adds puzzle piece icon to the library for the puzzle card
  library.add(faPuzzlePiece);
  library.add(faCirclePlus);
  library.add(faTrashCan);
  library.add(faCartShopping);
  library.add(faListCheck)

  const [isRemoved, setIsRemoved] = useState(false);


  function handleCollect(thisPuzzle) {

    thisPuzzle.owned = !thisPuzzle.owned

    fetch(`http://localhost:9292/wishlist/${thisPuzzle.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        owned: thisPuzzle.owned
      })
    })
        .then(response => response.json())
        .then(() => setWishListPuzzles(
          wishListPuzzles.map((puzzle) => {
              return puzzle.id === thisPuzzle.id ? thisPuzzle : puzzle;
          })))
        .catch(error => console.log("error", error));

  }


  function handleRemove(thisPuzzle, id) {
    thisPuzzle.isRemoved = !thisPuzzle.isRemoved;
    let postHeaders = {
      method: thisPuzzle.isRemoved ? 'DELETE' : 'POST' , 
      headers: {"Content-type": "application/json"}, 
    },
    postBody = JSON.parse(JSON.stringify(thisPuzzle)),
    postUrl = 'http://localhost:9292/wishlist';
    if (!thisPuzzle.isRemoved){
      delete postBody.isRemoved;
      delete postBody.id;
      postHeaders.body = JSON.stringify(postBody)
    } else {
      postUrl = `http://localhost:9292/wishlist/${thisPuzzle.id}`
    }
      fetch(postUrl, postHeaders)
        .then(response => response.json())
        .then(() => setWishListPuzzles(
          wishListPuzzles.map((puzzle) => {
              return puzzle.id === thisPuzzle.id ? thisPuzzle : puzzle;
          })
      ))
        .catch(error => console.log("error", error));
  }

  let wishListEntries = wishListPuzzles.map((puzzle) => {
    return(
      <Col sm="4" className="pb-4" key={puzzle.id}>
        <Card key={puzzle.id}>
          <Card.Img variant="top" src={puzzle.image} />
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

                <Button variant={puzzle.owned ? "success" : "outline-success"} disabled={isRemoved} className="add-collect-button" onClick={() => handleCollect(puzzle)}>
                {puzzle.owned ? 
                  <><FontAwesomeIcon icon="fa-solid fa-list-check" /><span>&nbsp;Collected</span></> : <><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> <span>Collection</span></> 
                }

                </Button>
                </Col>
                <Col sm="6">
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
      {wishListEntries}
    </>
  );
}

export default PuzzleCard;