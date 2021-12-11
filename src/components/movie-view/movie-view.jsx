import React from 'react';
import { Button, Container, } from 'react-bootstrap';

import './movie-view.scss';
import '../button/button.scss'

export class MovieView extends React.Component {
  
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
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-description">
          <span className="description">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-director">
          <span className="director">Director: </span>
          <span className="value">{movie.Director.Name}</span>
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
      </Container>    
    );
  }
} 