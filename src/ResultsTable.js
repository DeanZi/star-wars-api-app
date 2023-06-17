import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, makeStyles, TablePagination } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        marginBottom: theme.spacing(2),
    },
}));

const ResultsTable = ({ filmCharacters }) => {
    const classes = useStyles();

    // Pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // This is to know how many rows are to be added to the table to maintain a consistent height.
    // For example, if there are 15 characters in total and the current page is the 2nd (1, zero based)
    // with the rowsPerPage set to 10, this calculation would yield (10 - min(10, (15 - 1 * 10) = 5)) = 5.
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filmCharacters.length - page * rowsPerPage);

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Height</TableCell>
                        <TableCell>Mass</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filmCharacters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((character) => (
                        <TableRow key={character.name}>
                            <TableCell>{character.name}</TableCell>
                            <TableCell>{character.gender}</TableCell>
                            <TableCell>{character.height}</TableCell>
                            <TableCell>{character.mass}</TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={4} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filmCharacters.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage} // Add this line to handle page change
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default ResultsTable;
