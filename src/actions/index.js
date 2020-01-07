let pageCount = 1;
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
    console.log("fetching movies for: ", pageCount);
    dispatch(requestMovies());
    return fetch(`https://akrp-server.herokuapp.com/movies?p=${pageCount++}`)
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
