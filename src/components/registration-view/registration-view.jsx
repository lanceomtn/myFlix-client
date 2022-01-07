import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, } from 'react-router-dom';


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
    axios.post(`https://mymoviesproject.herokuapp.com/users`, {
      Username: username,
      Password: password,
      email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      alert('error registering the user')
    });
  };

  return (
    <Router>
        
      <Form className="registration-form">
      
        <Form.Group controlId="registerUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} placeholder="Username must be at least # characters" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} placeholder="Password must be at least # characters" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group controlId="registerEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group controlId="registerBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control className="mb-3" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>

        <div className="submit-button-div">
          <button className="submit-button" type="submit" onClick={handleSubmit}>Register</button>
        </div>
      </Form>
     
    </Router> 
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
    //birthday: PropTypes.string.isRequired
  })
};