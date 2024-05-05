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
    <header className={`py-3 bg-transparent fixed z-10 inset-0 text-indigo-900 ${!isHidden && "bg-white/50 backdrop-blur"}`}>
      <Container className={`py-0 sm:py-1 bg-transparent rounded-xl md:rounded-full ${isHidden && "backdrop-blur"}`}>
        <nav className='flex items-center justify-between'>
          <div className={`${!isHidden && "hidden"} mr-4`}>
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

          <button className={`${!isHidden && "hidden"} md:hidden text-lg transition-all duration-200 ease-linear`} onClick={() => setIsHidden(isHidden => !isHidden)}>
            <TiThMenu/>
          </button>

          <div className={`${isHidden && "hidden"} bg-transparent w-full flex flex-col items-center`}>
            <div className="w-full flex justify-between items-center">
              <div className='mr-4'>
                <Link to='/'>
                  <img src={logoImg} width="100px"/>
                </Link>
              </div>
              <button className="text-xl py-2 transition-all duration-200 ease-linear" onClick={() => setIsHidden(isHidden => !isHidden)}>
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
                      rounded-full border-y-2 border-transparent hover:border-fuchsia-700
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
