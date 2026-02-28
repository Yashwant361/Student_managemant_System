import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useUser } from '../context/userContext';
const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        name: "",
        age: "",
        password: "",
        code: ""
    });
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    const handleFormChange = (e) => {
        const { name, value } = e.target
        setUserDetails((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, name, age, password, code } = userDetails;
        try {
            const res = await axios.post(`http://localhost:3000/api/${user}/signup`, { email, age, name, password, code });
            toast.success(res.data.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">

                <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                        Create Account 
                    </h1>

                    <p className="text-center text-gray-500 text-sm mb-6">
                        Signup to get started
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            value={userDetails.name}
                            placeholder="Full Name"
                            name="name"
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />

                        <input
                            type="email"
                            value={userDetails.email}
                            placeholder="Email Address"
                            name="email"
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />

                        <input
                            type="number"
                            value={userDetails.age}
                            placeholder="Age"
                            name="age"
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />

                        <input
                            type="password"
                            value={userDetails.password}
                            placeholder="Password"
                            name="password"
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />

                        {user === "trainer" && (
                            <input
                                type="text"
                                value={userDetails.code}
                                placeholder="Trainer Code"
                                name="code"
                                onChange={handleFormChange}
                                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            />
                        )}

                        <button
                            type="submit"
                            className="w-full py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition duration-200 shadow-md"
                        >
                            Signup
                        </button>

                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Signup as <span className="font-semibold text-blue-600">{user}</span>
                        </p>

                        <div className="flex justify-center gap-4 mt-3">
                            <button
                                onClick={() => setUser('std')}
                                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 active:scale-95 transition shadow"
                            >
                                Student
                            </button>

                            <button
                                onClick={() => setUser('trainer')}
                                className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 active:scale-95 transition shadow"
                            >
                                Trainer
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </div>

                </div>
            </div>
            );


        </>
    )
}

export default Signup
