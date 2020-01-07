import React from "react";
import logo from "./logo.svg";
import "./App.css";

import MovieCard from "./MovieCard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageCount: 1,
      fetching: false,
      error: false
    };

    window.addEventListener("scroll", this.onScroll);
  }

  async componentDidMount() {
    this.setState({
      fetching: true
    });

    let mvs = await (
      await fetch(
        `https://akrp-server.herokuapp.com/movies?p=${this.state.pageCount}`
      ).catch(() =>
        this.setState({
          error: true,
          fetching: false
        })
      )
    ).json();
    
    this.setState({
      movies: [...this.state.movies, ...mvs],
      fetching: false,
      error: false
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.setState({
        pageCount: this.state.pageCount + 1
      });
    }
  }

  render() {
    let movieCards = [];
    for (let _m of this.state.movies) {
      movieCards.push(<MovieCard movie={_m} key={_m._id} />);
    }

    if (this.state.fetching)
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

export default App;
