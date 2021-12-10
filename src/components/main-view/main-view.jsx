import React from 'react';
import axios from 'axios';
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
      user: null
    };
  }

  componentDidMount(){
    axios.get('https://mymoviesproject.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
   /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
   setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    //if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    /*if there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    /* Before the movies have been loaded */
    if (movies.length === 0) return <div className="main-view" />;

    return (
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
    );
  }
}