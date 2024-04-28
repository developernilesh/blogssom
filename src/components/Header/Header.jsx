import React from "react";
import {Container, logoImg, LogoutBtn} from "../index"
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const location = useLocation()

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
    <header className='py-3 bg-transparent sticky z-10 top-0 text-indigo-900'>
      <Container className="py-1 bg-transparent backdrop-blur rounded-full">
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <img src={logoImg} width="100px"/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
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
        </nav>
      </Container>
    </header>
  );
};

export default Header;
