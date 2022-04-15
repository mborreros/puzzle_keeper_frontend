import React, { useState } from "react";
import { MDBInput, MDBInputGroup } from 'mdb-react-ui-kit';
import { Button, Modal, Col, Row, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

function PuzzleForm({ formDefaults, show, handleClose, puzzleData, setPuzzleData }){

  // default request body data
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

  // abstracted controlled input handler
  function handlePuzzleInputs(v){
    setFormData({
      ...formData,
      [v.name]: v.value
    })
  }

  function handlePuzzleSubmit(event) {
    event.preventDefault();

    let puzzlePostData = {
      method: "POST", 
      headers: {"Content-type": "application/json"}, 
      body: JSON.stringify(formData)
    }
    fetch(`http://localhost:9292/${formDefaults.postUrl}`, puzzlePostData)
        .then(response => response.json())
        .then(data => setPuzzleData([data, ...puzzleData]))
        .catch(error => console.log("error", error));
    
    // closes the modal upon submit
    handleClose();
    // resets the form data o submit so that it appears cleared to the user
    setFormData(puzzleFormData);
  }

  return(
    <Modal show={show} onHide={handleClose} className="puzzle-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add a Puzzle to {formDefaults.type}</Modal.Title>
      </Modal.Header>
      <Container>
        <Modal.Body>
          <Form onSubmit={handlePuzzleSubmit} name="puzzleForm">
            <Form.Group as={Row} className="mb-4" controlId="formPuzzleTitle">
              <MDBInput label='Title' type='text' name="title" value={formData.title} onChange={(e) => handlePuzzleInputs(e.target)} />
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formPuzzlePieces">
              <MDBInput label='Number of pieces' type='number' name="pieces" value={formData.pieces} autoComplete="off" onChange={(e) => handlePuzzleInputs(e.target)} />
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formManufacturor">
              <MDBInput label='Manufacturer' type='text' name="manufacturer" value={formData.manufacturer} onChange={(e) => handlePuzzleInputs(e.target)} />
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formStyle">
              <MDBInput label='Style' type='text' name="style" value={formData.style} onChange={(e) => handlePuzzleInputs(e.target)} />
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formPurchaseLink">
              <Col className="ps-0 col-8">
                <MDBInput label='Purchase Link' type='text' name="purchase_link" value={formData.purchase_link} onChange={(e) => handlePuzzleInputs(e.target)} />
              </Col>

              <Col className="px-0 col-4">
                <MDBInputGroup className="ps-0 flex-nowrap" textBefore='$'>
                  <MDBInput label='Price' type='number' name="price" value={formData.price} onChange={(e) => handlePuzzleInputs(e.target)} />
                </MDBInputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formPurchaseLink">
              <MDBInput label='Puzzle image' type='text' name="image" value={formData.image} onChange={(e) => handlePuzzleInputs(e.target)} />
            </Form.Group>

            <div className="text-end">
            <Button type='submit'>Submit</Button>
            </div>

          </Form>
        </Modal.Body>
      </Container>
    </Modal>
  )
};

export default PuzzleForm