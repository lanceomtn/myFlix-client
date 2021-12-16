import React from 'react';
import axios from 'axios';
import { Button, Container, } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './movie-view.scss';
import '../button/button.scss'

export class MovieView extends React.Component {
  
  constructor(props) {
    super(props);
}

addFavoriteMovie() {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');

  axios.post(`https://mymoviesproject.herokuapp.com/user/favorites/${username}/movies/${this.props.movie._id}`, {}, {
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
    
    return (
      <Container className="movie-view-container">
        <div className="movie-poster">
          <img src={movie.ImagePath}/>
        </div>
        <div className="movie-title">
          <span className="title">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-genre">
          <span className="genre">Genre: </span>
          <Link to={`/genres/${movie.Genre.Name}`} className="value">{movie.Genre.Name}</Link>
        </div>
        <div className="movie-description">
          <span className="description">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-director">
          <span className="director">Director: </span>
          <Link to={`/directors/${movie.Director.Name}`} className="value">{movie.Director.Name}</Link>
        </div>
        <div className="movie-year">
          <span className="year">Year: </span>
          <span className="value">{movie.Year}</span>
        </div>
        <div className="submit-button-div">
        <Button 
          className="submit-button" onClick={() => { onBackClick(null); }} >Back
        </Button>
        </div>
        <Button>
          className="submit-button" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)} >Add to Favorites
        </Button>
      </Container>    
    );
  }
} 