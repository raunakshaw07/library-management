import React, { useState } from 'react'
import { Box, TextField, MenuItem, IconButton, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { books } from '../../routes';
import axios from 'axios';

const params = [
    { value: 'title', label: 'Title' },
    { value: 'authors', label: 'Authors' },
    { value: 'isbn', label: 'ISBN' },
    { value: 'publisher', label: 'Publisher' },
    { value: 'page', label: 'Page' }
];

const Search = ({setSearch}) => {
  const [param, setParam] = useState('title');
    const [val, setVal] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (val.trim().length !== 0) {
            console.log(val)
            axios.get(`${books}/get-one?param=${param}&value=${val}`).then(res => {
                if (!res.data.status) setSearch([])
                setSearch([res.data.books])
            })
        } else {
            setSearch(null);
        }
    }

  return (
    <Box
        component="form"
        sx={{flexGrow: '1'}}
        noValidate
        autoComplete="off"
    >
      <Grid container spacing={3} columns={8} sx={{ width: '100%' }}>
          <Grid item md={2}>
              <TextField
                required
                id="outlined-select-currency"
                select
                label="Parameter"
                defaultValue="title"
                sx={{ width: '100%' }}
                onChange={(e) => setParam(e.target.value)}
              >
                {params.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
              </TextField>
          </Grid>

          <Grid item md={6}>
              <TextField
                  label="Search" 
                  variant="outlined" 
                  InputProps={{
                      endAdornment: 
                          <IconButton edge="end" color="primary" onClick={onSubmit}>
                              <SearchIcon />
                          </IconButton>
                      }}
                  sx={{ width: '100%' }}
                  onChange={(e) => setVal(e.target.value)}
              />
          </Grid>
      </Grid>
    </Box>
  )
}

export default Search