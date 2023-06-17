import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const LandingPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant="h3" component="h3" align="center" gutterBottom>
                Welcome to the swapi app by Dean :)
            </Typography>
            <Link to="/films">
                <Button variant="contained" color="primary" className={classes.button}>
                    Go to Film Search
                </Button>
            </Link>
        </div>
    );
};

export default LandingPage;
