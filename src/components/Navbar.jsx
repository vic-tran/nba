import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
    return (
      <div className="fixed w-full h-10 shadow-xl z-[100] text-current">
        <div className="flex justify-between items-center w-full px-2 2xl:px-16">
          <a href="/" className="cursor-pointer">
            <img src={logo} alt="/" />
          </a>
        </div>
      </div>
    );
  };
  
  export default Navbar;