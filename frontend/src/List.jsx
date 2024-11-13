import { useState, useEffect } from 'react'
import Card from './Card'
import { Grid2 } from '@mui/material'



function List(prop) {
  const [transactionData, setTransactionData] = useState([])
    
  useEffect(() => {
    fetch('http://localhost:8000/v1/transaction/all')
    .then(res => res.json())
    .then(data => setTransactionData(data))
    .catch(err => console.log(err))
  },[prop.addCard])

  return (
    <>
    <Grid2 container spacing={2}>
      {transactionData.map(transaction=>{
        return <Card
        key = {transaction.id}
        title = {transaction.is_income?"Income":"Expense"}
        detail = {transaction.description}
        amount = {transaction.amount}
      />
      })}
    
    </Grid2>
      
    </>
  )
}

export default List
