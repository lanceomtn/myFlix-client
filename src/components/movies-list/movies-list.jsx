import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <Container>

    <Row>
      <Col lg={6} md={6} sm={6} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
    </Row>
    <Row>
    {filteredMovies.map(m => (
      <Col lg={3} md={4} sm={6} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))}
    </Row>
  </Container>;
}

export default connect(mapStateToProps)(MoviesList);