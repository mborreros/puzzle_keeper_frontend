import React, { useState } from "react";
import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { Button, Modal, Row, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

function UserForm({ show, handleClose, fetchData, setUserData }){

  // default user post body for database
  const userFormData = {
    name: "",
    bio: "",
  };
  const [formData, setFormData] = useState(userFormData)

  // abstracted to handle all form inputs
  function handleUserInputs(v){
    setFormData({
      ...formData,
      [v.name]: v.value
    })
  }

  function handleUserSubmit(event) {
    event.preventDefault();
    let userPostData = {
      method: "POST", 
      headers: {"Content-type": "application/json"}, 
      body: JSON.stringify(formData)
    }
    fetch("http://localhost:9292/users", userPostData)
        .then(response => response.json())
        .then(data => setUserData([ data, ...fetchData ]))
        .catch(error => console.log("error", error));
    // closes modal on submit
    handleClose()
    // reset the form data on submit so it appears blank to the user
    setFormData(userFormData)
  }

  return(
      <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Become a Contributor</Modal.Title>
              </Modal.Header>
              <Container>
                <Modal.Body>
                  <Form onSubmit={handleUserSubmit}>

                    <Form.Group as={Row} className="mb-4" controlId="formUserName">
                      <MDBInput label='Name' type='text' name="name" value={formData.name} onChange={(e) => handleUserInputs(e.target)} />
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4 textarea-row" controlId="formUserBio">
                      <MDBTextArea label="Bio" rows={3} name="bio" value={formData.bio} onChange={(e) => handleUserInputs(e.target)} />
                    </Form.Group>

                    <div className="text-end">
                    <Button variant="primary" type="submit">Join</Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Container>
            </Modal>
  )
};

export default UserForm