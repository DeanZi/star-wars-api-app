const express = require('express');
const swapi = require('swapi-node');
const app = express();

app.get('/api/films', async (req, res) => {
    try {
        // Get the filter parameter value from the request query
        const { title } = req.query;

        // Make a request to the Star Wars API to fetch the films
        const films = await swapi.get('films');

        // Filter the films based on the title parameter
        const filteredFilms = title
            ? films.results.filter((film) =>
                film.title.toLowerCase().includes(title.toLowerCase())
            )
            : films.results;

        res.json(filteredFilms);
    } catch (error) {
        console.error('Error fetching film data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const port = 8000; // Replace with your desired port number
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
