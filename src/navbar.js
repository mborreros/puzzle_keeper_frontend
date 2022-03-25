import React from "react"
import "bootstrap/dist/css/bootstrap.css"
// import { NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

import logo from "./img/general_icon.svg";

function Navigation() {
  return(
    <nav>
      <Navbar bg="secondary" className="puzzle-navbar">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="aqua puzzle piece" className="navbar-logo"/>
            Puzzle Keeper
            </Navbar.Brand>
          <Nav className="me-auto" variant="pills" defaultActiveKey="/home">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/puzzles">Puzzles</Nav.Link>
            <Nav.Link href="/reviews">Reviews</Nav.Link>
            <Nav.Link href="/users">Contributors</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </nav>
  )}

export default Navigation;