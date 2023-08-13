import React, {useState} from 'react'
import { Typography, Box, TextField, MenuItem, Button, Modal, Alert } from '@mui/material'
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

const EditMemberModal = ({ open, handleClose, member, setAllMembers }) => {
    const [name, setName] = useState(member.name);
    const [email, setEmail] = useState(member.email);
    const [phone, setPhone] = useState(member.phone);
    const [gender, setGender] = useState(member.gender);
    const [address, setAddress] = useState(member.address);
    const [err, setErr] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault();
        const l1 = name.trim().length;
        const l2 = email.trim().length;
        const l3 = phone.toString().trim().length;
        const l4 = address.trim().length;

        if (l1 == 0 || l2 == 0 || l3 == 0 || l4 == 0) {
            setErr({ msg: "Please enter valid values" })
        } else {
            setErr(null);
            axios.put(`${users}/get-one?param=uid&value=${member.uid}`, { name, email, phone, gender, address, debt: member.debt }).then(res => {
                if (res.data.status) {
                    window.location.reload();
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
                    Edit Member
                </Typography>
                <form style={{ marginTop: '3rem' }} onSubmit={onSubmit}>
                {err !== null ? <Alert severity="error" sx={{ marginBottom: '1rem' }}>{err}</Alert> : null}
                    <TextField
                        label="Name" 
                        variant="outlined" 
                        value={name}
                        sx={{ width: '100%', marginBottom: '2rem' }}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email" 
                        variant="outlined" 
                        value={email}
                        sx={{ width: '100%', marginBottom: '2rem' }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Phone" 
                        variant="outlined" 
                        value={phone}
                        sx={{ width: '100%', marginBottom: '2rem' }}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Gender"
                        defaultValue={gender.toLowerCase()}
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
                        label="Address"
                        multiline
                        rows={4}
                        value={address}
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

export default EditMemberModal