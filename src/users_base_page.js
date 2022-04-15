import React, { useState, useEffect } from "react";
import UserForm from "./user_form";
import { ListGroup, Badge } from 'react-bootstrap';
import { Row, Container, Col, Button } from "react-bootstrap";

function UserPage({ handleClose, handleShow, show , formatDate}) {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/users")
    .then(response => response.json())
    .then(data => {setUserData(data)})
    .catch(error => console.log('error', error));
  },[])

  let userEntries = userData.map((user) => {
    let parsed_join_date = formatDate(user.created_at)

    return (
      <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={user.id}>
        <div className="ms-2 me-auto">
          <Row>
          <div className="fw-bold">{user.name}</div>
            <div>{user.bio}</div>
            <div>Joined on: {parsed_join_date}</div>
          </Row>
          </div>
          <Row>
          <Badge bg="primary" pill>
           Reviews completed {user.review_count}
          </Badge>
          </Row>
        </ListGroup.Item>
      )
    })

  return (
      <Container>
        <Row>
          <Col>
          <h4 className="page-title">Current Contributors</h4>
          </Col>
          <Col>
            <Button className="float-end" variant="secondary" onClick={handleShow}>
              Become a Contributor
            </Button>
            <UserForm show={show} handleClose={handleClose} fetchData={userData} setUserData={setUserData}/>
          </Col>
          </Row>
        <Row>
          <ListGroup as="ul">
            {userEntries}
          </ListGroup>
        </Row>
      </Container>
  );
}

export default UserPage;