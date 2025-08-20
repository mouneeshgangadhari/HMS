import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; 
import navbarData from "../data/navbar.json";
import { MoonIcon, SunIcon } from "lucide-react";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [state,setState]=useState(true);
  const { darkMode, setDarkMode } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 dark:border-b-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={navbarData.assets.logo}
        alt="logo"
      />

      {/* Desktop Menu */}
      <ul className="md:flex items-start gap-5 font-medium hidden">
        {navbarData.menu.map((item, index) => (
          <NavLink key={index} to={item.path}>
            <li className="py-1 hover:text-primary">{item.label}</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-4">
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="relative w-14 h-7 flex items-center rounded-full 
               transition-colors duration-300 
               bg-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 
               focus:ring-primary focus:ring-offset-2"
    aria-label="Toggle Dark Mode"
  >
    {/* Sun / Moon Icons */}
    <span className="absolute left-1 text-yellow-500 dark:hidden">
      <SunIcon size={16} />
    </span>
    <span className="absolute right-1 text-gray-200 hidden dark:block">
      <MoonIcon size={16} />
    </span>

    {/* Sliding circle */}
    {/* <div
      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
        ${darkMode ? "translate-x-7" : "translate-x-0"}`}
    /> */}
  </button>

        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={
                "https://onlinehospitalproject.s3.eu-north-1.amazonaws.com/images/519-0-2.jpg"
              }
              alt="profile"
            />
            <img
              className="w-2.5"
              src={navbarData.assets.dropdown_icon}
              alt="dropdown"
            />

            {/* Profile Dropdown */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 dark:text-gray-200 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 dark:bg-gray-800 rounded flex flex-col gap-4 p-4">
                {navbarData.profileMenu.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      if (item.label === "Logout") {
                        setToken(false);
                      }
                      navigate(item.path);
                    }}
                    className="hover:text-black dark:hover:text-white cursor-pointer"
                  >
                    {item.label}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={navbarData.assets.menu_icon}
          alt="menu"
        />

        {/* ---- Mobile Menu ---- */}
        <div
          className={`md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white dark:bg-gray-900 transition-all ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={navbarData.assets.logo} className="w-36" alt="logo" />
            <img
              onClick={() => setShowMenu(false)}
              src={navbarData.assets.cross_icon}
              className="w-7"
              alt="close"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            {navbarData.menu.map((item, index) => (
              <NavLink
                key={index}
                onClick={() => setShowMenu(false)}
                to={item.path}
              >
                <p className="px-4 py-2 rounded full inline-block">
                  {item.label}
                </p>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
