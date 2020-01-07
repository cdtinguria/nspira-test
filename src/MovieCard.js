import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, selectMovie }) => (
  <div className="col-sm-2" onClick={() => selectMovie(movie._id)}>
    <div className="card">
      <img
        className="card-img-top"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        style={{ width: "100%" }}
        alt={movie.original_title}
      />
      <div className="card-body">
        <h5 className="card-title">{movie.original_title}</h5>
      </div>
    </div>
  </div>
);

export default MovieCard;
