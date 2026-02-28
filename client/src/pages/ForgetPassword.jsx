import React, { useState } from 'react'
import { useUser } from '../context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  const { user, setUser } = useUser()

  const API = "https://student-managemant-system-2.onrender.com/";

  const handleGetOtp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('generating otp and sending to your email');

    try {
      const res = await axios.post(`${API}/api/otp`, { email, role: user });

      toast.dismiss(toastId);
      toast.success(res.data.message);
      setStep(1);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/otp/verify`, { email, otp });

      toast.success(res.data.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('changing password');
    try {
      const res = await axios.patch(`${API}/api/otp/changePassword`, { email, role: user, password });
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">

        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">

          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Forget Password
          </h1>

          {/* STEP 0 – EMAIL */}
          {step === 0 && (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGetOtp();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow"
                >
                  Get OTP
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Forget password as <span className="font-semibold text-blue-600">{user}</span>
                </p>

                <div className="flex justify-center gap-4 mt-3">
                  <button
                    onClick={() => setUser('std')}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                  >
                    Student
                  </button>

                  <button
                    onClick={() => setUser('trainer')}
                    className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition"
                  >
                    Trainer
                  </button>
                </div>
              </div>
            </>
          )}

          {/* STEP 1 – VERIFY OTP */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerifyOtp();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow"
              >
                Verify OTP
              </button>
            </form>
          )}

          {/* STEP 2 – UPDATE PASSWORD */}
          {step === 2 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdatePassword();
              }}
              className="space-y-4"
            >
              <input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow"
              >
                Update Password
              </button>
            </form>
          )}

        </div>
      </div>

    </>
  )
}

export default ForgetPassword
