import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import List from './List.jsx'
import Form from './Form.jsx'
import RecordTable from './RecordTable.jsx'
import MonthDetail from './MonthDetail.jsx'
import { Container, Grid2} from '@mui/material'
import CardMonth from './CardMonth.jsx'
import Grid from '@mui/material/Grid2';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Navigate, replace, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider.jsx'

function App() {
    
    const auth = useAuth()
    const [recordMonth, setRecordMonth] = useState([
      {month: 'January', income: 0, expense: 0},
      {month: 'Februay', income: 0, expense: 0},
      {month: 'March', income: 0, expense: 0},
      {month: 'April', income: 0, expense: 0},
      {month: 'May', income: 0, expense: 0},
      {month: 'June', income: 0, expense: 0},
      {month: 'July', income: 0, expense: 0},
      {month: 'Augest', income: 0, expense: 0},
      {month: 'September', income: 0, expense: 0},
      {month: 'October', income: 0, expense: 0},
      {month: 'November', income: 0, expense: 0},
      {month: 'December', income: 0, expense: 0}

    ])
    
    useEffect(() => {
          fetch('http://localhost:8000/v1/monthly',{
            headers:{
              "Authorization":`Bearer ${auth.token}`
            }
          
          })
          .then(res => res.json())
          .then(data => {
            setRecordMonth(
              recordMonth.map(record=>{
                const currentRecord = data.find(item => item.month==record.month)
                if(currentRecord){
                  return {...record, income:currentRecord.income, expense:currentRecord.expense}
                }
                return record
              })
            )
          })
          .catch(err => console.log(err))
        },[])

    const navigate = useNavigate()
    
    const handleCardClick = (month) =>{
      navigate(`/details/${month}`)
    }
    

    return (
      <>
        <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
        <Grid container direction="column" spacing={2}>
            <Grid lg={4}>
              <div className='row'>
                <div className='col-8' style={{display:'flex'}}>
                <AccountBalanceIcon fontSize='large' color='success' sx={{marginBlock:'auto'}} /><h1>Money Manager</h1>
                 
                </div>
                <div className='col-4' style={{ textAlign: 'right' }}>
                <Button variant="contained" onClick={auth.logout}>Log out</Button>
                </div>
              </div>
              
            </Grid>
            </Grid>
        <Grid container spacing={2}>
          {recordMonth.map((item, index) => (
        <CardMonth key = {index} month = {item.month} income={item.income} expense = {item.expense} save = {item.income - item.expense} onClick={()=>handleCardClick(item.month)} />
          ))}
        </Grid>
        
        </Container>
      </>
    )
  }
export default App 
