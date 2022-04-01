import React, { useState, useEffect } from "react";
import UserForm from "./user_form";

import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import { Row, Container, Col } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion'

function UserPage() {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/users")
      .then(response => response.json())
      .then(data => {setUserData(data)})
      .catch(error => console.log('error', error));
  },[])

  let userEntries = userData.map((user) => {
    // format join date for card to yyyy-mm-dd from ISO
    let date = new Date(user.join_date);
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
        <Row>
          <Col className="col-3">
          <h4>Current Contributors</h4>
          </Col>
          <Col className="d-flex justify-content-end col-9">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Become a contributor</Accordion.Header>
                <Accordion.Body>
                  <UserForm />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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