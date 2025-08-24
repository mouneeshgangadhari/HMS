// DoctorAppointments.jsx
import axios from "axios";
import { useEffect, useState } from "react";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/doctor/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/api/doctor/appointments/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id ? { ...appt, status: res.data.status } : appt
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Appointments</h2>
      <table className="table-auto border w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1">Patient</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td className="border px-2 py-1">{appt.patientName}</td>
              <td className="border px-2 py-1">{appt.date}</td>
              <td className="border px-2 py-1">{appt.status}</td>
              <td className="border px-2 py-1">
                <select
                  value={appt.status}
                  onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                  className="border px-2 py-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
