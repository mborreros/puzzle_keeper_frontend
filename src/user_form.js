import React, { useState, useEffect } from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

function UserForm(){

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
        .then(result => {console.log(result)})
        .catch(error => console.log("error", error));

    // props.sendFormDataSomewhere(formData);
    // setFirstName("");
    // setLastName("");
  }

  return(
    <Container>
      <Form onSubmit={handleUserSubmit}>
        <Form.Group className="mb-3" controlId="formUserName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={userName} onChange={handleUserNameChange} placeholder="Enter name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUserBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control type="text" value={userBio} onChange={handleUserBioChange} placeholder="Tell us a bit about yourself" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Join
        </Button>
      </Form>
      </Container>
  )
};

export default UserForm