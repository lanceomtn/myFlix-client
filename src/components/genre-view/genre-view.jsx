import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';


import '../button/button.scss';
import './genre-view.scss';

export function GenreView (props) {
  const { Genre, onBackClick,  } = props
  
  return (
    <Row className="genre-view">
      <Col>
        <div className="genre-name">
          <span className="label">Genre: </span>
          <span className="value">{Genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{Genre.Description}</span>
        </div>
    
        <Button className="submit-button" onClick={() => { onBackClick(null); }}>Back</Button>
      </Col>
    </Row>
  )
}