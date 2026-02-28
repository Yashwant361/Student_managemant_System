import React, { useEffect } from 'react'
import { useUser } from '../context/userContext'

const AllStudents = () => {
  const { getStdDetails, getAllStds, allStd } = useUser();

  useEffect(() => {
    getStdDetails();
    getAllStds();
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          All Students
        </h1>

        <div className="grid gap-4">
          {
            allStd?.length > 0 ? (
              allStd.map((s, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                >
                  <h2 className="text-lg font-semibold text-gray-700">
                    {s.name}
                  </h2>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No students found.
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default AllStudents