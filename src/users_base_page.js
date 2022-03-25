import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import { Row, Container } from "react-bootstrap";

function UserPage() {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/users")
      .then(response => response.json())
      .then(data => {setUserData(data)})
      .catch(error => console.log('error', error));
  },[])

  let userEntries = userData.map((user) => {
    // format join date for card
    console.log(user.join_date)

    return (
      <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={user.id}>
        <div className="ms-2 me-auto">
          <div className="fw-bold">{user.name}</div>
            <div>{user.bio}</div>
            <div>Joined on: {user.join_date}</div>
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
          <ListGroup as="ul">
            {userEntries}
          </ListGroup>
        </Row>
      </Container>
    </div>

  );
}

export default UserPage;