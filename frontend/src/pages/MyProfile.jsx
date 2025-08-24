import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("userId");

        const res = await axios.get("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          params: { patientId },
        });

        setUserData(res.data.user);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsEdit(false);
    try {
      const token = localStorage.getItem("token");
      const patientId = localStorage.getItem("userId");

      const res = await axios.put(
        "http://localhost:8080/api/auth/me",
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { patientId },
        }
      );

      setUserData(res.data.user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
    Patient Profile
  </h2>

  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Name
    </label>
    <input
      type="text"
      name="name"
      value={userData.name}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />
  </div>

  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Email
    </label>
    <input
      type="email"
      name="email"
      value={userData.email}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />
  </div>

  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Phone
    </label>
    <input
      type="text"
      name="phone"
      value={userData.phone}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />
  </div>

  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Age
    </label>
    <input
      type="number"
      name="age"
      value={userData.age}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />
  </div>

  <div className="mt-10">
    {isEdit ? (
      <button
        onClick={handleSave}
        className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all text-gray-900 dark:text-white"
      >
        Save information
      </button>
    ) : (
      <button
        onClick={() => setIsEdit(true)}
        className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all text-gray-900 dark:text-white"
      >
        Edit
      </button>
    )}
  </div>
</div>

  );
}
