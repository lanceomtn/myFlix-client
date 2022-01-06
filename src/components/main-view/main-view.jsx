import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { setMovies } from '../../actions/actions'
import MoviesList from '../movies-list/movies-list'
import { Container, Row, Col } from 'react-bootstrap'

import { NavbarView } from '../navbar-view/navbar-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView} from '../director-view/director-view';

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

      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render() {
    let { movies } = this.props;
    let { user } = this.state;

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
                if (movies.length === 0) return <div className="main-view" />;
                //movie filter 
                return <MoviesList movies={movies} />; 
                
               }}
             />
             
              <Route path="/register" render={() => {  
                return <Col>
                <RegistrationView />
                </Col>
              }} />
              <Route path="/movies/:id" render={({ match, history }) => {
                return <Col>
                <MovieView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />
                </Col>
              }} />
              <Route path="/directors/:Name"
                render={({match, history}) => {
                  return <Col>
                  <DirectorView Director={movies.find(m => m.Director.Name === match.params.Name )} onBackClick={() => history.goBack()} />
                  </Col>
              }} />
              <Route path="/genres/:Name"
                render={({match, history}) => {
                  return <Col>
                  <GenreView Genre={movies.find(m => m.Genre.Name === match.params.Name )} onBackClick={() => history.goBack()} />
                  </Col>
              }} />
              <Route path={`/users/${user}`}
                render={({match, history}) => {
                  if (!user) return <Redirect to="/" />
                  return <Col>
                    <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()}/>
                  </Col>
              }} />
              <Route path={`/user-update/${user}`}
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

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);