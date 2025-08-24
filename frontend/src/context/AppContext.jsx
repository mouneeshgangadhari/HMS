import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState(null);
  
  const [specialities, setSpecialities] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // data states
  const [doctors, setDoctors] = useState([]);
const [assets, setAssets] = useState([]);
  const currencySymbol = "$";

  // fetch doctors from backend (MongoDB)
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token"); // if auth required
        const res = await axios.get("http://localhost:8080/api/doctor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res);
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  // fetch remaining data from AWS JSON
  useEffect(() => {
    const fetchAwsData = async () => {
      try {
        const res = await axios.get(
          "https://onlinehospitalproject.s3.eu-north-1.amazonaws.com/data.json"
        );
        setSpecialities(res.data.specialityData || []);
        setAssets(res.data.assets || []);
        // console.log("Fetched assets:", res.data.assets);
      } catch (err) {
        console.error("Error fetching AWS data:", err);
      }
    };

    fetchAwsData();
  }, []);

  // dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (token && storedRole) {
      setLogin(true);
      setRole(storedRole);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        login, 
        setLogin, 
        role, 
        setRole, 
        doctors, 
        specialities, 
        assets, 
        currencySymbol, 
        darkMode, 
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// AppContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default AppContextProvider;
