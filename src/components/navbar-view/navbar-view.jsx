import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import "./navbar-view.scss";

export function NavbarView({user}) {
  
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };


  const isAuth = () => {
    if (typeof window == "undefined") {
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
        <Navbar.Brand href="/">My Movies - Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="ml-auto">
              {isAuth() && ( 
                <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
              )} 
              {isAuth() && (
              <Button variant="link" onClick={() => {onLoggedOut() }}>Logout</Button>
              )}
            </Nav>
      </Container>
    </Navbar>
  );
}
