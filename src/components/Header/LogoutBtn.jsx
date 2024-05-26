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
    className="inline-block px-4 py-2 bg-sky-700
    font-semibold hover:bg-sky-800 rounded-xl text-white"
    onClick={logoutHandler}
    >Logout</button>
  );
};

export default LogoutBtn;
