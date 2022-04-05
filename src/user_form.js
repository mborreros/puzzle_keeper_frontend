import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

function UserForm({ show, handleClose }){

  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");

  function handleUserNameChange(event){
    setUserName(event.target.value)
  }
  function handleUserBioChange(event){
    setUserBio(event.target.value)
  }
  function handleUserSubmit(event) {
    event.preventDefault();

    const userFormData = {
      name: userName,
      bio: userBio,
    };

    let userPostData = {
      method: "POST", 
      headers: {"Content-type": "application/json"}, 
      body: JSON.stringify(userFormData)
    }
    fetch("http://localhost:9292/users", userPostData)
        .then(response => response.json())
        .catch(error => console.log("error", error));
    
    // reloads page to collapse form and repopulate user data shown
    window.location.reload(true);
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
                  <Form.Control type="text" value={userName} onChange={handleUserNameChange} placeholder="Enter name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formUserBio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control type="text" value={userBio} onChange={handleUserBioChange} placeholder="Tell us a bit about yourself" />
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

export default UserForm