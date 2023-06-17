import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, makeStyles, List, Paper, ListItem, ListItemText } from '@material-ui/core';

import ResultsTable from './ResultsTable';

const API_BASE_URL = 'http://localhost:8000/api';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    searchSection: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginRight: theme.spacing(2),
    },
    resultsSection: {
        width: '100%',
    },
    filmItem: {
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    selectedFilm: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));


const FilmsPage = () => {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState('');
    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [filmCharacters, setFilmCharacters] = useState([]);

    const handleSearch = async () => {
        try {
            let response;
            if (searchQuery.trim() === ''){
                response = await axios.get(`${API_BASE_URL}/films`);
            }else{
                response = await axios.get(`${API_BASE_URL}/films?title=${searchQuery}`);

            }
            if (films.length === 1) {
                //Duplicated bit a code can be a single method
                const urlParts = films[0].url.split('/');
                const key = urlParts[urlParts.length - 2];
                await handleFilmSelection(key);
            }
            setFilms(response.data);
            setSelectedFilm(null);
        } catch (error) {
            console.error('Error fetching films:', error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleFilmSelection = async (filmId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/films/${filmId}`);
            const film = response.data;
            const characterUrls = film.characters;

            const characterPromises = characterUrls.map((url) => axios.get(url));
            const characterResponses = await Promise.all(characterPromises);
            const characters = characterResponses.map((response) => response.data);

            setFilmCharacters(characters);
            setSelectedFilm(filmId);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };


    return (
        <div className={classes.container}>
            <Typography variant="h4" component="h2" gutterBottom>
                Star Wars Films
            </Typography>
            <TextField
                label="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="contained" color="primary" onKeyDown={handleKeyPress} onClick={handleSearch}>
                Search
            </Button>
            {films.length > 0 && (
                <div className={classes.resultsSection}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Results:
                    </Typography>
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
                                    className={`${classes.filmItem} ${isSelected ? classes.selectedFilm : ''}`}
                                >
                                    <ListItemText primary={film.title} secondary={`Release Date: ${film.release_date}`} />
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            )}
            {(films.length === 1 || selectedFilm) && filmCharacters.length > 0 && (
                <ResultsTable filmCharacters={filmCharacters} />
            )}
        </div>
    );
};

export default FilmsPage;
