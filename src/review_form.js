  import { faBox, faRainbow } from "@fortawesome/free-solid-svg-icons";
  import React, { useEffect, useState } from "react";
  import { Button, Modal, Col, Row, Container } from "react-bootstrap";
  import { MDBInput, MDBInputGroup, MDBTextArea, MDBCheckbox, MDBRadio } from 'mdb-react-ui-kit';
  import Form from 'react-bootstrap/Form'
  
  function ReviewForm({ show, handleClose, currentPuzzle, puzzleReview, setPuzzleReview }){

    // defaut database post body for reviews
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

    // abstracted to handle all form input types within one function 
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
          // appends the posted data to the puzzle review state to avoid an unnecessary fetch 
          .then(data => setPuzzleReview([data, ...puzzleReview]))
          .catch(error => console.log("error", error));
      
      // closes modal on submit 
      handleClose();
      // resets the form data to appear blank to the user on submit 
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
      <Container>
        <Modal.Body>
          <Form onSubmit={handleReviewSubmit} name="reviewForm">

            <Form.Group as={Row} className="mb-4" controlId="formUserSubmission">
              <Form.Select className={formData.user_id == '' ? '' : 'not-empty'} name="user_id" value={formData.user_id} selected={formData.user_id} onChange={(e) => handleReviewInputs(e.target)}>
                <option value={""}>Contributor name</option>
                {userSelectOptions}
              </Form.Select>
              <label className="form-label">Contributor name</label>
            </Form.Group>

            <Form.Group as={Row} className="mb-2" controlId="formPurchaseLocation">
              <MDBInput label='Place of purchase' type='text' name="purchase_location" value={formData.purchase_location} onChange={(e) => handleReviewInputs(e.target)} />
            </Form.Group>

            <Form.Group as={Row} className="mb-4 textarea-row" controlId="formReasonForPurchase">
              <MDBTextArea label="Reason for purchase" rows={3} name="purchase_reason" value={formData.purchase_reason} onChange={(e) => handleReviewInputs(e.target)} />
            </Form.Group>

            <Form.Group as={Row} className="px-2 mb-4" controlId="formPosterCheckbox">
              <MDBCheckbox label="Included a puzzle poster" name="poster" value={formData.poster} onChange={(e) => handleReviewInputs(e.target)}/>
            </Form.Group>

            <Form.Group as={Row} className="mb-1" controlId="formPiecesDescription">
              <Col xs={4} className="pl-1">
                <Form.Label>Piece Quality &nbsp;</Form.Label>
              </Col>
              <Col xs={8} className="px-0 d-flex justify-content-evenly">
                <MDBRadio name='piece_quality' value='1' label='1' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='piece_quality' value='2' label='2' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='piece_quality' value='3' label='3' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='piece_quality' value='4' label='4' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='piece_quality' value='5' label='5' inline onChange={(e) => handleReviewInputs(e.target)}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 textarea-row" controlId="formPiecesDescription">
              <MDBTextArea  label="Description of piece quality" rows={3} name="piece_quality_desc" value={formData.piece_quality_desc} onChange={(e) => handleReviewInputs(e.target)} />
            </Form.Group>

            <Form.Group as={Row} className="mb-1" controlId="formFitQualitySelect">
              <Col xs={4} className="pl-1">
                <Form.Label>Fit Quality&nbsp;</Form.Label>
              </Col>
              <Col xs={8} className="px-0 d-flex justify-content-evenly">
                <MDBRadio name='fit_quality' value='1' label='1' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='fit_quality' value='2' label='2' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='fit_quality' value='3' label='3' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='fit_quality' value='4' label='4' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='fit_quality' value='5' label='5' inline onChange={(e) => handleReviewInputs(e.target)}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 textarea-row" controlId="formFitDescription">
              <MDBTextArea label="Description of fit quality" rows={3} name="fit_quality_desc" value={formData.fit_quality_desc} onChange={(e) => handleReviewInputs(e.target)} />
            </Form.Group>

            <Form.Group as={Row} className="mb-1" controlId="formFinishedQuality">
              <Col xs={4} className="pl-1">
                <Form.Label>Finished Quality&nbsp;</Form.Label>
              </Col>
              <Col xs={8} className="px-0 d-flex justify-content-evenly">
                <MDBRadio name='finished_quality' value='1' label='1' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='finished_quality' value='2' label='2' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='finished_quality' value='3' label='3' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='finished_quality' value='4' label='4' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='finished_quality' value='5' label='5' inline onChange={(e) => handleReviewInputs(e.target)}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 textarea-row" controlId="formFinishedDescription">
              <MDBTextArea label="Description of finished quality" rows={3} name="finished_quality_desc" value={formData.finished_quality_desc} onChange={(e) => handleReviewInputs(e.target)} />
            </Form.Group>

            <Form.Group as={Row} className="mb-1" controlId="formDifficulty">
              <Col xs={4} className="pl-1">
                <Form.Label>Overall Difficulty&nbsp;</Form.Label>
              </Col>
              <Col xs={8} className="px-0 d-flex justify-content-evenly">
                <MDBRadio name='difficulty' value='1' label='1' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='difficulty' value='2' label='2' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='difficulty' value='3' label='3' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='difficulty' value='4' label='4' inline onChange={(e) => handleReviewInputs(e.target)}/>
                <MDBRadio name='difficulty' value='5' label='5' inline onChange={(e) => handleReviewInputs(e.target)}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 textarea-row" controlId="formDifficultyDescription">
              <MDBTextArea label="Description of overall difficulty" rows={3} name="difficulty_desc" value={formData.difficulty_desc} onChange={(e) => handleReviewInputs(e.target)} />
            </Form.Group>

            <Form.Group as={Row} className="px-2 mb-1" controlId="formRecommendCheckbox">
              <MDBCheckbox label="Recommend to a friend?" name="recommend" value={formData.recommend} onChange={(e) => handleReviewInputs(e.target)}/>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 textarea-row" controlId="formDifficultyDescription">
              <MDBTextArea label="Details about your recommendation" rows={3} name="recommend_desc" value={formData.recommend_desc} onChange={(e) => handleReviewInputs(e.target)} />
            </Form.Group>

            <div className="text-end">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Container>
    </Modal>
  )
};
  
  export default ReviewForm