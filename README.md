# SWAPI App

This is a simple web application that uses the Star Wars API (SWAPI) to search for films and display their associated characters. The app consists of a React frontend and a Node.js Express backend.

## Features

- Search films by title
- Display film associated characters
- Pagination of character results
- Dockerized deployment

## Prerequisites

Before running the app, make sure you have the following dependencies installed:

- Node.js
- Yarn 

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:DeanZi/star-wars-api-app.git

2. Install dependencies

    ```bash
    cd star-wars-api-app/
    yarn install
    cd backend/
    yarn install
   
## Testing

Created a backend tests using Mocha,
frontend tests are not currently implemented.

## Deployment with Docker

1. Build the Docker images:

    ```bash
    cd star-wars-api-app/
    docker build -t swapi-frontend .
    cd backend/
    docker build -t swapi-backend .
   
2. Run the docker containers:

    ```bash
    docker run -d -p 8000:8000 swapi-backend
    docker run -d -p 3000:3000 swapi-frontend
   
3. Access the SWAPI app in your browser at http://localhost:3000.

## Note 
The backend uses swapi-node to fetch data from the Star Wars API. You can find more information about the library [here](https://www.npmjs.com/package/swapi-node).

## To be done
* Add more tests
* Separate long files into logical parts
* Handle bad requests
* Bug fixes

