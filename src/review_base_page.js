import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import moment from 'moment'

import ListGroup from 'react-bootstrap/ListGroup';
import { Row, Container, Col, Button } from "react-bootstrap";
import ReviewForm from "./review_form"

import {ReactComponent as Star} from "./img/star.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFaceSmile, faFaceFrown, faCopy } from "@fortawesome/free-solid-svg-icons";

function ReviewPage({ handleClose, handleShow, show }) {

  // import icons from FontAwesome
  library.add(faFaceSmile);
  library.add(faFaceFrown);
  library.add(faCopy);

  // get puzzle id from url parameters
  const { id } = useParams();

  const [puzzleReview, setPuzzleReview] = useState([]);
  const [puzzleData, setPuzzleData] = useState([]);

  useEffect(() => {
    // gets review data for particular puzzle in database
    fetch(`http://localhost:9292/reviews/${id}`)
      .then(response => response.json())
      .then(data => setPuzzleReview(data))
      .catch(error => console.log('error', error));
    // gets that specific puzzle's information from database
    fetch(`http://localhost:9292/collection/${id}`)
      .then(response => response.json())
      .then(data => setPuzzleData(data))
      .catch(error => console.log('error', error));
  },[]) 


  let reviewEntries = puzzleReview.map((review) => {
// establish text to copy to clipboard on button click
// formating is strange because every element of the copyText variable will be copied to clipboard, including spaces/tabs 
// copyText is written in markdown so that it can be copied directly into Reddit and maintain the desired formatting 
let copyText = 
`## Details

purchased at ${puzzleData.purchase_link ? 
`[${review.purchase_location}](${puzzleData.purchase_link})` : 
`${review.purchase_location}`} 

cost ${puzzleData.price}

style ${puzzleData.style ? puzzleData.style : "standard" }

**poster** ${review.poster ? "included": "not included" }

## Review

**reason for purchase** 

${review.purchase_reason}

**individual piece quality** ${review.piece_quality}/5

${review.piece_quality_desc} 

**piece fit quality** ${review.fit_quality}/5

${review.fit_quality_desc} 

**finished product quality** ${review.finished_quality}/5

${review.finished_quality_desc} 

**overall difficulty** ${review.difficulty}/5

${review.difficulty_desc} 

${review.recommend ? "I **would recommend** this to a friend": "I **would not recommend** this to a friend" }

${review.difficulty_desc}`

      return (
        
          <ListGroup.Item as="div" className="d-flex justify-content-between align-items-start" key={review.id}>
          <Container className="py-4">
            <Row className="flex-column">
              <Col className="mb-2">
                <h5 className="review-title mb-0">
                { review.recommend ? 
                 <><FontAwesomeIcon icon="fa-solid fa-face-smile" className="happy-icon" />Positive </>:
                 <><FontAwesomeIcon icon="fa-solid fa-face-frown" className="unhappy-icon"/>Negative </> } 
                 Review from {review.user.name}
               </h5>
              {/* using installed moment package to show the user the date similar to reviews/posts on popular websites */}
               <p className="small text-muted"><em>{moment(review.created_at).fromNow()}</em></p>
              </Col>
                
              <Col className="mb-3">
                <b>Purchase Details</b>
                { review.purchase_location == "Gift, not purchased" ? 
                <div>Gifted, not purchased</div> : 
                <div>Purchased at: {review.purchase_location}</div> }

                { review.purchase_reason ? 
                <div>{review.purchase_reason}</div> : 
                <></> }
              </Col>

              <Col className="mb-3">
                <b>Poster Information</b>
                { review.poster ?  
                <div className="poster-text">Not included with puzzle</div> :
                 <div className="poster-text">Included with puzzle</div> }
              </Col>

              <Col className="mb-3">
                  <b>Individual Piece Quality</b>
                  <div className={`star-rating rating-${review.piece_quality}`}>
                    <Star/><Star/><Star/><Star/><Star/>
                  </div>
                <div>{review.piece_quality_desc}</div>
              </Col>

              <Col className="mb-3">
              <b>Piece Fit Quality</b>
                <div className={`star-rating rating-${review.fit_quality}`}>
                  <Star/><Star/><Star/><Star/><Star/>
                </div>
                <div>{review.fit_quality_desc}</div>
              </Col>

              <Col className="mb-3">
              <b>Finished Product Quality</b>
                <div className={`star-rating rating-${review.finished_quality}`}>
                  <Star/><Star/><Star/><Star/><Star/>
                </div>
                <div>{review.finished_quality_desc}</div>
              </Col>

              <Col className="mb-3">
              <b>Overall Difficulty</b>
                <div className={`star-rating rating-${review.difficulty}`}>
                  <Star/><Star/><Star/><Star/><Star/>
                </div>
                <div>{review.difficulty_desc}</div>
              </Col>

              <Col className="mb-4">
              <b>Recommendation Details</b>
                { review.recommend ? 
                <div>I <u>would</u> recommend this puzzle</div> : 
                <div>I <u>would not</u> recommend this puzzle.</div> }
                <div>{review.recommend_desc}</div>
              </Col>

            </Row>

            <Button className="float-end" onClick={() => {navigator.clipboard.writeText(copyText)}}><FontAwesomeIcon icon="fa-solid fa-copy" />&nbsp; Copy Markdown to Clipboard</Button>

            </Container>
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
          <ReviewForm show={show} handleClose={handleClose} currentPuzzle={puzzleData} puzzleReview={puzzleReview} setPuzzleReview={setPuzzleReview}/>
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