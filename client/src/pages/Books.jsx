import React, {useState} from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import Search from '../components/Books/Search';
import BooksTable from '../components/Books/BooksTable';
import ImportBooksModal from '../components/Books/ImportBooksModal';

const Books = () => {
  const [search, setSearch] = useState(null);
    
    const [importBooksOpen, setImportBooksOpen] = React.useState(false);
    const handleImportBooksOpen = () => setImportBooksOpen(true);
    const handleImportBooksClose = () => setImportBooksOpen(false);

  return (
    <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h4' gutterBottom sx={{ margin: "2rem 0" }}>
                Manage Books
            </Typography>
            <Box>
            <Button variant='contained' sx={{ height: '3rem' }} onClick={handleImportBooksOpen}>Import All Books</Button>
            </Box>
        </Box>

        <Search setSearch={setSearch} />
        {search && <BooksTable books={search} />}
        <ImportBooksModal open={importBooksOpen} handleClose={handleImportBooksClose} />

    </Container>
  )
}

export default Books