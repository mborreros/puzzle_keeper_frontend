// need to find how to get user names associated with each review
// display the reviews readibly to user

import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'

import ListGroup from 'react-bootstrap/ListGroup';
import { Row, Container, Col, Button } from "react-bootstrap";
import ReviewForm from "./review_form"

function ReviewPage({ handleClose, handleShow, show }) {

  // get puzzle id from url parameters
  const { id } = useParams();

  const [puzzleReview, setPuzzleReview] = useState([]);
  const [puzzleData, setPuzzleData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/reviews/${id}`)
      .then(response => response.json())
      .then(data => setPuzzleReview(data))
      .catch(error => console.log('error', error));
    fetch(`http://localhost:9292/collection/${id}`)
      .then(response => response.json())
      .then(data => setPuzzleData(data))
      .catch(error => console.log('error', error));
  },[])

  // puzzleReview.user_id = USER ID
  // User.find(puzzleReview.user_id) -> user-profile
  // user-profile.name = that user's name 

  let reviewEntries = puzzleReview.map((review) => {
      return (
          <ListGroup.Item as="div" className="d-flex justify-content-between align-items-start" key={review.id}>
          <div className="ms-2 me-auto">
            <Row>
            <div className="fw-bold">{puzzleData.title}</div>
              <div>{review.purchase_reason}</div>
              <div>{review.purchase_location}</div>
              <div>{review.poster}</div>
              <div>{review.piece_quality}</div>
              <div>{review.piece_quality_desc}</div>
              <div>{review.fit_quality}</div>
              <div>{review.fit_quality_desc}</div>
              <div>{review.finished_quality}</div>
              <div>{review.finished_quality_desc}</div>
              <div>{review.difficulty}</div>
              <div>{review.difficulty_desc}</div>
              <div>{review.recommend}</div>
              <div>{review.recommend_desc}</div>
            </Row>
            </div>
            <Row>
            </Row>
          </ListGroup.Item>
      )})

  return (
    <Container>
    <Row>
      <Col>
      <h4 className="page-title">{puzzleData.title} Puzzle Review</h4>
      </Col>
      <Col>
          <Button className="float-end" variant="secondary" onClick={handleShow}>
            Add a Review for this Puzzle
          </Button>
          <ReviewForm show={show} handleClose={handleClose} currentPuzzle={puzzleData} />
      </Col>
      </Row>

    <Row>
    <ListGroup as="ul">
    {reviewEntries.length ? reviewEntries : <p>There are no reviews for this puzzle. Ready to contribute? Click the button above!</p> }
    </ListGroup>
    </Row>

  </Container>
);
}

export default ReviewPage;