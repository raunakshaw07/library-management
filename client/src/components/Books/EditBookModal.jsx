import React, { useState } from 'react'
import { Typography, Box, TextField, Button, Modal, Alert } from '@mui/material'
import axios from 'axios';
import { books } from '../../routes';

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

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const EditBookModal = ({ open, handleClose, book, setBook }) => {
    const [copy, setCopy] = useState(null)
    const [msg, setMsg] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault();
        if (copy.trim().length !== 0 && copy >=0) {
            const res = await axios.put(`${books}/get-one?param=bid&value=${book.bid}`, { copies: parseInt(book.copies) + parseInt(copy) })
            if (!res.data.status) {
                setMsg(res.data.error)
            } else {
                setMsg(res.data.msg);
                book.copies = parseInt(book.copies) + parseInt(copy);
                setBook(book)
                await delay(2000);
                handleClose();
                setMsg(null);
            }
        } 
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
                Edit Book
            </Typography>
            <form style={{ marginTop: '3rem' }} onSubmit={onSubmit}>
            {msg !== null ? <Alert sx={{ marginBottom: '1rem' }}>{msg}</Alert> : null}
                <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>
                    {book.title}
                </Typography>
                <br />
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

                <TextField 
                    required
                    id="outlined-required"
                    label="Enter number of copies to add"
                    inputProps={{style: {fontSize: '0.8rem', padding: '0.8rem'}}}
                    InputLabelProps={{style: {fontSize: '0.8rem'}}}
                    sx={{ width: '100%', marginTop: '1rem' }}
                    onChange={(e) => setCopy(e.target.value)}
                />

                <Box sx={{ marginTop: '3rem' }}>
                    <Button variant='outlined' color='error' sx={{ marginRight: '1rem' }}>Reset</Button>
                    <Button type='submit' variant='contained'>Submit</Button>
                </Box>
            </form>
        </Box>
    </Modal>
  )
}

export default EditBookModal