import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/todoForm">TodoForm</Link>
        </li>
        <li>
          <Link to="/allTodo">All Todo</Link>
        </li>
    
      </ul>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
