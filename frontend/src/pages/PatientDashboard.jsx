import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const PatientDashboard = () => {
const { login } = useContext(AppContext);
const [user, setUser] = useState(null);
const [appointments, setAppointments] = useState([]);

useEffect(() => {
  if (login) {
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("userId");
    console.log(`Bearer ${token}`);
    console.log(`Patient ID: ${patientId}`);
    // ✅ Fetch patient info
    axios
      .get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        params: { patientId },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error("Error fetching patient info:", err));
    // ✅ Fetch appointments
    axios
      .get("http://localhost:8080/api/appointment/my", {
        headers: { Authorization: `Bearer ${token}` },
        params: { patientId },
      })
      .then((res) => setAppointments(res.data.appointments))
      .catch((err) => console.error("Error fetching appointments:", err));
  }
}, [login]);

if (!login) return <p>Please login to see your dashboard.</p>;
if (!user) return <p>Loading your data...</p>;

console.log(appointments);

const upcoming = appointments.filter(
  (a) => new Date(a.date) >= new Date()
);
const past = appointments.filter(
  (a) => new Date(a.date) < new Date()
);

  return (
   <div className="p-6 max-w-5xl mx-auto">
  <h1 className="text-3xl font-bold text-gray-800">
    Welcome, <span className="text-blue-600">{user.name}</span>
  </h1>

  {/* Upcoming Appointments */}
  <div className="mt-8">
    <h2 className="text-2xl font-semibold text-green-600 border-b pb-2">
      Upcoming Appointments
    </h2>

    {upcoming.length ? (
      <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((a) => (
          <div
            key={a._id}
            className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition"
          >
            <p className="text-lg font-semibold text-gray-800">
              {new Date(a.date).toLocaleDateString()} - {a.time}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Doctor:</span> Dr. {a.doctor?.name}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Specialization:</span>{" "}
              {a.doctor?.specialization}
            </p>
            <p
              className={`mt-3 px-3 py-1 rounded-full text-sm font-medium w-fit ${
                a.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : a.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {a.status}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="mt-3 text-gray-500 italic">No upcoming appointments.</p>
    )}
  </div>

  {/* Past Appointments */}
  <div className="mt-12">
    <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">
      Past Appointments
    </h2>

    {past.length ? (
      <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {past.map((a) => (
          <div
            key={a._id}
            className="bg-gray-50 p-5 rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <p className="text-lg font-semibold text-gray-700">
              {new Date(a.date).toLocaleDateString()} - {a.time}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Doctor:</span> Dr. {a.doctor?.name}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Specialization:</span>{" "}
              {a.doctor?.specialization}
            </p>
            <p
              className={`mt-3 px-3 py-1 rounded-full text-sm font-medium w-fit ${
                a.status === "completed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {a.status}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="mt-3 text-gray-500 italic">No past appointments.</p>
    )}
  </div>
</div>

  );
};

export default PatientDashboard;
