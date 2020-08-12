import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom';
import { TextField, Paper, makeStyles, Typography, Button } from '@material-ui/core';


const useStyle = makeStyles(() => ({
    form: {
        '& .MuiPaper-root': {
            padding: "30px 120px"
        },
        '& .MuiFormControl-root': {
            margin: "10px 0"
        }
    }
}))

function UpdateMovie(props) {
    const classes = useStyle()
    const history = useHistory()
    const [formValues, setFormValues] = useState({
        name: '',
        director: '',
        metascore: '',
        actors: []
    })
    const params = useParams()

    const fetchMovie = (id) => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => {
              setFormValues({
                name: res.data.title,
                director: res.data.director,
                metascore: res.data.metascore,
                actors: res.data.stars
            })
            })
          .catch((err) => console.log(err.response));
      };

    useEffect(() => {
        if(!props.addMethod) {
            fetchMovie(params.id)
        }
        
    },[params.id, props.addMethod])

    const handleChange = (e) => {
        if(e.target.name === 'actors') {
            console.log(e.target.value.split(","));
            setFormValues({
                ...formValues,
                actors: e.target.value.split(",")
            })
        } else {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(props.addMethod) {
            axios
                .post(`http://localhost:5000/api/movies`,{
                title: formValues.name,
                director: formValues.director,
                metascore: formValues.metascore,
                stars: formValues.actors,
            })
            .then(res => {
                props.setNeedToUpd(true)
                history.push(`/`)
            })
            .catch(err => console.log(err.message))
        } else (
            axios
                .put(`http://localhost:5000/api/movies/${params.id}`,{
                title: formValues.name,
                director: formValues.director,
                metascore: formValues.metascore,
                stars: formValues.actors,
                id: params.id
            })
            .then(res => {
                props.setNeedToUpd(true)
                history.push(`/movies/${params.id}`)
            })
            .catch(err => console.log(err.message))
        )
        
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <Paper>
                <Typography variant="h5" gutterBottom>
                    {props.addMethod ? "Add" : "Update"} Movie Info
                </Typography>
                <TextField fullWidth label="Title" variant="outlined" name="name" value={formValues.name} onChange={handleChange}/>
                <TextField fullWidth label="Director" variant="outlined" name="director" value={formValues.director} onChange={handleChange} />
                <TextField fullWidth label="MetaScore" variant="outlined" name="metascore" value={formValues.metascore} onChange={handleChange}/>
                <TextField fullWidth label="Stars" variant="outlined" name="actors" value={formValues.actors.join(',')} onChange={handleChange}/>
                <Button type="submit" variant="outlined" color="primary">
                    Submit
                </Button>
            </Paper>
            
        </form>
    )
}

export default UpdateMovie