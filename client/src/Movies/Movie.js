import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res) => {
        // // response data does not contain array of movies --> just ID
        // console.log("Res", res);
        // setMovieList(res.data);
        // // window.location.reload(history.push("/movies"));
        // history.goBack();
        getMovieList();
        history.goBack();
      })
      .catch((err) => console.log("Error ", err.message));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <>
      <div className="save-wrapper">
        <MovieCard movie={movie} />

        <div className="save-button" onClick={saveMovie}>
          +
        </div>

        <div className="edit-button">
          <Link to={`/update-movie/${movie.id}`}>Edit</Link>
        </div>
        <div className="delete-button" onClick={deleteMovie}>
          Delete
        </div>
      </div>
    </>
  );
}

export default Movie;
