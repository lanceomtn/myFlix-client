import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';
import '../button/button.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;  //do I still need onMovieClick?

    return (
      <Container className="movie-container">
        <CardGroup>
          <Card className="movie-card text-center" >
            <Card.Img className="card-image" variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{movie.Description}</Card.Subtitle>
              <Link to={`/movies/${movie._id}`} >
              <div className = "submit-button-div">
                <Button 
                  className="submit-button" onClick={() => onMovieClick(movie)} >Details
                </Button>
              </div>
              </Link>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};


