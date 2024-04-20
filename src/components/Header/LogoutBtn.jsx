import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/slices/authSlice";

const LogoutBtn = () => {

  const dispatch = useDispatch()
  
  const logoutHandler = () => {
    authService.logout()
    .then(() => dispatch(logout()))
  }

  return( 
    <button
    className="inline-block px-3 py-1 bg-fuchsia-600
    hover:bg-fuchsia-700 rounded-xl text-white"
    onClick={logoutHandler}
    >Logout</button>
  );
};

export default LogoutBtn;
