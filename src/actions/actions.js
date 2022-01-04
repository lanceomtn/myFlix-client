//define action variables
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

//action creators

//initializes the movies property
export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

//changes the visibilityFilter property
export function setFilter(value) {
    return { type: SET_FILTER, value };
}