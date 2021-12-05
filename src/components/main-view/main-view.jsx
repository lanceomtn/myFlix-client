import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

let imgPath = './img/';

export default class MainView extends React.Component {

  constructor(){
    super(); //initializes components state
    this.state = {
      movies: [
        { _id: 1, Title: 'Silence of the Lambs', Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.', ImagePath: imgPath + 'Silence.jpg', Genre:'Thriller', Director:'Jonathan Demme'},
        { _id: 2, Title: '40 Year Old Virgin', Description: 'Goaded by his buddies, a nerdy guy whos never done the deed only finds the pressure mounting when he meets a single mother.', ImagePath: imgPath + '40Year.jpg', Genre:'Comedy', Director:'Judd Apatow'},
        { _id: 3, Title: 'Catch Me If You Can', Description: 'Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.', ImagePath: imgPath + 'CatchMe.jpg', Genre:'Biography', Director:'Steven Spielberg'}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)
        }
      </div>
    );
  }
} 