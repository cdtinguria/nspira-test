import React from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";

import { fetchMovies } from "./actions";

import MovieCard from "./MovieCard";

class App extends React.Component {
  constructor(props) {
    super(props);
    window.addEventListener("scroll", this.onScroll);
  }

  async componentDidMount() {
    this.props.fetchMovies();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.props.fetchMovies();
    }
  }

  render() {
    let movieCards = [];

    for (let _m of this.props.movies) {
      movieCards.push(<MovieCard movie={_m} key={_m._id} />);
    }

    if (this.props.fetching)
      movieCards.push(
        <img src={logo} className="App-logo" alt="logo" key="fetching" />
      );

    return (
      <div className="container">
        <div className="row padded">{movieCards}</div>
      </div>
    );
  }
}

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
  movies: state.movies,
  fetching: state.fetching,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  fetchMovies: () => dispatch(fetchMovies())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
