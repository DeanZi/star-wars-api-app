import React from 'react';
import {
    Paper,
    Typography,
    List, ListItem, ListItemText
} from '@material-ui/core';



const ResultsTable = ({ filmCharacters }) => {
    return (
        <div>
            <Typography variant="h5">Characters:</Typography>
            <List component={Paper}>
                {filmCharacters.map((character) => (
                    <ListItem key={character.name}>
                        <ListItemText
                            primary={character.name}
                            secondary={`Gender: ${character.gender}, Height: ${character.height}`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ResultsTable;
