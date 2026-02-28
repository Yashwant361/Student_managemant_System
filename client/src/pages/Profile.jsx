import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';

const Profile = () => {
  const [edit, setEdit] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { userDetails, setUserDetails, setIsLogin, user, getStdDetails } = useUser()
  const navigate = useNavigate();

  useEffect(() => {
    getStdDetails();
  }, []);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch('http://localhost:3000/api/std/updatename', { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      toast.success(res.data.message);
      setEdit("");
      getStdDetails();
      setName("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch('http://localhost:3000/api/std/updatepassword', { password, newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      toast.success(res.data.message);
      localStorage.removeItem('token');
      navigate('/login');
      setIsLogin(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setPassword("");
      setNewPassword("");
    }
  }
  return (
    <>
       <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')]">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">

          <div className="flex flex-col items-center mb-6">
            <img
              src={`https://ui-avatars.com/api/?name=${userDetails.name || "User"}&background=2563eb&color=fff&size=128`}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg mb-3"
            />
            <h1 className="text-2xl font-bold text-gray-800">
              {userDetails.name}
            </h1>
          </div>


          <div className="space-y-4 text-gray-700">

            <div className="flex justify-between items-center">
              <h3>
                <span className="font-semibold">Name:</span> {userDetails.name}
              </h3>

              {userDetails.role === 'std' && (
                <button
                  onClick={() => setEdit("name")}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </button>
              )}
            </div>

            <h3>
              <span className="font-semibold">Age:</span> {userDetails.age}
            </h3>

            <h3>
              <span className="font-semibold">Email:</span> {userDetails.email}
            </h3>

          </div>


          {edit === 'name' && (
            <form className="mt-6 space-y-3">
              <input
                type="text"
                placeholder="New Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleUpdateName}
                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Update Name
              </button>
            </form>
          )}


          {userDetails.role === 'std' && (
            <div className="mt-6">
              <button
                onClick={() => setEdit("password")}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
              >
                Update Password
              </button>
            </div>
          )}


          {edit === 'password' && (
            <form className="mt-4 space-y-3">
              <input
                type="password"
                placeholder="Old Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={handleUpdatePassword}
                className="px-4 py-2 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition"
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

export default Profile
