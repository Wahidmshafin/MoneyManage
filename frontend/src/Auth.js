import { Navigate } from "react-router-dom";

export const setToken = (token)=>{
    localStorage.setItem("access_token",token)
}

export const fetchToken = ()=>{
    return localStorage.getItem("access_token")
    
}

export const removeToken = ()=>{
    localStorage.removeItem("access_token")
}

export function RequireToken({children})
{
    const token = fetchToken()
    if(!token) 
    {
        return Navigate({to:"/login"})
   
    }
    return children
}
