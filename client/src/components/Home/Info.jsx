import React from 'react'

import { Box, Typography, Paper, Grid} from '@mui/material';

import BookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Info = ({ userCount, bookCount, issueCount }) => {
    const data = [{ title: "Total Members", value: userCount, icon: 1, color: "#FFBF05" }, 
        { title: "Total Books", value: bookCount, icon: 2, color: "#FE5460" }, 
        { title: "Total Books Issued", value: issueCount, icon: 3, color: "#38D164" }]

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 4, md: 12 }}>
        {data.map(dt => (
          <Grid item xs={6} md={4} key={dt.title}>
            <Paper sx={{ padding: '1.5rem', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ fontSize: '6rem', background: dt.color, padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
                {dt.icon === 1 ? 
                <GroupIcon sx={{ fontSize: '2.5rem', color: '#eee' }} /> :
                 dt.icon === 2 ? 
                    <BookIcon sx={{ fontSize: '2.5rem', color: '#eee' }} /> : 
                    <LibraryBooksIcon sx={{ fontSize: '2.5rem', color: '#eee' }} />
                }
              </Box>
              <Box>
                <Typography variant="body2" gutterBottom sx={{ color: '#808080' }}>
                    {dt.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>
                    {dt.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
  )
}

export default Info