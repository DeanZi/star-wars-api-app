import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome to the swapi app by Dean :)</h1>
            <Link to="./films">
                <button>Go to film search</button>
            </Link>
        </div>
    );
};

export default LandingPage;