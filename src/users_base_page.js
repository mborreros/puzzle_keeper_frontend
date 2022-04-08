import React, { useState, useEffect } from "react";
import UserForm from "./user_form";

import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Row, Container, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function UserPage({ handleClose, handleShow, show }) {
  library.add(faTrashCan);

  const [userData, setUserData] = useState([]);

  // data fetch is defined outside of useEffect to allow for the page to fetch updated data upon form submission
  async function fetchUserData() {
    fetch("http://localhost:9292/users")
    .then(response => response.json())
    .then(data => {setUserData(data)})
    .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetchUserData()
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
          {/* add buttons for edit and remove user */}
          {/* <Col>
          <Button>Edit</Button>
          </Col>
          <Col>
          <Button variant="outline-danger" className="remove-button float-end"></Button>
          </Col> */}
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
            <UserForm show={show} handleClose={handleClose} fetchData={fetchUserData}/>
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