import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, makeStyles, Typography, List, ListItem, ListItemText,  } from '@material-ui/core';

const useStyle = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: 'column',
    "& a": {
      color: "inherit",
      textDecoration: 'none'
    },
  },
  title: {
    margin: "20px"
  }
}))

function SavedList({ list }) {
  const classes = useStyle()
  return (
    <Paper className={classes.paper} fixed>
      <Typography variant="h6" gutterBottom className={classes.title}>
        Saved Movies:
      </Typography>
      <List component="nav" aria-label="secondary mailbox folders">
        
      
      {list.map(movie => {
        return (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <ListItem button>
              <ListItemText primary={movie.title} />
            </ListItem>
          </Link>
        );
      })}

      </List>
    </Paper>
  );
}

export default SavedList;
