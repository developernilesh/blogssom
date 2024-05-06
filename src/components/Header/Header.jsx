import React, { useState } from "react";
import {Container, logoImg, LogoutBtn} from "../index"
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const location = useLocation()
  const [isHidden, setIsHidden] = useState(true)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Your Posts",
      slug: "/your-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]


  return (
    <header className={`py-1 bg-[#d6e9ec]/60 fixed md:sticky z-10 top-0 left-0 right-0 
    ${!isHidden ? "inset-0" : "inset-auto"} text-indigo-900 ${!isHidden && "app-bg"} backdrop-blur`}>
      <Container className={`py-0 sm:py-1 rounded-xl md:rounded-full}`}>
        <nav className='flex items-center justify-between bg-transparent'>
          <div className={`${!isHidden && "hidden"} md:block mr-4`}>
            <Link to='/'>
              <img src={logoImg} width="100px"/>
            </Link>
          </div>
          <ul className='hidden md:flex'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <Link
                  to={item.slug}
                  className={`inline-block px-4 py-2 mr-2 duration-200 font-semibold 
                  rounded-full border-y-2 border-transparent hover:border-fuchsia-700
                  ${location.pathname === item.slug ? "text-fuchsia-700 transform scale-105" : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            ) : null
            )}
            {authStatus && (
              <li className="flex items-center">
                <LogoutBtn />
              </li>
            )}
          </ul>

          <button 
          className={`${!isHidden && "hidden"} md:hidden text-lg `} 
          onClick={() => setIsHidden(isHidden => !isHidden)}>
            <TiThMenu/>
          </button>

          <div className={`${isHidden && "hidden"} md:hidden bg-transparent w-full flex flex-col items-center`}>
            <div className="w-full flex justify-between items-center">
              <div className='mr-4'>
                <Link to='/'>
                  <img src={logoImg} width="100px"/>
                </Link>
              </div>
              <button className="text-xl py-2" onClick={() => setIsHidden(isHidden => !isHidden)}>
                <IoClose/>
              </button>
            </div>

            <div className="w-full">
              <ul className="flex flex-col items-center gap-4">
                {navItems.map((item) => 
                item.active ? (
                  <li key={item.name} onClick={() => setIsHidden(true)}>
                    <Link
                      to={item.slug}
                      className={`inline-block px-4 py-2 mr-2 duration-200 font-semibold  
                      ${location.pathname === item.slug ? "text-fuchsia-700 transform scale-105" : ""}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : null
                )}

                {authStatus &&
                  <li className="w-full h-[1px] bg-indigo-900"></li>
                }
                
                {authStatus && (
                  <li className="w-full flex items-center" onClick={() => setIsHidden(true)}>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
