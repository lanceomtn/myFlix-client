import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

import './login-view.scss';
import '../button/button.scss';

import { BrowserRouter as Router } from 'react-router-dom';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://mymoviesproject.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Router>

     <Navbar className="main-navbar" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">My Movies</Navbar.Brand>
         <Nav className="me-auto">
          <Nav.Link href="#logout">Logout</Nav.Link>
         </Nav>
        </Container>
      </Navbar>     
    
      <Form className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <div className="submit-button-div"></div>
          <Button 
            className="submit-button" type="submit" onClick={handleSubmit}>Login
          </Button>
        </Form>

    </Router>
  );
}

