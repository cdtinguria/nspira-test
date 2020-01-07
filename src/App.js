import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import { fetchMovies, selectMovie } from "./actions";

import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";

const App = props => (
  <Switch>
    <Route
      path="/"
      exact
      render={routerProps => (
        <MovieList
          movies={props.movies}
          fetching={props.fetching}
          fetchMovies={props.fetchMovies}
          selectMovie={id => {
            props.selectMovie(id);
            routerProps.history.push(`/${id}`);
          }}
        />
      )}
    />
    <Route
      path="/:movieId"
      exact
      render={() => <MovieDetail movie={props.selectedMovie} />}
    />
  </Switch>
);

// below is using React Hooks...
// function App() {
//   let [movies, setMovies] = React.useState([]);
//   let [pageCount, setPageCount] = React.useState(1);
//   let [fetching, setFetching] = React.useState(false);

//   async function fetchData() {
//     let mvs = await (
//       await fetch(`https://akrp-server.herokuapp.com/movies?p=${pageCount}`)
//     ).json();

//     setFetching(false);
//     setMovies([...movies, ...mvs]);
//   }

//   function onScroll() {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       setPageCount(pageCount + 1);
//     }
//   }

//   React.useEffect(() => {
//     setFetching(true);
//     fetchData();
//     window.addEventListener("scroll", onScroll);
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//     };
//   }, [pageCount]);

//   let movieCards = [];
//   for (let _m of movies) {
//     movieCards.push(
//       <MovieCard movie={_m} key={_m._id} />
//     );
//   }

//   if (fetching)
//     movieCards.push(
//       <img src={logo} className="App-logo" alt="logo" key="fetching" />
//     );

//   return (
//     <div className="container">
//       <div className="row padded">{movieCards}</div>
//     </div>
//   );
// }

const mapStateToProps = state => ({
  movies: state.moviesList.movies,
  fetching: state.moviesList.fetching,
  error: state.moviesList.error,
  selectedMovie: state.movieDetail.detail
});

const mapDispatchToProps = dispatch => ({
  fetchMovies: () => dispatch(fetchMovies()),
  selectMovie: id => dispatch(selectMovie(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
