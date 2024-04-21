import React from "react";
import {Container, logoImg, LogoutBtn} from "../index"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

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
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]


  return (
    <header className='py-3 bg-transparent sticky z-10 top-0'>
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
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 mr-2 duration-200 border-y-2 text-lg font-semibold
                border-transparent hover:border-fuchsia-600 rounded-full'
                >{item.name}</button>
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
