import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap'

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import "./main-view.scss";

export class MainView extends React.Component {

  constructor(){
    super(); //initializes components state
    this.state = {  
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
  }
    
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
      }

  getMovies(token) {
    axios.get('https://mymoviesproject.herokuapp.com//movies', {
      headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
      // Assign the result to the state
      this.setState({
      movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
     });
  }  

   /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({ 
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  
  /* When a user logs out sets user state to null */
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  } */

  /* not sure if I need this I think registration will be handled below 
  onRegistration(registration) {
    this.setState({
        registration,
    });
} */
 
render() {
    const { movies, selectedMovie, user, register } = this.state;
    
    return (
    
    <Router>  


    <div className="main-view">
        <Navbar className="main-navbar" expand="lg" >
          <Container fluid>
            <Navbar.Brand href="#home">My Movies</Navbar.Brand>
             <Nav className="me-auto">
               <Nav.Link href="#movies">Movies</Nav.Link>
               <Nav.Link href="#user">Profile</Nav.Link>
               <Nav.Link href="#logout">Logout</Nav.Link>
             </Nav>
           </Container>
         </Navbar>
      
        <Container>
          {selectedMovie
            ? (
              <Row className="justify-content-lg-center">
                <Col md={12} >
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              </Row>
               )
              : (
                <Row className="justify-content-lg-center">
                  { movies.map(movie => (
                    <Col md={4} >
                      <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    </Col>
                    ))
                  }
                </Row>
              )  
          }
        </Container>
      </div>
      </Router>
    );
  }
}