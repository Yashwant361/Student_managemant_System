import React from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';


const Navbar = () => {
    const navigate = useNavigate();
    const { setUserDetails, setIsLogin, userDetails } = useUser()
    const handleLogout = () => {
        localStorage.clear();
        toast.success('logout successfully');
        setUserDetails({ name: "", email: "", age: "", role: "" });
        setIsLogin(false);
        navigate('/login');
    }
    return (
        <>

        <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center transition duration-300">

            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Student Profile
            </h1>
            <div className="flex items-center space-x-6">
               
                <Link
                    to="/subject"
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
                >
                    Subject
                </Link>

                <Link
                    to="/profile"
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
                >
                    Profile
                </Link>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 shadow-md"
                >
                    Logout
                </button>

            </div>
        </nav>
            {/* <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center transition duration-300">

                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                        Student Profile
                    </h1>
                </div>
                <div className="flex items-center space-x-6">
                    <Link
                        to="/profile"
                        className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
                    >
                        Profile
                    </Link>

                    {userDetails.role === 'std' ? (
                        <Link
                            to="/subject"
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
                        >
                            Subject
                        </Link>
                    ) : (
                        <Link
                            to="/allstudents"
                            className="text-gray-700 font-medium hover:text-blue-600 transition"
                        >
                            All Students
                        </Link>
                    )}

                </div>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition active:scale-95"
                >
                    Logout
                </button>

            </nav> */}

        </>
    )
}

export default Navbar
