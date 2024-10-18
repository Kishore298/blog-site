import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Toast from "../components/Toast";  

const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [err, setError] = useState(null);
  const [toast, setToast] = useState(null);  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      setToast({ message: "Login successful!", type: "success" }); 
      setTimeout(() => navigate("/"), 2000);  
    } catch (err) {
      setError(err.response.data);
      setToast({ message: "Login failed. Check credentials.", type: "error" }); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {toast && <Toast message={toast.message} type={toast.type} />} 
      <div className="auth w-full max-w-sm p-8 bg-green-600 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Login</h1>
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
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-green-600 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Login
          </button>
          {err && <p className="text-red-500 text-center">{err}</p>}
          <span className="block text-center">
            Don't you have an account?{" "}
            <Link to="/register" className="text-black-600 underline">
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;


