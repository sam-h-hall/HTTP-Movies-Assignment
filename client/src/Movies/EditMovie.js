import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export const EditMovie = ({ getMovieList }) => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const { goBack } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
        movie.stars = res.data.stars.join(", ");
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    e.persist();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, {
        ...movie,
        stars: movie.stars.split(", "),
      })
      .then((res) => {
        console.log("EditMovie Res", res.data);
        getMovieList();
        goBack();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button onClick={() => goBack()} style={{ marginLeft: "20px" }}>
        Go Back
      </button>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          width: "200px",
          margin: "0 auto",
          flexFlow: "column nowrap",
          justifyContent: "space-between",
        }}>
        Title
        <input
          type="text"
          name="title"
          value={movie.title}
          placeholder={movie.title}
          onChange={handleChange}
        />
        <br />
        Director
        <input
          type="text"
          name="director"
          value={movie.director}
          placeholder={movie.director}
          onChange={handleChange}
        />
        <br />
        Metascore
        <input
          type="text"
          name="metascore"
          value={movie.metascore}
          placeholder="metascore"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="stars"
          placeholder={"stars"}
          onChange={handleChange}
          value={movie.stars}
        />
        <br />
        <button
          type="submit"
          style={{ backgroundColor: "green", color: "white", height: "30px" }}>
          Update
        </button>
      </form>
    </div>
  );
};
