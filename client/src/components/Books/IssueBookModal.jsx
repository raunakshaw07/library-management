import React, {useState} from 'react'
import { Typography, Box, TextField, Button, Modal, Alert } from '@mui/material'
import axios from 'axios';
import { books, transaction, users } from '../../routes';

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

const IssueBook = ({ open, handleClose, book }) => {
    const [nxt, setNxt] = useState(false);
    const [value, setValue] = useState(null);
    const [member, setMember] = useState(null)
    const [msg, setMsg] = useState(null);

    const func = () => {
        if (nxt) {
            return (
                <Box sx={{ marginTop: '2rem' }}>
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
                    <Typography sx={{ marginTop: '1rem', fontWeight: '600' }}>*Debt will be 100 Rs per book*</Typography>
                </Box>
            );
        }
    }

    const nextStep = async () => {
        const res = await axios.get(`${users}/get-one?param=uid&value=${value}`)
        console.log(res)
        if (!res.data.status) {
            setMsg(res.data.error)
        } else {
            if (res.data.user !== {}) {
                setMember(res.data.user);
                setNxt(true);
                setMsg(null)
            } else {
                setMsg(res.data.msg);
            }
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${transaction}?uid=${member.uid}&bid=${book.bid}`)
        if (!res.data.status) {
            setMsg(res.data.error)
        } else {
            // console.log(res)
            const updatedMember = {
                name: member.name,
                address: member.address,
                phone: member.phone,
                email: member.email,
                gender: member.gender,
                debt: member.debt + 100
            }
            const userResponse = await axios.put(`${users}/get-one?param=uid&value=${member.uid}`, updatedMember)
            if (!userResponse.data.status) {
                setMsg(userResponse.data.error)
            }
            const bookResponse = await axios.put(`${books}/get-one?param=bid&value=${book.bid}`, {copies: book.copies - 1})
            if (!bookResponse.data.status){
                setMsg(bookResponse.data.error);
            }

            setMsg(res.data.msg)
            await delay(2000);
            handleClose();
            setMsg(null);
            setMember(null);
            setNxt(false)
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
                Issue Book
            </Typography>
            <form style={{ marginTop: '3rem' }}>
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
                <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>
                    Pages: {book.num_pages}
                </Typography>

                <hr />

                <TextField 
                    required
                    id="outlined-required"
                    label="Enter Member ID"
                    inputProps={{style: {fontSize: '0.8rem', padding: '0.8rem'}}}
                    InputLabelProps={{style: {fontSize: '0.8rem'}}}
                    sx={{ width: '100%', marginTop: '1rem' }}
                    onChange={(e) => setValue(e.target.value)}
                />

                {func()}

                <Box sx={{ marginTop: '3rem' }}>
                    <Button variant='outlined' color='error' sx={{ marginRight: '1rem' }}>Reset</Button>
                    {nxt ? <Button variant='contained' onClick={(onSubmit)}>Issue</Button> : <Button variant='contained' onClick={nextStep}>Continue</Button>}
                </Box>
            </form>
        </Box>
    </Modal>
  )
}

export default IssueBook