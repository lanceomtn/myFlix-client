import React, { useState } from 'react';
import { Nav, Form, Button, } from 'react-bootstrap';
import axios from 'axios';

import './login-view.scss';
import '../button/button.scss';

import { BrowserRouter as Router } from 'react-router-dom';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  // Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

// validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
    setUsernameErr('Username Required');
    isReq = false;
    }
    if(!password){
    setPasswordErr('Password Required');
    isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send request to the server for authentication */
      axios.post('https://mymoviesproject.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response =>{
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        alert('no such user')
      });
    }
  };

  return (
    <Router>  
      <Form className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
          {/* code added here to display validation error */}
          {usernameErr && <p>{usernameErr}</p>} 
        </Form.Group>
        <br />
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
          {/* code added here to display validation error */}
          {passwordErr && <p>{passwordErr}</p>} 
        </Form.Group>

        <div className="submit-button-div">
          <Button className="submit-button" type="submit" onClick={handleSubmit}>Login</Button>
          <br />
          <br />
          <h3>New here - register below</h3>
          <Button className="register-button" type="submit"> <Nav.Link href="/register">Register</Nav.Link></Button>
        </div>  
      </Form>
    
    </Router>
  );
  //}
}

