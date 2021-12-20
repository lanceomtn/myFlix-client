import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'

import { NavbarView } from "../navbar-view/navbar-view";
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';

import "./main-view.scss";

export class MainView extends React.Component {

  constructor(){
    super(); //initializes components state
    this.state = {  
      movies: [],
      user: null
      //register: null
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({ 
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  
  getMovies(token) {
    axios.get('https://mymoviesproject.herokuapp.com/movies', {
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

  //When a user logs out sets user state to null
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open("/", "_self");
  }  
  
  render() {
    const { movies, user } = this.state;
          
    return (
      <Router>  
        <NavbarView user={user}/>  
          
          <Container fluid className="main-view" align="center">
            <Row>
              <Route exact path="/" render={() => {
                if (!user) return <Col>
                  <LoginView movies={movies}
                onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />
                  return movies.map(m => (
                  <Col lg={4} md={3} key={m.id}>
                  <MovieCard movie={m} />
                  </Col>
                ))
              }} />
              <Route path="/register" render={() => {  
                return <Col lg={8} md={8}>
                <RegistrationView />
                </Col>
              }} />
              <Route path="movies/:id" render={({ match, history }) => {
                return <Col md={8}>
                  <MovieView movie={movies.find(m => m.id === match.params.id)} onBackClick={() => history.goBack()} />
                </Col>
              }} />
              <Route path="/director/:Name"
                render={({match, history}) => {
                  return <Col>
                  <DirectorView movie={movies.find(m => m._id === match.params.id )} onBackClick={() => history.goBack()} />
                  </Col>
              }} />
              <Route path="/genre/:Name"
                render={({match, history}) => {
                  return <Col>
                  <GenreView movie={movies.find(m => m._id === match.params.id )} onBackClick={() => history.goBack()} />
                  </Col>
              }} />
              <Route path={`/users/${user}`}
                render={({match, history}) => {
                  if (!user) return <Redirect to="/" />
                  return <Col>
                    <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()}/>
                  </Col>
              }} />
              <Route path={`/user-update/${user}`}  //I dont have a user-update endpoint
                render={({match, history}) => {
                  if (!user) return <Redirect to="/" />
                  return <Col>
                    <UserUpdate user={user} onBackClick={() => history.goBack()}/>       
                  </Col>
              }} />
            </Row>
          </Container>
      </Router>
    );
  }
}