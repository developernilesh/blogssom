import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader"

const Protected = ({children,authentication=true}) => {
    const [loader,setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(authentication && authStatus!==authentication){
            navigate('/login')
        }
        else if(!authentication && authStatus!==authentication){
            navigate('/')
        }
        setLoader(false)
    },[authentication,navigate,authStatus])
    
    return loader ? (
        <div className="h-screen w-full app-bg">
            <Loader/>
        </div>
    ) : <>{children}</>
};

export default Protected;
