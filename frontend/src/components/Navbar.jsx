import { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import navbarData from "../data/navbar.json";
import { MoonIcon, SunIcon } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, login, setLogin, role, setRole } =
    useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({ name: "", profilePic: "" });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("userId");
    if (login) {
      axios
      .get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        params: { patientId },
      })
        .then((res) => {
          setUser({
            name: res.data.name,
            profilePic: res.data.profilePic || "",
          });
        })
        .catch(() => setUser({ name: "", profilePic: "" }));
    } else {
      setUser({ name: "", profilePic: "" });
    }
  }, [login]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarUrl = user.profilePic
    ? user.profilePic
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name || "User"
      )}&background=random&color=fff&size=128`;

  const doctorMenu = [
    { label: "Dashboard", path: "/doctor-dashboard" },
    { label: "Appointments", path: "/doctor-appointments" },
    { label: "Profile", path: "/doctor-profile" },
  ];

  const patientMenu = [
    { label: "Home", path: "/home" },
    { label: "Dashboard", path: "/patient-dashboard" },
    { label: "Book Appointment", path: "/my-appointments" }
  ];

  const activeMenu = role === "doctor" ? doctorMenu : patientMenu;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setLogin(false);
    setRole(null);
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 dark:border-b-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={navbarData.assets.logo}
        alt="logo"
      />

      <ul className="md:flex items-start gap-5 font-medium hidden">
        {activeMenu.map((item, index) => (
          <NavLink key={index} to={item.path}>
            <li className="py-1 hover:text-primary">{item.label}</li>
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="relative w-14 h-7 flex items-center rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <span className="absolute left-1 text-yellow-500 dark:hidden">
            <SunIcon size={16} />
          </span>
          <span className="absolute right-1 text-gray-200 hidden dark:block">
            <MoonIcon size={16} />
          </span>
        </button>

        {/* User Section */}
        {login ? (
          <div
            className="relative flex items-center gap-2 cursor-pointer"
            ref={dropdownRef}
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={avatarUrl}
              alt="profile avatar"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <span className="ml-2 font-medium">{user.name}</span>
            <img
              className="w-2.5"
              src={navbarData.assets.dropdown_icon}
              alt="dropdown"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute top-10 right-0 z-50">
                <div className="min-w-48 bg-stone-100 dark:bg-gray-800 rounded flex flex-col gap-2 p-3 shadow-lg">
                  <p
                    className="hover:text-black dark:hover:text-white cursor-pointer"
                    onClick={() =>
                      navigate(
                        role === "doctor" ? "/doctor-profile" : "/profile"
                      )
                    }
                  >
                    Profile
                  </p>
                  <p
                    className="hover:text-black dark:hover:text-white cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
