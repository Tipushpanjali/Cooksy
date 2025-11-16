import React from 'react'
import { useParams } from 'react-router-dom'
function Homecard(props) {
  return (
    
    <div className="bg-[#f8d5a9] flex flex-col items-center justify-center rounded-2xl shadow-md p-5 w-60 text-center transition-transform hover:scale-105 duration-300">
      <img
        src={props.src} 
        alt={props.name}
        className="w-28 h-28 rounded-full object-cover shadow-md -mt-12 border-4 border-[#fef4e8]"
      />
      <h2 className="text-lg font-semibold text-gray-900 mt-4">{props.name}</h2>
      <p className="text-gray-700 text-sm mt-1">
        {props.desc}
      </p>
    </div>
  )
}

export default Homecard