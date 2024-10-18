import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout(); 
    navigate("/login"); 
  };

  return (
    <div className="navbar bg-black text-green-600 p-2 w-full">
    <div className="container mx-auto flex justify-between items-center  w-full">
      <div className="logo flex place-items-center gap-2">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-12" />
        </Link>
        <h2 className="text-xl text-blue-300">KS Blogs</h2>
      </div>
      <div className="hidden md:flex space-x-4">
        {["Art", "Science", "Technology", "Cinema", "Design", "Food"].map((category) => (
          <Link 
            key={category} 
            className="link relative after:content-[''] after:block after:h-[2px] after:bg-green-800 after:w-0 hover:after:w-full transition-all duration-300" 
            to={`/?cat=${category}`}
          >
            <h6>{category.toLocaleUpperCase()}</h6>
          </Link>
        ))}
        <span>{currentUser?.username} <FontAwesomeIcon icon={faUser} className="mr-1" /></span>
        {currentUser ? (
          <span onClick={handleLogout} className="cursor-pointer flex items-center">
            Logout <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
          </span>
        ) : (
          <Link className="link" to="/login">Login/Register</Link>
        )}
        <span className="write flex items-center space-x-2">
          <Link className="link flex items-center relative after:content-[''] after:block after:h-[2px] after:bg-green-800 after:w-0 hover:after:w-full transition-all duration-300" to="/write">
            Write <FontAwesomeIcon icon={faEdit} className="mr-2" />
          </Link>
        </span>
      </div>
      <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
    {isOpen && (
      <div className="w-screen md:hidden bg-gray-700 p-4 ">
        {["Art", "Science", "Technology", "Cinema", "Design", "Food"].map((category) => (
          <Link key={category} className="block py-2 relative after:content-[''] after:block after:h-[2px] after:bg-green-800 after:w-0 hover:after:w-full transition-all duration-300" to={`/?cat=${category}`}>
            {category.toUpperCase()}
          </Link>
        ))}
        <span className="text-green-800">{currentUser?.username} <FontAwesomeIcon icon={faUser} className="mr-1" /></span>
        {currentUser ? (
          <span onClick={handleLogout} className="block flex items-center cursor-pointer">
            Logout <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
          </span>
        ) : (
          <Link className="block" to="/login">Login</Link>
        )}
        <Link className="block relative after:content-[''] after:block after:h-[2px] after:bg-green-800 after:w-0 hover:after:w-full transition-all duration-300" to="/write">
          Write
        </Link>
      </div>
    )}
  </div>  );
};

export default Navbar;


