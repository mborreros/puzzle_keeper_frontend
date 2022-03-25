import React from "react"
import { NavLink } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function NavBar() {
  return(
    <Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#features">Features</NavLink>
        <NavLink href="#pricing">Pricing</NavLink>
      </Container>
    </Navbar>
  )}

export default NavBar;