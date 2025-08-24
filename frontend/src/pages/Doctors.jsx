import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Doctors = () => {
  const { speciality } = useParams();
  const [doctors, setDoctors] = useState([]);   // fetched doctors
  const [filterDoc, setFilterDoc] = useState([]); // filtered doctors
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/doctor");
        setDoctors(res.data.doctors || []); // assuming your backend sends { doctors: [...] }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  // Apply filter whenever doctors or speciality changes
  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.specialization === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
        >
          Filters
        </button>

        {/* Filters list */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === spec ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors grid */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item) => (
            <div key={item._id}>
              <div
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  window.scrollTo(0, 0);
                }}
                className="border border-indigo-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img
                  className="bg-indigo-50 w-full h-48 object-cover"
                  src={item.image || "/placeholder.png"} // fallback image
                  alt={item.name}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-neutral-800 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-zinc-600 text-sm">
                    {item.specialization}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filterDoc.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No doctors found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
