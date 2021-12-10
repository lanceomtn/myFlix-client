import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Card, Container } from 'react-bootstrap';

import './login-view.scss';
import '../button/button.scss';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container fluid className="login-container">

      <Navbar className="main-navbar" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">My Movies</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>     
    
      <Card className="login-card">
        <Card.Body>
          <Card.Title className="text-center">Welcome to My Movies</Card.Title>
          
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                className="mb-3" 
                type="password" 
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="submit-button-div"></div>
              <Button 
                className="submit-button" type="submit" onClick={handleSubmit}>Login
              </Button>

          </Form>

        </Card.Body>

      </Card>

    </Container>
  );
}

