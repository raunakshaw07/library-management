import React, {useEffect, useState} from 'react'
import { Typography, Box, Button, Modal, ListItem, ListItemText, Collapse, IconButton, Alert } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { transaction, users, books as booksRoute } from '../../routes';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 'none',
    outline: 'none',
    borderRadius: '5px',
    p: 4,
};


const ReturnBookModal = ({ open, handleClose, member }) => {
    const [expanded, setExpanded] = useState([]);
    const [err, setErr] = useState(null);
    const [books, setBooks] = useState([]);

    const handleExpandClick = (index) => {
        setExpanded((prevExpanded) => {
        const newExpanded = [...prevExpanded];
        newExpanded[index] = !newExpanded[index];
        return newExpanded;
        });
    };

    useEffect(() => {
        setBooks(null)
        axios.get(`${transaction}/${member.uid}`).then(res => {
            if (!res.data.status) {
                setErr(res.data.error)
            } else {
                if (res.data.transactions.length > 0) {
                    setBooks(res.data.books)
                }
            }
        })
    }, [open, member])

    const onReturn = (e, book) => {
        e.preventDefault();
        const tid = member.uid + "|" + book.bid;
        axios.delete(`${transaction}/delete?tid=${tid}`).then(res => {
            if (!res.data.status) {
                setErr(res.data.error)
            } else {
                member.debt = member.debt - 100
                axios.put(`${users}/get-one?param=uid&value=${member.uid}`, {member}).then(res => {
                    if (!res.data.status) {
                        setErr(res.data.error)
                    }
                })
                axios.put(`${booksRoute}/get-one?param=bid&value=${book.bid}`, {copies: book.copies + 1}).then(res => {
                    if (!res.data.status){
                        setErr(res.data.error);
                    }
                });

                handleClose();
            }
        });
    }

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h4">
                Return Book
            </Typography>
            <form style={{ marginTop: '3rem' }}>
            {err !== null ? <Alert severity="error" sx={{ marginBottom: '1rem' }}>{err}</Alert> : null}
                <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>
                    Member Info
                </Typography>
                <br />
                <Typography variant="subtitle1">
                    Id: {member.uid}
                </Typography>
                <Typography variant="subtitle1">
                    Name: {member.name}
                </Typography>
                <Typography variant="subtitle1">
                    debt: {member.debt}
                </Typography>

                <hr />

                <Box sx={{ maxHeight: 400, overflowY: "auto", margin: '1rem 0' }}>
                    {books !== null ? books.map((book, index) => (
                        <Box key={index}>
                            <ListItem button onClick={() => handleExpandClick(index)} sx={{ background: '#eee' }}>
                                <ListItemText primary={book.title} />
                                <IconButton
                                    aria-label="expand"
                                    aria-expanded={expanded[index]}
                                    onClick={() => handleExpandClick(index)}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </ListItem>
                            <Collapse in={expanded[index]} timeout="auto" unmountOnExit sx={{ padding: '1rem' }}>
                                <Typography variant="subtitle1">
                                    Authors: {book.authors}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Publisher: {book.publisher}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Rating: {book.average_rating}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Pages: {book.num_pages}
                                </Typography>

                                <Button variant='contained' sx={{ margin: '1rem 0' }} onClick={(e) => onReturn(e, book)}>Return</Button>
                            </Collapse>
                        </Box>
                    )) : null}
                </Box>
            </form>
        </Box>
    </Modal>
  )
}

export default ReturnBookModal