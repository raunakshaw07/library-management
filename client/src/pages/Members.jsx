import React, {useState, useEffect} from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import Search from '../components/Members/Search';
import MembersTable from '../components/Members/MembersTable';
import AddMemberModal from '../components/Members/AddMemberModal';

import axios, { all } from 'axios';
import { users } from '../routes';

const Members = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [search, setSearch] = useState([]);
    const [allMembers, setAllMembers] = useState([]);

    useState(() => {
      axios.get(users).then(res => {
        setAllMembers(res.data.users)
      })
    }, [])

  return (
    <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h4' gutterBottom sx={{ margin: "2rem 0" }}>
                Manage Members
            </Typography>
            <Button variant='contained' sx={{ height: '3rem' }} onClick={handleOpen}>Add Member</Button>
        </Box>

        <Search setSearch={setSearch} search={search} comp='local' />
        <MembersTable members={search.length !== 0 ? search : allMembers} setAllMembers={setAllMembers} />
        <AddMemberModal open={open} handleClose={handleClose} setAllMembers={setAllMembers} allMembers={allMembers} />

    </Container>
  )
}

export default Members