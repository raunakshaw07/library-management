import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {AppBar, Box, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" sx={{background: '#1a1a1a'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            Library Management
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" edge="end"  onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              <Button color="inherit" onClick={() => navigate('/members')}>Manage Members</Button>
              <Button color="inherit" onClick={() => navigate('/books')}>Manage Books</Button>
            </Box>
          )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate('/members')}>Manage Members</MenuItem>
          <MenuItem onClick={() => navigate('/books')}>Manage Books</MenuItem>
        </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar