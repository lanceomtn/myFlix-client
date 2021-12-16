import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Card, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, } from 'react-router-dom';
import { NavbarView } from "../navbar-view/navbar-view";

import './registration-view.scss';
import '../button/button.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });
}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios.post('https://https://mymoviesproject.herokuapp.com/user', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };

  return (
    <Router>
      <NavbarView/>
      
      <Card className="register-card">
        <Card.Body>
          <Card.Title className="text-center">Welcome to My Movies</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>
        </Card.Body>
      </Card>
        
        <Form>
          <Form.Group controlId="registerUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} placeholder="Create Username" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="registerBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control className="mb-3" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>

          <div className="submit-button-div">
            <button 
              className="submit-button" type="submit" onClick={handleSubmit}>Register
            </button>
          </div>
        </Form>  
    </Router> 
  );

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
    //birthday: PropTypes.string.isRequired
  })
};