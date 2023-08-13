import React, {useState} from 'react'
import { Typography, Box, TextField, MenuItem, Button, Modal, Alert  } from '@mui/material'
import axios from 'axios';
import { users } from '../../routes';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 'none',
    outline: 'none',
    borderRadius: '5px',
    p: 4,
  };

const AddMemberModal = ({ open, handleClose, allMembers, setAllMembers }) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [gender, setGender] = useState(null);
    const [address, setAddress] = useState(null);
    const [err, setErr] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault();
        const l1 = name.trim().length;
        const l2 = email.trim().length;
        const l3 = phone.trim().length;
        const l4 = address.trim().length;

        if (l1 == 0 || l2 == 0 || l3 == 0 || l4 == 0) {
            setErr({ msg: "Please enter valid values" })
        } else {
            setErr(null);
            axios.post(users, { name, email, phone, gender, address }).then(res => {
                if (res.data.status) {
                    setAllMembers([res.data.user], ...allMembers)
                    handleClose();
                } else {
                    setErr(res.data.error)
                }
            })
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
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Add Member
                </Typography>
                <form style={{ marginTop: '3rem' }} onSubmit={(e) => onSubmit(e)}>
                    {err !== null ? <Alert severity="error" sx={{ marginBottom: '1rem' }}>{err}</Alert> : null}
                    <TextField
                        required
                        label="Name" 
                        variant="outlined" 
                        sx={{ width: '100%', marginBottom: '2rem' }}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        label="Email" 
                        variant="outlined" 
                        sx={{ width: '100%', marginBottom: '2rem' }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        label="Phone" 
                        variant="outlined" 
                        sx={{ width: '100%', marginBottom: '2rem' }}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-select-currency"
                        select
                        label="Gender"
                        sx={{ width: '100%', marginBottom: '2rem' }}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <MenuItem value="male">
                            Male
                        </MenuItem>
                        <MenuItem value="female">
                            Female
                        </MenuItem>
                        <MenuItem value="others">
                            Others
                        </MenuItem>
                    </TextField>
                    <TextField
                        required
                        label="Address"
                        multiline
                        rows={4}
                        sx={{ width: '100%', marginBottom: '2rem' }}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <Button variant='outlined' color='error' sx={{ marginRight: '1rem' }}>Reset</Button>
                    <Button type='submit' variant='contained'>Submit</Button>
                </form>
            </Box>
        </Modal>
  )
}

export default AddMemberModal