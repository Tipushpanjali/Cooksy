import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import Countries from '../components/countries'
import { Outlet } from 'react-router-dom'

const RecipesPage = () => {
  const location = useLocation()
   const [searchText, setSearchText] = useState("")

  const getActiveCountry = () => {
    if (location.pathname.includes('/gujrat')) return 'Gujrat'
    if (location.pathname.includes('/rajasthan')) return 'Rajasthan'
    if (location.pathname.includes('/south')) return 'South'
    if (location.pathname.includes('/bihar')) return 'Bihar'
    if (location.pathname.includes('/Delhi')) return 'Delhi'
    return 'India'
  }

  const activeCountry = getActiveCountry()

  return (
    <div className="px-4 sm:px-6 md:px-10  mt-15 ">
      {/* Fixed Container for Countries and Search */}
      <div className="sticky top-15 cssbg pb-4 -mx-4 sm:-mx-6 md:-mx-10 px-4 sm:px-6 md:px-10">
        {/* Country Selector */}
        <div className="flex flex-row gap-3 scrollbar-hide sm:justify-center md:justify-start pt-4">
          <div
            className={`flex-shrink-0 py-1 ${activeCountry === 'India' ? 'scale-110' : ''} transition-transform duration-200`}
          >
            <Countries name="India" bgImg="/india.png" link="/recipes/all" />
          </div>

          <div className="flex flex-row gap-3 py-1 overflow-x-auto scrollbar-hide sm:justify-center md:justify-start">
            <div
              className={`flex-shrink-0 ${activeCountry === 'Gujrat' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Gujrat" bgImg="/gujrat.png" link="/recipes/gujrat" />
            </div>
            <div
              className={`flex-shrink-0 ${activeCountry === 'Rajasthan' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Rajasthan" bgImg="/rajasthan.png" link="/recipes/rajasthan" />
            </div>
            <div
              className={`flex-shrink-0 ${activeCountry === 'South' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="South" bgImg="/south.png" link="/recipes/south" />
            </div>
            <div
              className={`flex-shrink-0 ${activeCountry === 'Bihar' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Bihar" bgImg="/bihar.png" link="/recipes/bihar" />
            </div>
            <div
              className={`flex-shrink-0 ${activeCountry === 'Punjab' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Punjab" bgImg="/bihar.png" link="/recipes/Punjab" />
            </div>
             <div
              className={`flex-shrink-0 ${activeCountry === 'Haryana' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Haryana" bgImg="/bihar.png" link="/recipes/Haryana" />
            </div>
             <div
              className={`flex-shrink-0 ${activeCountry === 'Madhya Pradesh' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Madhya Pradesh" bgImg="/bihar.png" link="/recipes/MadhyaPradesh" />
            </div>
             <div
              className={`flex-shrink-0 ${activeCountry === 'Odissa' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Odissa" bgImg="/bihar.png" link="/recipes/Odissa" />
            </div>
             <div
              className={`flex-shrink-0 ${activeCountry === 'Mizoram' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Mizoram" bgImg="/bihar.png" link="/recipes/Mizoram" />
            </div>
             <div
              className={`flex-shrink-0 ${activeCountry === 'Manipur' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Manipur" bgImg="/bihar.png" link="/recipes/Manipur" />
            </div>
             <div
              className={`flex-shrink-0 ${activeCountry === 'Kerela' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Kerela" bgImg="/bihar.png" link="/recipes/Kerela" />
            </div>
             <div
              className={`flex-shrink-0 ${activeCountry === 'Uttar Pradesh' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Uttar Pradesh" bgImg="/bihar.png" link="/recipes/UttarPradesh" />
            </div>
             <div
              className={`flex-shrink-0 ${activeCountry === 'Delhi' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Delhi" bgImg="/bihar.png" link="/recipes/Delhi" />
            </div>
             <div
              className={`flex-shrink-0 ${activeCountry === 'Assam' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Assam" bgImg="/bihar.png" link="/recipes/Assam" />
            </div>
             <div
              className={`flex-shrink-0 ${activeCountry === 'Jammu Kashmir' ? 'scale-110' : ''} transition-transform duration-200`}
            >
              <Countries name="Jammu Kashmir" bgImg="/bihar.png" link="/recipes/JammuKashmir" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4 w-full">
        <input
          type="text"
          placeholder="Search recipes"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full py-2 sm:py-3 pl-10 pr-4 rounded-lg bg-gray-100 border border-gray-400 
          focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm sm:text-base"
        />

        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      </div>

      {/* Recipes */}
      <div className="mt-4">
        <Outlet context={{ searchText }}/>
      </div>

      {/* Floating Add Button */}
      <Link
        to="/add-recipe"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 bg-orange-600 text-white p-3 sm:p-4 rounded-full shadow-lg border border-transparent hover:bg-white hover:text-orange-600 hover:border-orange-600 hover:scale-110 transition-transform duration-200"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </Link>
    </div>
  )
}

export default RecipesPage