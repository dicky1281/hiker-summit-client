import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


function RequireAuth() {
    const user = useSelector((state)=> state.user.user);
    const location = useLocation();
  return (
    user === null ? <Navigate to="login" state={{  from: location }} replace/> : <Outlet/>
  )
}

export default RequireAuth