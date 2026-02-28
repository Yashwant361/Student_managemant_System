import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/${user}/login`,
        { email: userDetails.email, password: userDetails.password }
      );
      localStorage.setItem('token', res.data.token);
      toast.success(res.data.message);
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login Page</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={userDetails.email}
              placeholder="Email"
              name="email"
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={userDetails.password}
              placeholder="Password"
              name="password"
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/forget" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <h2 className="mt-6 text-lg font-semibold text-center">
            Login as <span className="text-blue-600">{user}</span>
          </h2>
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={() => setUser('std')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Student
            </button>
            <button
              onClick={() => setUser('trainer')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              Trainer
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account?</span>{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>



  );
};

export default Login;
