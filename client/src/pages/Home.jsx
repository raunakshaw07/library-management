import React, { useEffect, useState } from 'react'
import { Box, Typography, Container, Grid } from '@mui/material';

import Info from '../components/Home/Info'
import MemberList from '../components/Home/MemberList';
import Books from '../components/Home/BooksList'

import {users, books, transaction} from '../routes'
import axios from 'axios'


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [countUser, setCountUser] = useState(null)
  const [countBook, setCountBook] = useState(null)
  const [countTransaction, setCountTransaction] = useState(null)
  const [limitedUsers, setLimitedUsers] = useState([])
  const [limitedBooks, setLimitedBooks] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const countUserRes = await axios.get(`${users}/count`);
      const countBooksRes = await axios.get(`${books}/count`);
      const countTransactionRes = await axios.get(`${transaction}/count`);
      const limitedUserRes = await axios.get(`${users}/limit`);
      const limitedBookRes = await axios.get(`${books}/limit`);

      setCountUser(countUserRes.data.count)
      setCountBook(countBooksRes.data.count)
      setCountTransaction(countTransactionRes.data.count)

      setLimitedUsers(limitedUserRes.data)
      setLimitedBooks(limitedBookRes.data.books)
      setLoading(false);
    }

    fetchDetails()
  }, [])

  if (!loading && limitedUsers) {
    return (
      <>
        <Container sx={{ marginTop: '2rem' }}>
          <Typography variant="h4" gutterBottom sx={{ marginBottom: '2rem' }}>
              Admin Dashboard
          </Typography>
  
          <Info userCount={countUser} bookCount={countBook} issueCount={countTransaction} />
  
          <Box sx={{ margin: '4rem 0' }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 4, md: 12 }}>
                  <Grid item xs={6} md={6}>
                    <MemberList members={limitedUsers} />
                  </Grid>
  
                  <Grid item xs={6} md={6}>
                    <Books books={limitedBooks} />
                  </Grid>
              </Grid>
          </Box>
        </Container>
      </>
    )
  } else {
    <Container>
      <Typography>Loading...</Typography>
    </Container>
  }
}

export default Home