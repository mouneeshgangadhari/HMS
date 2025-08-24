import { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appointment/my", { withCredentials: true })
      .then((res) => setAppointments(res.data.appointments || []))
      .catch(() => setAppointments([]));
  }, []);

  const cancelAppointment = async (id) => {
    await axios.put(`http://localhost:8080/api/appointment/${id}/cancel`);
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: "cancelled" } : a))
    );
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.doctor?.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.doctor?.name}</p>
              <p>{item.doctor?.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.doctor?.address?.line1}</p>
              <p className="text-xs">{item.doctor?.address?.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                {new Date(item.date).toLocaleDateString()} | {item.time}
              </p>
              <p className="text-xs mt-1">
                Status:{" "}
                <span
                  className={
                    item.status === "cancelled"
                      ? "text-red-500"
                      : "text-green-600"
                  }
                >
                  {item.status}
                </span>
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                Pay Online
              </button>
              <button
                onClick={() => cancelAppointment(item._id)}
                className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
