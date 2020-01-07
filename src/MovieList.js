import React from "react";
import logo from "./logo.svg";
import "./App.css";

import MovieCard from "./MovieCard";

class MovieList extends React.Component {
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
  };

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

export default MovieList;
