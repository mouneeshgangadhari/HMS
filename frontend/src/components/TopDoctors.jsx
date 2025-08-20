import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 dark:text-gray-100 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600 dark:text-gray-400">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              window.scrollTo(0, 0)
            }}
            className="border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              className="w-full h-48 object-cover bg-blue-50 dark:bg-gray-700"
              src={item.image}
              alt={item.name}
            />

            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors')
          window.scrollTo(0, 0)
        }}
        className="bg-blue-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
      >
        more
      </button>
    </div>
  )
}

export default TopDoctors
