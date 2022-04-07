// things to consider/adjust
  // better visually organize the puzzle form, ultimately it should be able to fit within the window view for the user without scrolling
  // show text form label to the left of the input field 

import React, { useEffect, useState } from "react";
import { Button, Modal, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

function PuzzleForm({ formDefaults, show, handleClose }){

  const puzzleFormData = {
    title: "",
    pieces: "",
    manufacturer: "",
    style: "",
    purchase_link: "",
    price: "",
    image: "",
    owned: false
}
  const [formData, setFormData] = useState(puzzleFormData);

  function handlePuzzleInputs(v){
    setFormData({
      ...formData,
      [v.name]: v.value
    })
  }

  // breaks routes .... says formDefaults is undefined
// useEffect(() => {
//   for (const key in formDefaults.inputs) {
//     let newValue = {name: key,value: formDefaults.inputs[key]}
//     console.log(newValue)
//     handlePuzzleInputs(newValue)
//   }
// }, [])

  // marked as not defined...
  // console.log(formDefaults.inputs[title])

  function handlePuzzleSubmit(event) {
    event.preventDefault();

    let puzzlePostData = {
      method: "POST", 
      headers: {"Content-type": "application/json"}, 
      body: JSON.stringify(formData)
    }
    fetch(`http://localhost:9292/${formDefaults.postUrl}`, puzzlePostData)
        .then(response => response.json())
        .catch(error => console.log("error", error));
    
    handleClose();
    setFormData(puzzleFormData);
  }

  return(
      <Modal show={show} onHide={handleClose} className="puzzle-form-modal"> 
              <Modal.Header closeButton>
              {/* {formDefaults.type} */}
                <Modal.Title>Add a Puzzle to the Collection</Modal.Title>
              </Modal.Header>
                <Row className="d-flex">
              <Modal.Body>
                Input your wishlist puzzle information here. All fields are optional.
              </Modal.Body>
              </Row>
                <Row  className="d-flex">
              <Modal.Body>
                <Form onSubmit={handlePuzzleSubmit} name="wishlistForm">
                  <Form.Group className="mb-3" controlId="formPuzzleTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={formData.title} onChange={(e) => handlePuzzleInputs(e.target)} placeholder="enter puzzle title" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPuzzlePieces">
                  <Form.Label>Pieces</Form.Label>
                  <Form.Control type="text" name="pieces" value={formData.pieces} onChange={(e) => handlePuzzleInputs(e.target)} placeholder="number of pieces (without punctuation)" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formManufacturor">
                  <Form.Label>Manufacturor</Form.Label>
                  <Form.Control type="text" name="manufacturer" value={formData.manufacturer} onChange={(e) => handlePuzzleInputs(e.target)} placeholder="manufacturor" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formStyle">
                  <Form.Label>Style</Form.Label>
                  <Form.Control type="text" name="style" value={formData.style} onChange={(e) => handlePuzzleInputs(e.target)} placeholder="if applicable" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPurchaseLink">
                  <Form.Label>Link to Purchase</Form.Label>
                  <Form.Control type="text" name="purchase_link" value={formData.purchase_link} onChange={(e) => handlePuzzleInputs(e.target)} placeholder="if applicable" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPurchaseLink">
                  <Form.Label>Price of puzzle</Form.Label>
                  <Form.Control type="text" name="price" value={formData.price} onChange={(e) => handlePuzzleInputs(e.target)} placeholder="enter without punctuation" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPurchaseLink">
                  <Form.Label>Link to puzzle image</Form.Label>
                  <Form.Control type="text" name="image" value={formData.image} onChange={(e) => handlePuzzleInputs(e.target)} placeholder="if applicable" />
                  </Form.Group>
                  
                  <div className="text-end">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  </div>
                </Form>
              </Modal.Body>
              </Row>
            </Modal>
  )
};

export default PuzzleForm