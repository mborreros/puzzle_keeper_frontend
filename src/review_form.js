  import { faBox } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
  import { Button, Modal, Col, Row } from "react-bootstrap";
  import Form from 'react-bootstrap/Form'
  
  function ReviewForm({ show, handleClose, currentPuzzle }){

    const reviewFormData = {
      puzzle_id: 0,
      purchase_reason: "",
      purchase_location: "",
      poster: false,
      piece_quality: 0,
      piece_quality_desc: "",
      fit_quality: 0,
      fit_quality_desc: "",
      finished_quality: 0,
      finished_quality_desc: "",
      difficulty: 0,
      difficulty_desc: "",
      recommend: false,
      recommend_desc: "",
      user_id: 0
  }

    const [formData, setFormData] = useState(reviewFormData);
    const [userList, setUserList] = useState([])

    // fetching user list for user select drop down 
    useEffect(() => {
      fetch(`http://localhost:9292/users`)
        .then(response => response.json())
        .then(data => setUserList(data))
        .catch(error => console.log('error', error));
    },[])

    function handleReviewInputs(v){
      // checks if the input passed is a checkbox
      // if so reads the checked true/false value rather than the event.target.value
      let inputValue = (v.type == "checkbox") ? v.checked : v.value;
      setFormData({
        ...formData,
        [v.name]: inputValue
      })
    }
  
    function handleReviewSubmit(event) {
      event.preventDefault();
      // set the puzzle_id field of the form values to the current puzzle selected
      formData.puzzle_id = currentPuzzle.id
      let reviewPostData = {
        method: "POST", 
        headers: {"Content-type": "application/json"}, 
        body: JSON.stringify(formData)
      }
      fetch(`http://localhost:9292/reviews`, reviewPostData)
          .then(response => response.json())
          .catch(error => console.log("error", error));
      
      handleClose();
      setFormData(reviewFormData);
    }
  
    // generate user select options based on data from users table
    let userSelectOptions = userList.map((user) => {
      return <option key={user.id} value={user.id}>{user.name}</option>
    })

    return(
        <Modal show={show} onHide={handleClose} className="puzzle-form-modal"> 
                <Modal.Header closeButton>
                  <Modal.Title>Add a Review for {currentPuzzle.title}</Modal.Title>
                </Modal.Header>
                  <Row className="d-flex">
                </Row>
                  <Row  className="d-flex">
                <Modal.Body>
                  <Form onSubmit={handleReviewSubmit} name="reviewForm">
                    <Form.Group className="mb-3" controlId="formUserSubmission">
                      <Form.Select name="user_id" value={formData.user_id} selected={formData.user_id} onChange={(e) => handleReviewInputs(e.target)}>
                        <option>Who is submitting this review?</option>
                        {userSelectOptions}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPurchaseLocation">
                      <Form.Label>Purchased at</Form.Label>
                      <Form.Control type="text" name="purchase_location" value={formData.purchase_location} onChange={(e) => handleReviewInputs(e.target)} placeholder="Where did you buy it?" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formReasonForPurchase">
                      <Form.Label>Reason for Purchase</Form.Label>
                      <Form.Control type="text" name="purchase_reason" value={formData.purchase_reason} onChange={(e) => handleReviewInputs(e.target)} placeholder="Why did you buy it?" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPosterCheckbox">
                      <Form.Check type="checkbox" label="Poster included" name="poster" value={formData.poster} onChange={(e) => handleReviewInputs(e.target)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPieceQualitySelect">
                      <Form.Select name="piece_quality" value={formData.piece_quality} selected={formData.piece_quality} onChange={(e) => handleReviewInputs(e.target)}>
                        <option>Individual piece quality</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPiecesDescription">
                      <Form.Label>Description of pieces</Form.Label>
                      <Form.Control type="text" name="piece_quality_desc" value={formData.piece_quality_desc} onChange={(e) => handleReviewInputs(e.target)} placeholder="Share details about the individual pieces" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFitQualitySelect">
                      <Form.Select name="fit_quality" value={formData.fit_quality} selected={formData.fit_quality} onChange={(e) => handleReviewInputs(e.target)}>
                        <option>Individual fit quality</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFitDescription">
                      <Form.Label>Description of piece fit</Form.Label>
                      <Form.Control type="text" name="fit_quality_desc" value={formData.fit_quality_desc} onChange={(e) => handleReviewInputs(e.target)} placeholder="Share details about the piece fit" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFinishedQuality">
                      <Form.Select name="finished_quality" value={formData.finished_quality} selected={formData.finished_quality} onChange={(e) => handleReviewInputs(e.target)}>
                        <option>Finished quality</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFinishedDescription">
                      <Form.Label>Description of finished product</Form.Label>
                      <Form.Control type="text" name="finished_quality_desc" value={formData.finished_quality_desc} onChange={(e) => handleReviewInputs(e.target)} placeholder="Share details about the finished product" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDifficulty">
                      <Form.Select name="difficulty" value={formData.difficulty} selected={formData.difficulty} onChange={(e) => handleReviewInputs(e.target)}>
                        <option>Overall difficulty</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFinishedDescription">
                      <Form.Label>Description of overall difficulty</Form.Label>
                      <Form.Control type="text" name="difficulty_desc" value={formData.difficulty_desc} onChange={(e) => handleReviewInputs(e.target)} placeholder="Share details about the puzzle difficulty" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRecommendCheckbox">
                      <Form.Check type="checkbox" label="Recommend to a friend?" name="recommend" value={formData.recommend} onChange={(e) => handleReviewInputs(e.target)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRecommendDescription">
                      <Form.Label>Why would you/wouldn't you recommend this?</Form.Label>
                      <Form.Control type="text" name="recommend_desc" value={formData.recommend_desc} onChange={(e) => handleReviewInputs(e.target)} placeholder="Share details about your recommendation" />
                    </Form.Group>
                    
                    <div className="text-end">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                    </div>
                  </Form>
                </Modal.Body>
                </Row>
              </Modal>
    )
  };
  
  export default ReviewForm