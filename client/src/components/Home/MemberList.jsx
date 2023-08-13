import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const MemberList = ({ members }) => {
    const navigate = useNavigate();
  
    if (members.length !== 0) {
        return (
            <Paper sx={{ padding: '1.5rem' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bolder', display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ marginRight: '1rem' }} />
                    New Members
                </Typography>
        
                <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
                    <Table sx={{ minWidth: 150 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '600' }}>#Id</TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>Name</TableCell>
                                <TableCell align="right" sx={{ fontWeight: '600' }}>Debt&nbsp;(rs)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {members.map((row) => (
                            <TableRow
                            key={row.uid}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.uid}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.debt}</TableCell>
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

export default MemberList