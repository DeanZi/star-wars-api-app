import React, {useState} from 'react';
import axios from 'axios';
import { TextField, Button, Typography, List, Paper, ListItem, ListItemText } from '@material-ui/core';

import ResultsTable from './ResultsTable';
import './FilmsPage.css';

const API_BASE_URL = 'http://localhost:8000/api';

const FilmsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [filmCharacters, setFilmCharacters] = useState([]);
    const [page] = useState(0);
    const [rowsPerPage] = useState(10);


    const handleSearch = async () => {
        try {
            let response;
            if (searchQuery.trim() === ''){
                response = await axios.get(`${API_BASE_URL}/films`);
            }else{
                response = await axios.get(`${API_BASE_URL}/films?title=${searchQuery}`);

            }
            if (films.length === 1) {
                //TODO
                // Move this repeated bit a code can be a single method
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

    //TODO
    // Make the search start on enter - this is not working

    // const handleKeyPress = (event) => {
    //     if (event.key === 'Enter') {
    //         handleSearch();
    //     }
    //};

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
        <div className="container">
            <Typography variant="h4" component="h2" gutterBottom>
                Star Wars Films
            </Typography>
            <TextField
                label="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
            {films.length > 0 && (
                <div className="resultsSection">
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
                                    className={`filmItem ${isSelected ? selectedFilm : ''}`}
                                >
                                    <ListItemText primary={film.title} secondary={`Release Date: ${film.release_date}`} />
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            )}
            {(films.length === 1 || selectedFilm) && filmCharacters.length > 0 && (
                <ResultsTable filmCharacters={filmCharacters} page={page} rowsPerPage={rowsPerPage} />

            )}
        </div>
    );
};

export default FilmsPage;
