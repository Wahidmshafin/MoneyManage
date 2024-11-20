import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, Box, Button, Container, InputAdornment, RadioGroup, FormControlLabel, FormLabel, Radio, TextField, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


function Register() {

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        pin:"",
    })

    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        try{
            fetch("http://localhost:8000/v1/register",
                {
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify(userData)
                }
            ).then(resonse => resonse.json())
            .then(data => {
                if(data.detail)
                    throw new Error(data.detail)
                navigate("/login")
            })
        }catch(e){
            setError(e.message)
        }
        
    };

    const handleChange = (e)=>{
        setUserData({...userData, [e.target.name] : e.target.value})
    }
    
    return (
        <section>
            <div className="container d-flex vh-100 align-items-center justify-content-center">

                        <div className="card bg-light" style={{ borderRadius: "1rem", width:'40%' }}>
                            <div className="card-body p-5 text-center">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-md-5 pb-5">
                                        <h2 className="fw-bold mb-5 text-uppercase">Sign Up</h2>
                                        

                                        <FormControl className='mb-3' sx={{width: '100%'}}>
                                            <TextField
                                            id="outlined-basic"
                                            label="Username"
                                            name = "username"
                                            variant='outlined'
                                            type='text'
                                            value={userData.username}
                                            onChange={handleChange}
                                            />
                                        </FormControl>


                                        <FormControl className='mb-3' sx={{width: '100%'}}>
                                            <TextField
                                            id="outlined-basic"
                                            label="Email"
                                            name = "email"
                                            variant='outlined'
                                            type='email'
                                            value={userData.email}
                                            onChange={handleChange}
                                            />
                                        </FormControl>

                                        <FormControl className='mb-3' sx={{width: '100%'}}>
                                            <TextField
                                            id="outlined-basic"
                                            label="Pin"
                                            name = "pin"
                                            variant='outlined'
                                            type="password"
                                            value = {userData.pin}
                                            onChange={handleChange}
                                            />
                                        </FormControl>

                                        {error &&<Alert severity='error' sx={{mt:2}} className='text-center'>{error}</Alert>}
                                        
                                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg px-5 mt-5" type="submit">
                                            Sign Up
                                        </button>
                                        

                                    </div>
                                </form>
                            </div>
                        </div>
                    
                
            </div>
        </section>
    );
}

export default Register;
