
import { FormControl, InputLabel, OutlinedInput, Box, Button, Container, InputAdornment, RadioGroup, FormControlLabel, FormLabel, Radio, TextField, Select, MenuItem } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useAuth } from './AuthProvider';

function Form(prop){

    const [formData, setFormData] = useState({
      is_income: false,
      category:'',
      description: '',
      amount: 0,
      date: dayjs(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
    })

    const auth = useAuth()

    const handleChange = (e) =>{
      const {name, value } = e.target
      setFormData({...formData, [name]: value});
    }

    const handleDateChange = (date) => {
      setFormData({
        ...formData,
        date: dayjs(date).format('YYYY-MM-DD'),
      });
    };

    const handleSubmit = async(e) => {
      e.preventDefault()
      try{
        const response = await fetch('http://localhost:8000/v1/transaction/',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${auth.token}`
          },
          body: JSON.stringify(formData)
      })
        if(response.ok)
        {
          const data = await response.json()
          setFormData({
            is_income: false,
            category:'',
            description: "",
            amount: 0,
            date: dayjs(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
          })
          prop.addCard()
          prop.handleClose()
        }
        
      }catch(error) {
        console.error(error)
      }
      console.log(formData)
    }

    return (
        <Box component="form" 
        sx={{display: 'flex', flexDirection: 'column', gap: '10px', width:"400px"}}
        onSubmit={handleSubmit}> 
          <FormControl>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="is_income" value={formData.is_income} onChange={handleChange}>
             <FormControlLabel value= {false} control={<Radio />} label="Expense" />
             <FormControlLabel value={true} control={<Radio />} label="Income" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.category}
              name = "category"
              label="Category"
              onChange={handleChange}>
                
                {formData.is_income?(<MenuItem value={"Salary"}>Salary</MenuItem>):(<MenuItem value={"Food"}>Food</MenuItem>)}
                {formData.is_income?<MenuItem value={"Rental_Income"}>Rental Income</MenuItem>:<MenuItem value={"Transport"}>Transport</MenuItem>}
                {formData.is_income?<MenuItem value={"Allowence"}>Allowence</MenuItem>:<MenuItem value={"Rent"}>Rent & Bills</MenuItem>}
                {formData.is_income?<MenuItem value={"Borrow"}>Borrow</MenuItem>:<MenuItem value={"Shopping"}>Shopping</MenuItem>}
                <MenuItem value={"Others"}>Others</MenuItem>              
            </Select>
            
          </FormControl>
          <FormControl>
          <TextField
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={3}
          name = "description"
          value = {formData.description}
          onChange={handleChange}
        />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            name = "amount"
            value={formData.amount} 
            onChange={handleChange}
          />
        </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Date"
            value = {dayjs(formData.date)}
            onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
          <Button variant="contained" color="primary" type="submit" >
                  Submit
          </Button>
      </Box>
    
    )
}

export default Form