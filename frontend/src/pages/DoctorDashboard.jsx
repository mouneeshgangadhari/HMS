import axios from "axios";
import { useEffect, useState } from "react";

export default function DoctorDashboard() {

  const [doctor, setDoctor] = useState({
    name: " ",
    specialization: " ",
  });
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res= await axios.get("/api/doctor/appointments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(res.data);
      const data = res.data;
      setAppointments(data);
    };
    fetchAppointments();
  }, []);
  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter((appt) => appt.date === today);
  const upcomingAppointments = appointments.filter((appt) => appt.date !== today);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">👨‍⚕️ Doctor Dashboard</h1>

      {/* Overview Card */}
      <div className="bg-blue-100 p-4 rounded-xl mt-4 shadow">
        <h2 className="text-xl font-semibold">Welcome, {doctor.name}</h2>
        <p className="text-gray-700">Specialization: {doctor.specialization}</p>
        <p className="mt-2">
          You have <b>{todaysAppointments.length} appointments</b> today.
        </p>
      </div>

      {/* Today’s Appointments */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Today's Appointments</h2>
        {todaysAppointments.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Time</th>
                <th className="border p-2">Patient</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {todaysAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td className="border p-2">{appt.time}</td>
                  <td className="border p-2">{appt.patient}</td>
                  <td className="border p-2">{appt.status}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleStatusChange(appt.id, "In Progress")}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusChange(appt.id, "Completed")}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No appointments today.</p>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Upcoming Appointments</h2>
        {upcomingAppointments.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Patient</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td className="border p-2">{appt.date}</td>
                  <td className="border p-2">{appt.time}</td>
                  <td className="border p-2">{appt.patient}</td>
                  <td className="border p-2">{appt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No upcoming appointments.</p>
        )}
      </div>
    </div>
  );
}
