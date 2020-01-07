const moviesReducer = (
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

export default moviesReducer;
