import { combineReducers } from "redux";

const moviesList = (
  state = { fetching: false, error: false, movies: [] },
  action
) => {
  switch (action.type) {
    case "REQUEST_MOVIES":
      return {
        fetching: true,
        error: false,
        movies: [...state.movies]
      };
    case "RECEIVE_MOVIES":
      return {
        fetching: false,
        error: false,
        movies: [...state.movies, ...action.movies]
      };
    case "RECEIVE_MOVIES_ERROR":
      return {
        fetching: false,
        error: true,
        movies: [...state.movies]
      };
    default:
      return state;
  }
};

const movieDetail = (state = {}, action) => {
  switch (action.type) {
    case "REQUEST_MOVIE_DETAIL":
      return {
        fetching: true,
        error: false
      };
    case "RECEIVE_MOVIE_DETAIL":
      return {
        fetching: false,
        error: false,
        detail: action.detail[0]
      };

    case "RECEIVE_MOVIE_DETAIL_ERROR":
      return {
        fetching: false,
        error: true,
        detail: {}
      };

    default:
      return state;
  }
};

const moviesReducer = combineReducers({
  moviesList,
  movieDetail
});
export default moviesReducer;
