import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Navbar2.css";
import { navItems } from "./items";




function Navbar2() {
  const [dropdown, setDropdown] = useState();
//console.log(user);
  return (
    <>
      
      <nav className="navbar">
        <Link to="../" className="navbar-logo">
            Eminent Bank
          
        </Link>
        
        <ul className="nav-items">
          {navItems.map((item) => {
            
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
       
      </nav>
    </>
  );
}

export default Navbar2;
