import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import List from './List.jsx'
import Form from './Form.jsx'
import { Container} from '@mui/material'
import Grid from '@mui/material/Grid2';

function App() {
    const [addCard, setAddCard] = useState(0)
  
    return (
      <>
        <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
          <Grid container direction="column" spacing={2}>
            <Grid lg={4}>
              <Form addCard={() => { setAddCard(addCard + 1) }} />
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
