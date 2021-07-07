import React from 'react';
import { Card, CardActionArea, CardContent, CardActions, Button, Typography } from '@material-ui/core';

const MovieCard = props => {
  const {id, title, director, metascore, stars } = props.movie;
  return (
    <Card >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Director: {director}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            MetaScore: {metascore}
          </Typography>
          <Typography variant="h6" component="p">
            Actors
          </Typography>
          {
            stars.map(star => (
              <Typography variant="subtitle2" component="p">
                {star}
              </Typography>
            ))
          }
        </CardContent>
      </CardActionArea>
      {props.hideButtons ? null : 
        <CardActions>
          <Button size="small" color="primary" onClick={props.saveMovie}>
            Save
          </Button>
          <Button size="small" color="primary" onClick={props.updateMovie}>
            Update
          </Button>
          <Button size="small" color="secondary" onClick={() => {props.deleteMovie(id)}}>
            Delete
          </Button>
        </CardActions>
      }
    </Card>
  );
};

export default MovieCard;
