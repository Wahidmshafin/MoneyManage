import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from "./App"
import Login from './Login'
import Register from './Registration'
import ProtectedRoute from './ProtectedRoute';
import AuthProvider from './AuthProvider';

createRoot(document.getElementById('root')).render(
  <div>
    <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>

  </StrictMode>,
  </div>
  
)
