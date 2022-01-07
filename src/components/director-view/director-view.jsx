import React from 'react';
import { Button } from 'react-bootstrap';

import "./director-view.scss";
import '../button/button.scss'

 export function DirectorView (props)  {
  const { Director, onBackClick } = props; 
  
console.log('Director', props)
  return (
    <div className="director-view">
      <div className="movie-director">
        <span className="director">Director: </span>
        <span className="value">{Director.Director.Name}</span>
      </div>
      <div className="director-bio">
        <span className="label">Biography: </span>
        <span className="value">{Director.Director.Bio}</span>     
      </div>  
      <div className="director-birthyear">
        <span className="label">Year of Birth: </span>
        <span className="value">{Director.Director.Birth}</span>      
      </div>
      <Button className="submit-button" onClick={() => { onBackClick(null); }}>Back</Button>
    </div>
  )}