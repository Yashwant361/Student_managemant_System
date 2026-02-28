import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useUser } from '../context/userContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Subjects = () => {

  const [subject, setSubject] = useState("");
  const [allSubject, setAllSubject] = useState([]);
  const [edit, setEdit] = useState(null);
  const { setIsLogin, getStdDetails } = useUser();
  const navigate = useNavigate();
  async function getAllSub() {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/std/subject/allsubject', {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setIsLogin(true);
      setAllSubject(res.data.allSubjects);
    } catch (error) {
      toast.error(error.response.data.message);
      localStorage.removeItem('token');
      navigate('/');
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/std/subject/add', { subject }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message);
      setSubject("");
      getAllSub();
    } catch (error) {
      toast.error(error.response.data.message);
      setSubject("");
    }
  }
  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`http://localhost:3000/api/std/subject/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message);
      getAllSub();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const handleEdit = (i) => {
    setEdit(allSubject[i]._id);
    setSubject(allSubject[i].subject);
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch('http://localhost:3000/api/std/subject/updatesubject', { subject, editID: edit }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message);
      setEdit(null);
      setSubject("");
      getAllSub();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    getStdDetails();
    getAllSub();
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')]">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
           Subjects
          </h1>

          <form className="flex gap-3 mb-8">
            <input
              type="text"
              value={subject}
              placeholder="Enter subject name"
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {edit ? (
              <button
                type="submit"
                onClick={handleUpdate}
                className="px-5 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 active:scale-95 transition shadow"
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition shadow"
              >
                Add
              </button>
            )}
          </form>

          <ul className="space-y-4">
            {allSubject.map((s, i) => (
              <li
                key={s._id}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <span className="font-medium text-gray-700">
                  {s.subject}
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(i)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-95 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleRemove(s._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

        </div>

      </div>

    </>
  )
}

export default Subjects
