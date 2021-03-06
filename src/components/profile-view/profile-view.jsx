import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

import "./profile-view.scss";
import '../button/button.scss'

import { setUser, updateUser } from "../../actions/actions";
import { connect } from "react-redux";

export class ProfileView extends React.Component {
  constructor() {
    super();
      this.state = {
        Username: null,
        Password: null,
        email: null,
        Birthday: null,
        FavoriteMovies: [],
      };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
      this.getUser(accessToken);
  }

    
  getUser = (token) => {
    const username = localStorage.getItem("user");
    axios
      .get(`https://mymoviesproject.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          email: response.data.email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    
  // Allow user to edit or update profile
  editUser = (e) => {
    e.preventDefault();
      const username = localStorage.getItem("user");
      const token = localStorage.getItem("token");
        axios.put(`https://mymoviesproject.herokuapp.com/users/${username}`,
          {
            Username: this.state.Username,
            Password: this.state.Password,
            email: this.state.email,
            Birthday: this.state.Birthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            this.setState({
              Username: response.data.Username,
              Password: response.data.Password,
              email: response.data.email,
              Birthday: response.data.Birthday,
            });
              localStorage.setItem("user", this.state.Username);
                const data = response.data;
                console.log(data);
                console.log(this.state.Username);
                alert("Profile is updated!");
                window.open(`/users/${username}`, "_self");
          })
          .catch(function (error) {
            console.log(error);
          });
  };

  //Remove a favorite movie
  onRemoveFavorite(e, movie) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log("movie", movie)  
    axios.delete(`https://mymoviesproject.herokuapp.com/users/${username}/movies/${movie._id}`, {
          headers: { Authorization: `Bearer ${token}` },
          method: 'DELETE'
      })
    .then((response) => {
      alert(`Removed From Favorites List`)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // Deregister
  onDeleteUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://mymoviesproject.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response);
      alert("Profile has been deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { movies, onBackClick, user } = this.props;
    const { FavoriteMovies, Username, email, Birthday } = this.state;

    return (
      <Container className="profile-view" align="center">
        <Card className="user-profile">
          <Card.Title>User Profile</Card.Title>
            <Card.Text>
              <div className="profile-container">
                <span className="label">Username: </span>
                <span className="value">{Username}</span>
                <br />
                <br />
                <span className="label">Email: </span>
                <span className="value">{email}</span>
                <br />
                <br />
                <span className="label">Birthday: </span>
                <span className="value">{Birthday}</span>
              </div>
            </Card.Text>
        </Card>
                    
        <Card className="update-profile">
          <Card.Body>
            <Card.Title>Update Profile</Card.Title>
              <Form
                className="update-form"
                  onSubmit={(e) =>
                  this.editUser(e,
                    this.Username,
                    this.Password,
                    this.email,
                    this.Birthday
                  )}
              >
                                                               
              <Form.Group>
                <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                      name="Username"
                      placeholder="New Username"
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="New Email"
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                </Form.Group>
                                    
                <div className="submit-button-div">
                  <Button className="submit-button" type="submit" onClick={this.editUser}>Update User</Button>
                  <Button className="delete-button" onClick={() => this.onDeleteUser()} > Delete User </Button>
                </div>
                
              </Form>

              </Card.Body>
            </Card>
                    
            <Card>
              <Row className="favorite-container">
                <Col>
                  <Card.Body>
                    {FavoriteMovies.length === 0 && (
                      <div className="text-center">No Favorite Movies</div>
                    )}
                    <Row>
                      {FavoriteMovies.length > 0 &&
                        movies.map((movie) => {
                        if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)) {
                          return (
                            
                            <Card className="favorite-movies" key={movie._id} >
                              <Card.Img
                                className="favorite-poster"
                                variant="top"
                                src={movie.ImagePath}
                              />
                              <Card.Body className="favorite-card-body">
                                <Card.Title className="movie-title">
                                  {movie.Title}
                                  </Card.Title>
                                < Button className="delete-button" value={movie._id} 
                                  onClick={(e) => this.onRemoveFavorite(e, movie)}
                                   > Remove from Favorites
                                </Button>
                              </Card.Body>
                            </Card>
                          );
                        }
                      })}
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
      </Container>
    );
  }
}

let mapStateToProps = state => {
    return {
        user: state.user,
        movies: state.movies
    }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);