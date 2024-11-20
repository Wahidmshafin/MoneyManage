import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from "./App"
import Login from './Login'
import Register from './Registration'
import ProtectedRoute from './ProtectedRoute';
import {RequireToken} from './Auth';

createRoot(document.getElementById('root')).render(
  <div>
    <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireToken><App /></RequireToken> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
  </div>
  
)
