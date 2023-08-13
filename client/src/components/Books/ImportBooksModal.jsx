import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import axios from 'axios';
import { books } from '../../routes';

const style = {
    modal: {
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
    }, 
};

const ImportBooksModal = ({ open, handleClose }) => {
    const [copies, setCopies] = useState('');
    const [pages, setPages] = useState(null)
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({msg: 'Importing'})
        if (copies.trim().length !== 0 && pages !== 0) {
            axios.get(`${books}/import?pages=${pages}&copies=${copies}`).then(res => {
                setLoading(false);
                if (!res.data.status) setMsg({msg: res.status.error})
                else setMsg({msg: res.status.books})
            })
        } else {
            setMsg('Please enter valid inputs')
        }
    }

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
         <Box sx={style.modal}>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ marginBottom: '3rem' }}>
                Import All Books From API
            </Typography>

            <Typography sx={{ marginBottom: '2rem' }}>* This is an irreversible action *</Typography>

            <TextField
                label="Enter number of copies of each books to be imported" 
                variant="outlined" 
                required
                sx={{ width: '100%', marginBottom: '2rem' }}
                onChange={(e) => setCopies(e.target.value)}
            />
            <TextField
                label="Enter number of pages to be imported" 
                variant="outlined" 
                required
                sx={{ width: '100%', marginBottom: '2rem' }}
                onChange = {(e) => setPages(e.target.value)}
            />

            {loading && msg !== null ? (
                <Box>
                    <Typography sx={{ margin: '1rem 0' }}>{msg}</Typography>
                    {/* {msg.map(m => {
                    })} */}
                </Box>
            ) : null}

            <Button variant='contained' sx={{ marginRight: '1rem' }} onClick={handleClose}>Close</Button>
            <Button variant='contained' onClick={onSubmit}>Import</Button>
        </Box>
    </Modal>
  )
}

export default ImportBooksModal