import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
//import { Link } from "react-router-dom";

import "./navbar-view.scss";

export function NavbarView({user}) {
  //const user = localStorage.getItem("user");

const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
};

const isAuth = () => {
  if(typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
      return false;
  }
};

return(
    <Navbar className="main-navbar" expand="lg" >
      <Container fluid>
        <Navbar.Brand href="/">My Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
            {isAuth() && ( 
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
            )}
            {isAuth() && ( 
              <Nav.Link href="/">Log In</Nav.Link>
            )}
            {isAuth() && ( 
              <Nav.Link href="/register">Register</Nav.Link>
            )}
            </Nav>
          </Navbar.Collapse>  
      </Container>
    </Navbar>
  );
}
