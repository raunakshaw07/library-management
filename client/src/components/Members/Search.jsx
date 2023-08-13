import React, { useState } from 'react'
import { Box, TextField, MenuItem, IconButton, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { users } from '../../routes'

const params = [
    {
      value: 'uid',
      label: 'UID',
    },
    {
      value: 'name',
      label: 'Name',
    }
];

const Search = ({ setSearch, search, comp }) => {
    const [param, setParam] = useState('uid');
    const [val, setVal] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (comp === 'local') {
            if (val.trim() !== '') {
                axios.get(`${users}/get-one?param=${param}&value=${val}`).then(res => {
                    setSearch([res.data.user])
                })
            } else {
                setSearch([]);
            }
        }
    }


  return (
    <Box
        component="form"
        sx={{
            flexGrow: '1'
        }}
        noValidate
        autoComplete="off"
    >
        <Grid container spacing={3} columns={8} sx={{ width: '100%' }}>
            <Grid item md={2}>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Parameter"
                    defaultValue="uid"
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
                            <IconButton edge="end" color="primary" onClick={(e) => onSubmit(e)}>
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