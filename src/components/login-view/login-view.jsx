import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { NavbarView } from "../navbar-view/navbar-view"; 

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
    }else if(username.length < 2){
    setUsernameErr('Username must be 2 characters long');
    isReq = false;
    }
    if(!password){
    setPasswordErr('Password Required');
    isReq = false;
    }else if(password.length < 6){
    setPassword('Password must be 6 characters long');
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

  //render() {
    //const { user } = this.state;
       
    return (
    <Router>  
      {/*<NavbarView user={user}/>*/} 
      <Form className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
          {/* code added here to display validation error */}
          {usernameErr && <p>{usernameErr}</p>} 
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {/* code added here to display validation error */}
          {passwordErr && <p>{passwordErr}</p>} 
        </Form.Group>

        <div className="submit-button-div">
          <Button className="submit-button" type="submit" onClick={handleSubmit}>Login</Button>
          <br />
          <br />
          <p>New Users Register Here</p>
          <Button className="submit-button" type="submit"> <Nav.Link href="/register">Register</Nav.Link></Button>
        </div>  
      </Form>
    
    </Router>
  );
  //}
}

