import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../components/Toast"; 

const Register = () => {
  const [inputs, setInputs] = useState({ username: "", email: "", password: "" });
  const [err, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", inputs);
      setToastMessage({ message: "Registration successful!", type: "success" });
      setTimeout(() => navigate("/login"), 2000); 
    } catch (err) {
      setError(err.response.data);
      setToastMessage({ message: "Registration failed!", type: "error" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Toast message={toastMessage?.message} type={toastMessage?.type} onClose={() => setToastMessage(null)} />
      <div className="w-full max-w-sm p-8 bg-green-600 shadow-lg rounded-lg ">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Register</h1>
        <form className="space-y-6">
          <input
            required
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            required
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-green-600 py-3 rounded-lg hover:text-green-800 transition-colors duration-200"
          >
            Register
          </button>
          {err && <p className="text-red-500 text-center">{err}</p>}
          <span className="block text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-black underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;



