import React, { useEffect, useState } from 'react'
import { useUser } from '../context/userContext'

const AllStudents = () => {
  const {getStdDetails,getAllStds,allStd}=useUser();
  
 
  useEffect(()=>{
    getStdDetails();
    getAllStds();
  },[])
  return (
    <div>
        <h1>AllStudents</h1>

        {
           allStd.map((s,i)=><div key={i}> {s.name}</div>)
        }
    </div>
  )
}

export default AllStudents
