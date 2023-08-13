import React, {useState} from 'react'
import { Typography, Box, Button, Modal, Alert  } from '@mui/material'
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

const DeleteMemberModal = ({ open, handleClose, member }) => {
    const [err, setErr] = useState(null);
    const onDelete = (e) => {
        e.preventDefault();
        axios.delete(`${users}/get-one?param=uid&value=${member.uid}`).then(res => {
            if (!res.data.status) {
                setErr(res.data.error)
            } else {
                window.location.reload();
                handleClose();
            }
        })
    }
  return (
    <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ marginBottom: '2rem' }}>
                Delete Member
            </Typography>

            {err !== null ? <Alert severity="error" sx={{ marginBottom: '1rem' }}>{err}</Alert> : null}
            
            {member.debt == 0 ? (
                <Box>
                    <Typography variant="h6">Are you sure you want to delete the record</Typography>
                    <Typography sx={{ marginTop: '2rem' }}>
                        Id: {member.uid}
                    </Typography>
                    <Typography>
                        Name: {member.name}
                    </Typography>
                    <Typography>
                        Address: {member.address}
                    </Typography>
                    <Typography>
                        Email: {member.email}
                    </Typography>
                    <Typography>
                        Phone: {member.phone}
                    </Typography>
                    <Typography>
                        Gender: {member.gender}
                    </Typography>
                    <Typography sx={{ marginBottom: '2rem' }}>
                        debt: {member.debt}
                    </Typography>

                    <Button variant='outlined' sx={{ marginRight: '1rem' }} onClick={handleClose}>Cancel</Button>
                    <Button type='submit' color='error' variant='contained' onClick={onDelete}>Delete</Button>
            </Box>
            ) : (
                <Box>
                    <Typography>{member.name} has ongoing debt. Cannot remove record</Typography>
                </Box>
            )}

        </Box>  
    </Modal>
  )
}

export default DeleteMemberModal