import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setSelectedRole] = useState("Patient");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setRole,setLogin } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let res;

      if (role === "doctor") {
        res = await axios.post("/api/doctor/login", { email, password });
      } else {
        res = await axios.post("/api/auth/login", { email, password });
      }
      console.log("Login response:", res.data);
      // Save token & role
      localStorage.setItem("token", res.data.accessToken?.replace("Bearer ", ""));
      localStorage.setItem("role", role);
      localStorage.setItem("userId", res.data.user._id); // Save userId if available

      setRole(role);
      setLogin(true);
      // Redirect based on role
      if (role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Login</p>
        <p>Please log in to continue</p>

        {/* Email */}
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        {/* Role Selector */}
        <div className="w-full">
          <p>Role</p>
          <select
            value={role}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white w-full py-2 rounded-md text-base disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register redirect */}
        <p>
          Create a new account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-primary underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
