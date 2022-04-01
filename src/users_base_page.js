import React, { useState, useEffect } from "react";
import UserForm from "./user_form";

import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Row, Container, Col, Button } from "react-bootstrap";

function UserPage() {

  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:9292/users")
      .then(response => response.json())
      .then(data => {setUserData(data)})
      .catch(error => console.log('error', error));
  },[])

  let userEntries = userData.map((user) => {
    // format join date/created at for card to yyyy-mm-dd from ISO
    let date = new Date(user.created_at);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    let parsed_join_date = year+'-' + month + '-'+dt

    return (
      <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={user.id}>
        <div className="ms-2 me-auto">
          <div className="fw-bold">{user.name}</div>
            <div>{user.bio}</div>
            <div>Joined on: {parsed_join_date}</div>
          </div>
          <Badge bg="primary" pill>
           Reviews completed {user.review_count}
          </Badge>
        </ListGroup.Item>
      )
    })

  return (
    <div>
      <Container>
        <Row className="my-4">
          <Col className="col-3">
          <h4>Current Contributors</h4>
          </Col>
          {/* need to figure out how to stretch the accordian out! */}
          <Col className="col-9">
            <Button className="float-end" variant="secondary" onClick={handleShow}>
              Become a Contributor
            </Button>
            <UserForm show={show} handleClose={handleClose}/>
          </Col>
          </Row>
        <Row>
          <ListGroup as="ul">
            {userEntries}
          </ListGroup>
        </Row>
      </Container>
    </div>

  );
}

export default UserPage;