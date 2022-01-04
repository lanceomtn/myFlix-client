import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

//filterVisability reducer
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

//movies reducer
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

//groups all the reducers together and only passes them the state they’re concerned with
const moviesApp = combineReducers({
  visibilityFilter,
  movies
});

export default moviesApp;