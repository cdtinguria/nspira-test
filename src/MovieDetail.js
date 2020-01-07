import React from "react";
import "./MovieCard.css";

const MovieDetail = ({ movie }) => {
  let a = <div>nothing to render</div>;
  if (movie)
    a = (
      <div className="col-sm-4">
        <div className="card">
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            style={{ width: "100%" }}
            alt={movie.original_title}
          />
          <div className="card-body">
            <h5 className="card-title">{movie.original_title}</h5>
            <p>{movie.overview}</p>
            <p>{`Rating: ${movie.vote_average}`}</p>
          </div>
        </div>
      </div>
    );
  return a;
};
export default MovieDetail;
