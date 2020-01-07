let pageCount = 1;
const baseUrl = "https://akrp-server.herokuapp.com/movies";

export const REQUEST_MOVIES = "REQUEST_MOVIES";
function requestMovies() {
  return {
    type: REQUEST_MOVIES
  };
}

export const RECEIVE_MOVIES = "RECEIVE_MOVIES";
function receiveMovies(json) {
  return {
    type: RECEIVE_MOVIES,
    movies: json
  };
}

export const RECEIVE_MOVIES_ERROR = "RECEIVE_MOVIES_ERROR";
function receiveMoviesError() {
  return {
    type: RECEIVE_MOVIES_ERROR
  };
}

export function fetchMovies() {
  return function(dispatch) {
    dispatch(requestMovies());
    return fetch(`${baseUrl}?p=${pageCount++}`)
      .then(
        response => response.json(),
        error => {
          console.log("An error occured", error);
          pageCount--;
          dispatch(receiveMoviesError());
        }
      )
      .then(json => dispatch(receiveMovies(json)));
  };
}

export const REQUEST_MOVIE_DETAIL = "REQUEST_MOVIE_DETAIL";
function requestMovieDetail() {
  return {
    type: REQUEST_MOVIE_DETAIL
  };
}

export const RECEIVE_MOVIE_DETAIL = "RECEIVE_MOVIE_DETAIL";
function receivedMovieDetail(json) {
  return {
    type: RECEIVE_MOVIE_DETAIL,
    detail: json
  };
}

export const RECEIVE_MOVIE_DETAIL_ERROR = "RECEIVE_MOVIE_DETAIL_ERROR";
function receiveMovieDetialError() {
  return {
    type: RECEIVE_MOVIE_DETAIL_ERROR
  };
}

export function selectMovie(id) {
  return function(dispatch) {
    dispatch(requestMovieDetail());
    return fetch(`${baseUrl}/${id}`)
      .then(
        response => response.json(),
        err => {
          console.log("An error occured fetching movie detail", err);
          dispatch(receiveMovieDetialError());
        }
      )
      .then(json => dispatch(receivedMovieDetail(json)));
  };
}
