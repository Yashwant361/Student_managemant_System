import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const UserContext=createContext();
export const UserWrapper=({children})=>{
    const navigate=useNavigate()
    const [userDetails,setUserDetails]=useState({email:"",name:"",age:"",role:""});
    const [user,setUser]=useState(localStorage.getItem('user') || 'std');
    const [allStd,setAllStd]=useState([]);
    const [isLogin,setIsLogin]=useState(false);
      const getStdDetails=async()=>{
      const token=localStorage.getItem('token');
      if(! token) {
        return navigate('/login');
      }
      try {
        const res=await axios.get(`http://localhost:3000/api/${user}/get`,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUserDetails(res.data.user);
        localStorage.setItem('user',res.data.user.role);
        setIsLogin(true);
      } catch (error) {
          toast.error(error.response.data.message);
          localStorage.removeItem('token');
          navigate('/login');
      }
    }
    const getAllStds=async()=>{
        const token=localStorage.getItem('token');
        if(! token) {
            return navigate('/login');
        }
        try {
          const res=await axios.get('http://localhost:3000/api/trainer/allstd',{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
          
            setAllStd(res.data);
        } catch (error) {
            toast.success(error.response.data.message);
        }
      }
    return <UserContext.Provider value={{userDetails,setUserDetails,isLogin,setIsLogin,user,setUser,getStdDetails,getAllStds,allStd,setAllStd}}>
            {children}
    </UserContext.Provider>
} 

export const useUser=()=>{
    return useContext(UserContext);
}