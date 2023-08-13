import React, {useState} from 'react'
import { Container, Typography, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EditBookModal from './EditBookModal';
import IssueBookModal from './IssueBookModal';

const BooksTable = ({ books }) => {
    const [ editOpen, setEditOpen ] = useState(false);
    const [ singleBook, setSingleBook ] = useState(null)
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const [ issueOpen, setIssueOpen ] = useState(false);
    const handleIssueOpen = () => setIssueOpen(true);
    const handleIssueClose = () => setIssueOpen(false);

  if (books[0] !== undefined) {
    return (
        <Paper sx={{ padding: '1.5rem', margin: '2rem 0' }}>
            <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>
                Books
            </Typography>
    
            <TableContainer component={Paper} sx={{ marginTop: '2rem', maxHeight: '50vh' }}>
                <Table sx={{ minWidth: 150 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: '600' }}>#Id</TableCell>
                            <TableCell sx={{ fontWeight: '600' }}>ISBN</TableCell>
                            <TableCell sx={{ fontWeight: '600' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: '600' }}>Authors</TableCell>
                            <TableCell sx={{ fontWeight: '600' }}>Publisher</TableCell>
                            <TableCell align="right" sx={{ fontWeight: '600' }}>Publication Date</TableCell>
                            <TableCell align="right" sx={{ fontWeight: '600' }}>Number of Copies</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '600' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {books.map((row) => (
                        <TableRow key={row.bid}>
                        <TableCell component="th" scope="row">
                            #{row.bid}
                        </TableCell>
                        <TableCell>{row.isbn}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.authors}</TableCell>
                        <TableCell>{row.publisher}</TableCell>
                        <TableCell align="right">{row.publication_date}</TableCell>
                        <TableCell align="right">{row.copies}</TableCell>
                        <TableCell align="right" sx={{ display: 'flex' }}>
                            <IconButton color='error'>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => {
                                handleEditOpen();
                                setSingleBook(row);
                            }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => {
                                handleIssueOpen();
                                setSingleBook(row);
                            }}>
                                <AutoStoriesIcon />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
    
            { singleBook && <EditBookModal book={singleBook} setBook={setSingleBook} open={editOpen} handleClose={handleEditClose} /> }
            { singleBook && <IssueBookModal book={singleBook} open={issueOpen} handleClose={handleIssueClose} /> }
        </Paper>
    )
  } else {
    return (
        <Container sx={{ display: 'flex', height: '20rem', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>
                No Book Found
            </Typography>
        </Container>
    )
  }
}

export default BooksTable