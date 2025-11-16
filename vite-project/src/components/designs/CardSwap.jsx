import React from 'react'
import { Link } from 'react-router-dom'
import Homecard from './homecard'
import Homecard2 from './Homecard2'

function CardSwap() {
  return (
    <div className="flex flex-col items-center gap-7 px-4 md:px-8 lg:px-16">
   
      <div className="flex flex-col md:flex-row gap-6 md:gap-3 justify-between items-center w-full">
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Taste India on One Plate
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl max-w-xl mx-auto md:mx-0">
            Discover recipes made by real people from every corner of India — from North's spicy gravies to South's tangy flavors, from East's sweets to West's street food.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            className="w-52 sm:w-72 md:w-96 lg:w-[520px] h-auto"
            src="/indiamap.png"
            alt="India map"
          />
        </div>
      </div>

      {/* Explore Button */}
      <div>
        <Link
          to="/recipes"
          className="px-6 py-3 sm:py-4 bg-orange-600 hover:bg-white border hover:border-orange-600 hover:text-orange-600 text-white font-medium rounded-lg text-sm sm:text-base"
        >
          Explore Recipes
        </Link>
      </div>


      <div className="text-2xl sm:text-3xl md:text-4xl my-7 font-bold text-center">
        Explore India's Flavours
      </div>

      
      <div className="flex flex-wrap justify-center gap-4">
        <Homecard src="/chawal.png" name="West India" desc="chawal, daal, puchka, dahi-poori ......more" />
        <Homecard src="/dosa.png" name="South India" desc="Dosa, sambhar, idli, rasam ......more" />
        <Homecard src="/biryani.png" name="North India" desc="Butter Chicken, Rajma Chawal, Paratha ......more" />
        <Homecard src="/samosa.png" name="East India" desc="Samosa, rasgulla, paani poori .....more" />
      </div>

     
      <div className="text-lg sm:text-2xl md:text-3xl italic text-[#774405] text-center px-4">
        Every Region adds its own story and flavor
      </div>

      
      <div className="bg-orange-500 w-full flex flex-col items-center p-5">
        <h1 className="font-bold text-2xl sm:text-3xl m-4 text-white">Trending Now</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <Homecard2 src="/chawal.png" name="naan chhole" dsc="main-course food from Bihar" />
          <Homecard2 src="/dosa.png" name="Dosa" dsc="breakfast snack from Tamil Nadu" />
          <Homecard2 src="/samosa.png" name="Samosa" dsc="Snack from Delhi" />
          <Homecard2 src="/biryani.png" name="Non-veg Biryani" dsc="main-course from Punjab" />
        </div>
      </div>
    </div>
  )
}

export default CardSwap
