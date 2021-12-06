import React from 'react';
import PropTypes from 'prop-types';


export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
  }
}

MovieCard.propTypes = {
  //props object must include a movie object
  movie: PropTypes.shape({
    //movie prop may contain a title, if it does then it must be a string
    Title: PropTypes.string
  }).isRequired,
  //props object mus contain onMovieClick and it must be a function
  onMovieClick: PropTypes.func.isRequired
};
