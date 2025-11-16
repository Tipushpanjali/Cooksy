import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Countries(props) {
    //const { name,bg } = useParams();
  return (
    <div>
        <Link 
            to={props.link} 
           className="border-2 border-black md:h-10 w-fit sm:h-7 md:px-2 sm:px-1 rounded-xl bg-cover overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity" 
           style={{ 
            backgroundImage: `url(${props.bgImg})`,  
            backgroundColor: "rgba(0,0,0,0.4)",
            backgroundBlendMode: "darken"
          }}
        >
          <h1 className='text-center md:text-xl sm:text-x  font-bold text-white'>{props.name}</h1>
        </Link>
    </div>
  )
}
  
export default Countries