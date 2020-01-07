import React from "react";
import logo from "./logo.svg";
import "./App.css";

import MovieCard from "./MovieCard";

function App() {
  let [movies, setMovies] = React.useState([]);
  let [pageCount, setPageCount] = React.useState(1);
  let [fetching, setFetching] = React.useState(false);

  async function fetchData() {
    let mvs = await (
      await fetch(`https://akrp-server.herokuapp.com/movies?p=${pageCount}`)
    ).json();

    setFetching(false);
    setMovies([...movies, ...mvs]);
  }

  function onScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPageCount(pageCount + 1);
    }
  }

  React.useEffect(() => {
    setFetching(true);
    fetchData();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pageCount]);

  let movieCards = [];
  for (let _m of movies) {
    movieCards.push(
      <MovieCard movie={_m} key={_m._id} />
    );
  }

  if (fetching)
    movieCards.push(
      <img src={logo} className="App-logo" alt="logo" key="fetching" />
    );

  return (
    <div className="container">
      <div className="row padded">{movieCards}</div>
    </div>
  );
}

export default App;
