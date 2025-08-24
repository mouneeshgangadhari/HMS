import { useState } from "react";
import DoctorRegister from "./DoctorRegister";
import UserRegister from "./UserRegister";

const Register = () => {
  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsDoctor(false)}
            className={`w-1/2 py-2 rounded-l-lg ${
              !isDoctor
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => setIsDoctor(true)}
            className={`w-1/2 py-2 rounded-r-lg ${
              isDoctor
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Doctor
          </button>
        </div>

        {isDoctor ? <DoctorRegister /> : <UserRegister />}
      </div>
    </div>
  );
};

export default Register;
