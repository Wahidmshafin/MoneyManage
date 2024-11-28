import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import List from './List.jsx'
import Form from './Form.jsx'
import { Container} from '@mui/material'
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { Navigate, replace, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider.jsx'

function App() {
    const [addCard, setAddCard] = useState(0)
    const navigate = useNavigate()
    
    const auth = useAuth()

    return (
      <>
        <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
          <Grid container direction="column" spacing={2}>
            <Grid lg={4}>
              <div className='row'>
                <div className='col-8'>
                <Form addCard={() => { setAddCard(addCard + 1) }} />
                </div>
                <div className='col-4' style={{ textAlign: 'right' }}>
                <Button variant="contained" onClick={auth.logout}>Log out</Button>
                </div>
              </div>
              
            </Grid>
            <Grid lg={8}>
              <List addCard={addCard} />
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
export default App 
