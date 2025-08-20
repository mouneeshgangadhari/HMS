import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const SpecialityMenu = () => {
  const { specialities } = useContext(AppContext);
  console.log("Specialities:", specialities);

  return (
    <div id="speciality" className="flex flex-col items-center gap-4 py-16 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600 dark:text-gray-400">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialities.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            key={index}
          >
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt={item.speciality} />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
