import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from "./Movies/UpdateMovie";
import NavBar from "./Movies/NavBar";
import { Grid, makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  grid: {
    '& a': {
      textDecoration: 'none'
    },
    '& .MuiPaper-root': {
      marginBottom: 10
    }
  }
}))

const App = () => {
  const history = useHistory()
  const classes = useStyle()
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [needToUpd, setNeedToUpd] = useState(true)

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    if(needToUpd) {
      getMovieList();
      setNeedToUpd(false)
    }
  }, [needToUpd]);



  return (
    <>
    <NavBar/>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SavedList list={savedList} />
        </Grid>
        <Grid item xs={9} className={classes.grid}>
          <Route exact path="/">
            <MovieList movies={movieList} />
          </Route>
          <Route path="/movies/:id">
            <Movie addToSavedList={addToSavedList} setNeedToUpd={setNeedToUpd} />
          </Route>
          <Route path="/update-movie/:id">
            <UpdateMovie setNeedToUpd={setNeedToUpd}/>
          </Route>
        </Grid>
      </Grid>
      

      
    </>
  );
};

export default App;
