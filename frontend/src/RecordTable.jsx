import * as React from 'react';
import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from './AuthProvider'

export default function RecordTable(prop) {

    const [transactionData, setTransactionData] = useState([])
      const auth = useAuth()
      
      useEffect(() => {
        fetch('http://localhost:8000/v1/transaction/all',{
          headers:{
            "Authorization":`Bearer ${auth.token}`
          }
        
        })
        .then(res => res.json())
        .then(data => setTransactionData(data))
        .catch(err => console.log(err))
      },[prop.addCard])


  return (
    
        <div className="mask d-flex align-items-center h-100" >
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                <div className="card">
                    <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Record Type</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {transactionData.map((transaction,index)=>{
                                return (
                                    <tr key={transaction.id}>
                                        <td scope="row"><span className='fw-bold'> {transaction.date}</span></td>
                                        <th>
                                           {transaction.is_income?<span className="text-success">Income</span>:<span className="text-danger">Expense</span>}
                                        </th>
                                        <td>
                                        {transaction.category.toUpperCase()}
                                        </td>
                                        <td>
                                        {transaction.description}
                                        </td>
                                        <td>
                                        ${transaction.amount}
                                        </td>
                                        <td>
                                            <DeleteIcon color='error' sx={{"cursor":"pointer", marginRight:2, '&:hover': {transform: 'scale(1.2)'} }} /> 
                                            <EditIcon color='success' sx={{"cursor":"pointer", '&:hover': {transform: 'scale(1.2)'}}} /> 
                                        </td>
                                        
                                    </tr>
                                )})}
                            
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        
  );
}
