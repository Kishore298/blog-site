import React from "react";  
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-between gap-5 p-2 bg-black text-white mt-4">
      <div className="flex place-items-center gap-2">
      <img src={Logo} alt="Logo" className=" h-12 md:h-24" /> 
      <h2 className="text-xl text-blue-300">KS Blogs</h2>
      </div>
      <span className="text-lg md:text-xl text-green-500">developed by Kishore with love ♥️.</span> 
    </footer>
  );
};

export default Footer;







