// DoctorRegister.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DoctorRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    hospital: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("Submitting form:", form);
      const res = await axios.post("/api/doctor/register", form);
      console.log(res.data);
      setSuccess("Doctor registered successfully!");
      setTimeout(() => navigate("/doctor/login"), 1500); // Redirect after success
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">Doctor Registration</h2>

      {error && (
        <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
      )}
      {success && (
        <p className="mb-4 text-green-600 text-sm text-center">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization (e.g. Cardiology)"
          value={form.specialization}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="hospital"
          placeholder="Hospital/Clinic"
          value={form.hospital}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
