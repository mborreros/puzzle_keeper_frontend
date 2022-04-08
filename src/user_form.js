import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

function UserForm({ show, handleClose, fetchData }){

  const userFormData = {
    name: "",
    bio: "",
  };
  const [formData, setFormData] = useState(userFormData)

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
        .catch(error => console.log("error", error));
    handleClose()
    setFormData(userFormData)
    fetchData()
  }

  return(
      <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Become a Contributor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleUserSubmit}>
                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={(e) => handleUserInputs(e.target)} placeholder="Enter name" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formUserBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as="textarea" rows={3} name="bio" value={formData.bio} onChange={(e) => handleUserInputs(e.target)} placeholder="Tell us a bit about yourself" />
                  </Form.Group>
                  <div className="text-end">
                  <Button variant="primary" type="submit">Join</Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
  )
};

export default UserForm