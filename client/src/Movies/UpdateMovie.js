import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom';

function UpdateMovie(props) {
    const history = useHistory()
    const [movie, setMovie] = useState(null)
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
              setMovie(res.data)
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
        fetchMovie(params.id)
    },[params.id])

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
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formValues.name} onChange={handleChange} />
            <input type="text" name="director" value={formValues.director} onChange={handleChange} />
            <input type="text" name="metascore" value={formValues.metascore} onChange={handleChange} />
            <input type="text" name="actors" value={formValues.actors.join(',')} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default UpdateMovie