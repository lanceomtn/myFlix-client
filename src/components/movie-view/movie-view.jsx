import React from 'react';
import axios from 'axios';
import { Button, Container, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { NavbarView } from "../navbar-view/navbar-view";

import './movie-view.scss';
import '../button/button.scss'

export class MovieView extends React.Component {
  
  constructor(props) {
    super(props);
  }

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://mymoviesproject.herokuapp.com/users/favorites/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
      .then(response => {
          alert(`Added to Favorites List`)
      })
      .catch(function (error) {
          console.log(error);
      });
  }; 

  render() {
    const { movie, onBackClick } = this.props;

    {/*<NavbarView user={user}/> */}
    console.log(movie);
    console.log(this.props)
    return (
      <Container fluid className="movie-view-container" align="center">
          <div className="movie-poster">
            <img src={movie.ImagePath}/>
          </div>
          <div className="movie-title">
            <span className="title">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-genre">
            <span className="genre">Genre: </span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </div>
          <div className="movie-description">
            <span className="description">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-director">
            <span className="director">Director: </span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
          </div>
          <div className="movie-year">
            <span className="year">Year: </span>
            <span className="value">{movie.Year}</span>
          </div>
          <div className="movie-button-div">
            <Button className="submit-button" onClick={() => { onBackClick(null); }}>Back</Button>
            <Button className="submit-button" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>
          </div>
        </Container>    
    );
  }
} 