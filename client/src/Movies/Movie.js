import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setNeedToUpd }) {
  const history = useHistory()
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = () => {
    history.push(`/update-movie/${params.id}`)
  }

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setNeedToUpd(true)
        history.push("/")
      })
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <MovieCard movie={movie} saveMovie={saveMovie} updateMovie={updateMovie} deleteMovie={deleteMovie} hideButtons={false}/>
  );
}

export default Movie;
