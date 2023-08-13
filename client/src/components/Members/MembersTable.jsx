import React, {useState} from 'react'
import { Container, Typography, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditMemberModal from './EditMemberModal';
import ReplyIcon from '@mui/icons-material/Reply';
import ReturnBookModal from './ReturnBookModal';
import DeleteMemberModal from './DeleteMemberModal';

const MembersTable = ({ members, setAllMembers }) => {
    const [ editOpen, setEditOpen ] = useState(false);
    const [ member, setMember ] = useState(null)
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const [books, setBooks] = useState([])
    const [returnOpen, setReturnOpen] = useState(false);
    const handleReturnOpen = () => setReturnOpen(true);
    const handleReturnClose = () => setReturnOpen(false);

    const [deleteOpen, setDeleteOpen] = useState(false)
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);
    

  if (members.length !== 0) {
    return (
        <Paper sx={{ padding: '1.5rem', margin: '2rem 0' }}>
            <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>
                Members
            </Typography>
    
            <TableContainer component={Paper} sx={{ marginTop: '2rem', height: '50vh' }}>
                <Table sx={{ minWidth: 150 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: '600' }}>#Id</TableCell>
                            <TableCell sx={{ fontWeight: '600' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: '600' }}>Address</TableCell>
                            <TableCell sx={{ fontWeight: '600' }}>Phone</TableCell>
                            <TableCell align="right" sx={{ fontWeight: '600' }}>Gender</TableCell>
                            <TableCell align="right" sx={{ fontWeight: '600' }}>Debt&nbsp;(rs)</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '600' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {members.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.uid}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell align='right'>{row.phone}</TableCell>
                        <TableCell align='right'>{row.gender}</TableCell>
                        <TableCell align="right">{row.debt}</TableCell>
                        <TableCell align="right" sx={{ display: 'flex' }}>
                            <IconButton color='error' onClick={() => {
                                handleDeleteOpen();
                                setMember(row);
                            }}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => {
                                handleEditOpen();
                                setMember(row);
                            }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => {
                                handleReturnOpen();
                                setMember(row);
                            }}>
                                <ReplyIcon />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
    
            { member && <EditMemberModal member={member} allMembers={members} setAllMembers={setAllMembers} open={editOpen} handleClose={handleEditClose} /> }
            { member && <ReturnBookModal member={member} open={returnOpen} handleClose={handleReturnClose} books={books} setBooks={setBooks} /> }
            { member && <DeleteMemberModal member={member} open={deleteOpen} handleClose={handleDeleteClose} /> }
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

export default MembersTable