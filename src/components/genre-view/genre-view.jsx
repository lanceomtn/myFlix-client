import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import "./genre-view.scss";
import '../button/button.scss'

export function GenreView (props) {
  const { genre } = props
   
    return (
      <Row className="genre-view">
        <Col>
          <div className="genre-name">
            <span className="label">Name: </span>
            <span className="value">{genre.Name}</span>
          </div>
          <div className="genre-description">
            <span className="label">Description: </span>
            <span className="value">{genre.Description}</span>
          </div>
          <Button className="submit-button" onClick={() => { onBackClick(null); }}>Back</Button>
        </Col>
      </Row>
    )
}