import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import List from './List.jsx'
import Form from './Form.jsx'
import RecordTable from './RecordTable.jsx'
import { Container} from '@mui/material'
import Grid from '@mui/material/Grid2';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Navigate, replace, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider.jsx'

function App() {
    const [addCard, setAddCard] = useState(0)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3,
    };

    const navigate = useNavigate()
    
    const auth = useAuth()

    return (
      <>
        <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
          <Grid container direction="column" spacing={2}>
            <Grid lg={4}>
              <div className='row'>
                <div className='col-8' style={{display:'flex'}}>
                <AccountBalanceIcon fontSize='large' color='success' sx={{marginBlock:'auto'}} /><h1>Money Manage</h1>
                 
                </div>
                <div className='col-4' style={{ textAlign: 'right' }}>
                  <Button variant='contained' onClick={handleOpen} style={{marginRight:'10px'}}>New Record</Button>
                <Button variant="contained" onClick={auth.logout}>Log out</Button>
                </div>
              </div>
              
            </Grid>
            <Grid lg={8}>
              <List addCard={addCard} />
              {/* <RecordTable></RecordTable> */}
            </Grid>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{...style, width: "470px" }}>
            <Form addCard={() => { setAddCard(addCard + 1) }} handleClose = {()=>{handleClose()}} />
            </Box>
          </Modal>
        </Container>
      </>
    )
  }
export default App 
