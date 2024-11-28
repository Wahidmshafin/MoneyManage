import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, Box, Button, Container, InputAdornment, RadioGroup, FormControlLabel, FormLabel, Radio, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useAuth } from './AuthProvider';

function Login() {

    const [userData, setUserData] = useState({
        username: '',
        pin: ''
    })
    // const [error, setError] = useState("")
    
    // const navigate = useNavigate()
    const auth = useAuth()

    const handleChange = (e)=>{
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        auth.login(userData)
        
    };

    return (
        <section>
            <div className="container d-flex vh-100 align-items-center justify-content-center">

                        <div className="card bg-light" style={{ borderRadius: "1rem", width:'40%' }}>
                            <div className="card-body p-5 text-center">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-md-5 pb-5">
                                        <h2 className="fw-bold mb-5 text-uppercase">Login</h2>
                                        

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
                                            label="Pin"
                                            name = "pin"
                                            variant='outlined'
                                            type="password"
                                            value={userData.pin}
                                            onChange={handleChange}
                                            />
                                        </FormControl>
                                        {auth.error &&<Alert severity='error' sx={{mt:2}} className='text-center'>{auth.error}</Alert>}
                                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg px-5 mt-5" type="submit">
                                            Login
                                        </button>
                                        
                                    </div>

                                    <div>
                                        <p className="mb-0">
                                            Don't have an account? <Link to="/register" className='fw-bold'>Sign Up</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    
                
            </div>
        </section>
    );
}

export default Login;
