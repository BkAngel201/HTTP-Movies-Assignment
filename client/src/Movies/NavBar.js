import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    navbar: {
        "& a": {
            textDecoration: 'none'
        },
    },
    button: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  }));

function NavBar() {
    const classes = useStyles()
    return (
        <AppBar position="static" className={classes.navbar}>
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    Movies
                </Typography>
                <Link to="/" ><Button color="default" variant="contained" className={classes.button}>Home</Button></Link>
                <Link to="/add-movie" ><Button color="secondary" variant="contained" className={classes.button}>Add Movie</Button></Link>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar