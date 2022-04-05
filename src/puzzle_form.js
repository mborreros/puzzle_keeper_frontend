// things to consider/adjust
  // rearrange the puzzle entries so that they show newest to oldest
  // correct the created_on timestamp in the puzzle table on the server 
  // better visually organize the puzzle form, ultimately it should be able to fit within the window view for the user without scrolling

import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

function PuzzleForm({ show, handleClose }){

  const [puzzleTitle, setPuzzleTitle] = useState("");
  const [puzzlePieces, setPuzzlePieces] = useState("");
  const [puzzleManufacturor, setPuzzleManufacturor] = useState("");
  const [puzzleStyle, setPuzzleStyle] = useState("");
  const [puzzlePurchaseLink, setPuzzlePurchaseLink] = useState("");
  const [puzzlePrice, setPuzzlePrice] = useState("");
  const [puzzleImageLink, setPuzzleImageLink] = useState("");

  function handlepuzzleTitleChange(event){
    setPuzzleTitle(event.target.value)
  }
  function handlePuzzlePiecesChange(event){
    setPuzzlePieces(event.target.value)
  }
  function handlePuzzleManufacturorChange(event){
    setPuzzleManufacturor(event.target.value)
  }
  function handlePuzzleStyleChange(event){
    setPuzzleStyle(event.target.value)
  }
  function handlePuzzlePurchaseLinkChange(event){
    setPuzzlePurchaseLink(event.target.value)
  }
  function handlePuzzlePriceChange(event){
    setPuzzlePrice(event.target.value)
  }
  function handlePuzzleImageLinkChange(event){
    setPuzzleImageLink(event.target.value)
  }


  function handleUserSubmit(event) {
    event.preventDefault();

    const puzzleFormData = {
      title: puzzleTitle,
      pieces: puzzlePieces,
      manufacturer: puzzleManufacturor,
      style: puzzleStyle,
      purchase_link: puzzlePurchaseLink,
      price: puzzlePrice,
      image: puzzleImageLink,
      owned: false
    };

    let puzzlePostData = {
      method: "POST", 
      headers: {"Content-type": "application/json"}, 
      body: JSON.stringify(puzzleFormData)
    }
    fetch("http://localhost:9292/wishlist", puzzlePostData)
        .then(response => response.json())
        .catch(error => console.log("error", error));
    
    // reloads page to collapse form and repopulate user data shown
    window.location.reload(true);
  }

  return(
      <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add a Puzzle to the Wishlist</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleUserSubmit}>
                  <Form.Group className="mb-3" controlId="formPuzzleTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={puzzleTitle} onChange={handlepuzzleTitleChange} placeholder="enter puzzle title" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPuzzlePieces">
                  <Form.Label>Pieces</Form.Label>
                  <Form.Control type="text" value={puzzlePieces} onChange={handlePuzzlePiecesChange} placeholder="number of pieces (without punctuation)" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formManufacturor">
                  <Form.Label>Manufacturor</Form.Label>
                  <Form.Control type="text" value={puzzleManufacturor} onChange={handlePuzzleManufacturorChange} placeholder="manufacturor" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formStyle">
                  <Form.Label>Style</Form.Label>
                  <Form.Control type="text" value={puzzleStyle} onChange={handlePuzzleStyleChange} placeholder="if applicable" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPurchaseLink">
                  <Form.Label>Link to Purchase</Form.Label>
                  <Form.Control type="text" value={puzzlePurchaseLink} onChange={handlePuzzlePurchaseLinkChange} placeholder="if applicable" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPurchaseLink">
                  <Form.Label>Price of puzzle</Form.Label>
                  <Form.Control type="text" value={puzzlePrice} onChange={handlePuzzlePriceChange} placeholder="enter without punctuation" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPurchaseLink">
                  <Form.Label>Link to puzzle image</Form.Label>
                  <Form.Control type="text" value={puzzleImageLink} onChange={handlePuzzleImageLinkChange} placeholder="if applicable" />
                  </Form.Group>
                  
                  
                  <div className="text-end">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
  )
};

export default PuzzleForm