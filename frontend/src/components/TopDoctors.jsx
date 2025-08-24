import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
      {doctors.slice(0, 10).map((item, index) => (
        <div
          key={index}
          onClick={() => {
            navigate(`/appointment/${item._id}`);
            window.scrollTo(0, 0);
          }}
          className="border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
        >
          <img
            className="w-full h-48 object-cover bg-blue-50 dark:bg-gray-700"
            src={item.image}
            alt={item.name}
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-green-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <p>Available</p>
            </div>
            <p className="text-lg font-medium">{item.name}</p>
            <p className="text-sm">{item.specialization}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopDoctors;
