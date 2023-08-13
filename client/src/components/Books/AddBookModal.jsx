import React, {useState} from 'react'
import { Typography, Box, TextField, Button, Modal, ListItem, ListItemText, Collapse, IconButton } from '@mui/material'
import Search from './Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const style = {
    modal: {
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
    }, 
    textfield: {
        fontSize: '0.8rem',
        padding: '0.8rem'
    }
};

const theme = createTheme({
    typography: {
        subtitle1: {
            fontSize: '0.8rem',
        },
    },
});

const books = [
    {
      "bookID": "39763",
      "title": "The Mystical Poems of Rumi 1: First Selection  Poems 1-200",
      "authors": "Rumi/A.J. Arberry",
      "average_rating": "4.28",
      "isbn": "0226731510",
      "num_pages": "208",
      "publication_date": "3/15/1974",
      "publisher": "University Of Chicago Press"
    },
    {
      "bookID": "17946",
      "title": "Seven Nights",
      "authors": "Jorge Luis Borges/Eliot Weinberger",
      "average_rating": "4.33",
      "isbn": "0811209059",
      "num_pages": "121",
      "publication_date": "5/29/1985",
      "publisher": "New Directions Publishing Corporation"
    },
    {
      "bookID": "32637",
      "title": "Imajica: The Reconciliation",
      "authors": "Clive Barker",
      "average_rating": "4.42",
      "isbn": "0061094153",
      "num_pages": "544",
      "publication_date": "5/10/1995",
      "publisher": "HarperTorch"
    },
    {
      "bookID": "28869",
      "title": "Pégate un tiro para sobrevivir: un viaje personal por la América de los mitos",
      "authors": "Chuck Klosterman",
      "average_rating": "3.81",
      "isbn": "8439720033",
      "num_pages": "272",
      "publication_date": "2/28/2006",
      "publisher": "Literatura Random House"
    }
]

const AddBookModal = ({ open, handleClose }) => {
    const [expanded, setExpanded] = useState([]);
    const [copy, setCopies] = useState(null);

    const handleExpandClick = (index) => {
        setExpanded((prevExpanded) => {
        const newExpanded = [...prevExpanded];
        newExpanded[index] = !newExpanded[index];
        return newExpanded;
        });
    };

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <ThemeProvider theme={theme}>
            <Box sx={style.modal}>
                <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ marginBottom: '3rem' }}>
                    Add Book
                </Typography>

                <Typography variant='subtitle1' sx={{ marginBottom: '2rem' }}>* Books are added from api *</Typography>
                
                <Search comp='add' />

                <Box sx={{ maxHeight: 400, overflowY: "auto", margin: '1rem 0' }}>
                    {books.map((item, index) => (
                        <Box key={index}>
                            <ListItem button onClick={() => handleExpandClick(index)} sx={{ background: '#eee' }}>
                                <ListItemText primary={item.title} />
                                <IconButton
                                    aria-label="expand"
                                    aria-expanded={expanded[index]}
                                    onClick={() => handleExpandClick(index)}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </ListItem>
                            <Collapse in={expanded[index]} timeout="auto" unmountOnExit sx={{ padding: '1rem' }}>
                                <Typography variant="subtitle1">
                                    Authors: {item.authors}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Publisher: {item.publisher}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Rating: {item.average_rating}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Pages: {item.num_pages}
                                </Typography>

                                <Box sx={{ margin: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
                                    <TextField 
                                        required
                                        id="outlined-required"
                                        label="Enter number of copies to add"
                                        inputProps={{style: {fontSize: '0.8rem', padding: '0.8rem'}}}
                                        InputLabelProps={{style: {fontSize: '0.8rem'}}}
                                        sx={{ width: '80%' }}
                                        onChange={(e) => setCopies(e.target.value)}
                                    />
                                    <Button variant='contained'>Add</Button>
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    </Modal>
  )
}

export default AddBookModal