import React from "react"
import { Row, Container, Col } from "react-bootstrap";

function HomePage() {
  return (
    <Container> 
      <Row>
        <Col>
          <h2>Welcome to Puzzle Keeper</h2>
        </Col>
      </Row>
      <Row>
        <h6>Our goal is to provide enthusiasts with a way to track their puzzle collection, wishlist, participants, and in depth reviews on completed projects.</h6>
        <h6>We appreciate your contributions.</h6>
        <h6>Organized puzzlers unite!</h6>
      </Row>
    </Container>

  );
}

export default HomePage;