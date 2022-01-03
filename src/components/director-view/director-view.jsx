import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import "./director-view.scss";
import '../button/button.scss'

 export function DirectorView (props)  {
  const { Director, onBackClick } = props; 
  

  return (
    <div className="director-view">
      <div className="movie-director">
        <span className="director">Director: </span>
        <span className="value">{Director.Name}</span>
      </div>
      <div className="director-bio">
        <span className="label">Biography: </span>
        <span className="value">{Director.Bio}</span>     
      </div>  
      <div className="director-birthyear">
        <span className="label">Year of Birth: </span>
        <span className="value">{Director.Birth}</span>      
      </div>
      <Button className="submit-button" onClick={() => { onBackClick(null); }}>Back</Button>
    </div>
  )}