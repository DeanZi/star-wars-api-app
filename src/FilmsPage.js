import React, { useState } from 'react';
import axios from 'axios';
import {TextField, Button, Typography, makeStyles, List, Paper, ListItem, ListItemText} from '@material-ui/core';

import ResultsTable from './ResultsTable';


const API_BASE_URL = 'http://localhost:8000/api';

const useStyles = makeStyles((theme) => ({
    selectedFilm: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

const FilmsPage = () => {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState('');
    const [films, setFilms] = useState([]);
    const [filmCharacters, setFilmCharacters] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/films?title=${searchQuery}`);
            setFilms(response.data);
            setSelectedFilm(null);
        } catch (error) {
            console.error('Error fetching films:', error);
        }
    };

    const handleFilmSelection = async (filmId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/films/${filmId}`);
            const film = response.data;
            const characterUrls = film.characters;

            const characterPromises = characterUrls.map(url => axios.get(url));
            const characterResponses = await Promise.all(characterPromises);
            const characters = characterResponses.map(response => response.data);

            setFilmCharacters(characters);
            setSelectedFilm(filmId);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4">Star Wars Films</Typography>
            <TextField
                label="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
            {films.length > 0 && (
                <div>
                    <Typography variant="h5">Results:</Typography>
                    <List component={Paper}>
                        {films.map((film) => {
                            const urlParts = film.url.split('/');
                            const key = urlParts[urlParts.length - 2];
                            const isSelected = selectedFilm === key;

                            return (
                                <ListItem
                                    key={key}
                                    button
                                    onClick={() => handleFilmSelection(key)}
                                    className={isSelected ? classes.selectedFilm : ''}
                                >
                                    <ListItemText primary={film.title} secondary={`Release Date: ${film.release_date}`} />
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            )}
            {filmCharacters.length > 0 && <ResultsTable filmCharacters={filmCharacters} />}
        </div>
    );
};

export default FilmsPage;
