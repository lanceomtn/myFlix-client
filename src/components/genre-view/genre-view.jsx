import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';


import '../button/button.scss';
import './genre-view.scss';

export function GenreView (props) {
  const { Genre, onBackClick } = props
  console.log('movies',props)
  return (
    <Row className="genre-view">
      <Col>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{Genre.Genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{Genre.Genre.Description}</span>
        </div>
    
        <Button className="submit-button" onClick={() => { onBackClick(null); }}>Back</Button>
      </Col>
    </Row>
  )
}