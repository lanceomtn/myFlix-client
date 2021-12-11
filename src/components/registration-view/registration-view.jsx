import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Card, Container, Form } from 'react-bootstrap';

import './registration-view.scss';
import '../button/button.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    console.log(props);
    /* Send a request to the server for authentication */
    /* then call props on registered user(username) */
    props.onRegistration(username);
  };

  return (
    <Container fluid className="register-container">
    
      <Navbar className="main-navbar" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">My Movies</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>     

      <Card className="register-card">
        <Card.Body>
          <Card.Title className="text-center">Welcome to My Movies</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>
        
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Birthday</Form.Label>
              <Form.Control className="mb-3" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>

          <div className="submit-button-div">
            <button 
              className="submit-button" type="submit" onClick={handleSubmit}>Register
            </button>
          </div>
        </Form>  
        </Card.Body>
      </Card>
    </Container>  
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
  })
};