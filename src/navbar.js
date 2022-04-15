import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.css"
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBCollapse} from 'mdb-react-ui-kit';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "./img/general_icon.svg";

function Navigation() {

  library.add(faBars);

  const [showNav, setShowNav] = useState(false);

  // url path as a variable to toggle which navbar link is selected
  let location = useLocation()
  let urlPath = location.pathname
  useEffect(() => {
    urlPath = location.pathname
  }, [location])

  // active property checked based on url path, renders which link is selected
  // work around for MDB component to mimic Nav.Link component functionality 
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>
          <img src={logo} alt="aqua puzzle piece" className="navbar-logo"/>
              Puzzle Keeper
        </MDBNavbarBrand>
        <MDBNavbarToggler type='button' aria-expanded='false' aria-label='Toggle navigation' onClick={() => setShowNav(!showNav)}>
          <FontAwesomeIcon icon="fa-solid fa-bars" />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink active={urlPath === '/collection'} href='/collection' >Collection</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active={urlPath === '/wishlist'} href='/wishlist'>Wishlist</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active={urlPath === '/users'} href='/users'>Contributors</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navigation;

