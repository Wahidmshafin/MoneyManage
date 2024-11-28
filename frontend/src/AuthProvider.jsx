import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()
export default function AuthProvider({children}){
    const [token, setToken] = useState(localStorage.getItem("access_token") || "")

    const [error, setError] = useState("")
    const navigate = useNavigate();

        useEffect(()=>{
            const fetchUserData = async()=>{
                if(localStorage.getItem("access_token"))
                    {
        
                        const response = await fetch("http://localhost:8000/v1/me",{
                            method:"GET",
                            headers: {"Authorization": `Bearer ${localStorage.getItem("access_token")}`},
                        })
                        if(response.ok)
                        {
                            setToken(localStorage.getItem("access_token"))
                        }
                        else
                        {
                            // setError("Invalid token")
                            localStorage.removeItem("access_token")
                            navigate("/login")
                        }
                    }
            }
            fetchUserData()
            
        },[])

    const login = (userData) =>{
        fetch("http://localhost:8000/v1/login",{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.detail)
                throw Error(data.detail)
            setToken(data.access_token)
            localStorage.setItem("access_token", data.access_token)
            navigate("/")
            return;
        })
        .catch(err=>setError(err.message))
    }


    const logout = ()=>{
        setToken("");
        localStorage.removeItem("access_token")
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{token, error, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
    

};

export const useAuth = ()=>{
    return useContext(AuthContext);
}