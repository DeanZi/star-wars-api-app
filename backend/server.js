const express = require('express');
const swapi = require('swapi-node');
const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors());

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

app.get('/api/films/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { expand } = req.query;
        let film = await swapi.get(`films/${id}`);

        if (expand) {
            const expandFields = expand.split(',');
            film = await expandSubresource(film, expandFields);
        }

        res.json(film);
    } catch (error) {
        console.error('Error fetching film data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function expandSubresource(resource, expandFields) {

    for (const field of expandFields) {
        if (resource[field]) {
            resource[field] = await expandField(resource[field]);
        }
    }

    return resource;
}

async function expandField(field) {
    if (Array.isArray(field)) {
        console.log(`This is the field ${field}`)
        return Promise.all(field.map(async (url) => {
            console.log(`This is the mapped url ${url}`)
            return await swapi.get(url);
        }));
    } else {
        return swapi.get(field);
    }
}



const port = 8000; // Replace with your desired port number
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
