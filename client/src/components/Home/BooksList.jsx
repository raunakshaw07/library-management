import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import BookIcon from '@mui/icons-material/MenuBook';

const Books = ({books}) => {
    const navigate = useNavigate();
  
    if (books.length !== 0) {
        return (
            <Paper sx={{ padding: '1.5rem' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bolder', display: 'flex', alignItems: 'center' }}>
                    <BookIcon sx={{ marginRight: '1rem' }} />
                    New Books
                </Typography>
        
                <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
                    <Table sx={{ minWidth: 150 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '600' }}>#Id</TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>Authors</TableCell>
                                <TableCell align="right" sx={{ fontWeight: '600' }}>Average Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {books.map((row) => (
                            <TableRow
                            key={row.bid}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                #{row.bid}
                            </TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.authors}</TableCell>
                            <TableCell align="right">{row.average_rating}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        
                <Button variant='contained' sx={{ marginTop: '2rem' }} onClick={() => navigate('/members')}>List All</Button>
            </Paper>
        )
    } else {
        return (
            <Container sx={{ display: 'flex', height: '20rem', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>
                    Loading...
                </Typography>
            </Container>
        )
    }
}

export default Books