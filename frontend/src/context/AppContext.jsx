import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [assets, setAssets] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const currencySymbol = "$";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://onlinehospitalproject.s3.eu-north-1.amazonaws.com/data.json"
        );
        console.log("API Response:", res.data);

        setDoctors(res.data.doctors || []);
        setSpecialities(res.data.specialityData || []);
        setAssets(res.data.assets || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
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

export default AppContextProvider;
