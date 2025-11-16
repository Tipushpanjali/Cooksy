import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../components/firebase';
import { useOutletContext } from "react-router-dom";
import { Link } from 'react-router-dom';

function India() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // course filter
  const [selectedFilter, setSelectedFilter] = useState('all');

  // pagination
  const [currentpage, setcurrentpage] = useState(1);
  const recipesPerPage = 6;

  // 🔥 GET SEARCH TEXT FROM PARENT LAYOUT
  const { searchText } = useOutletContext();

  const listrecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Recipes"));
      const recipesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return recipesData;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  };

  useEffect(() => {
    listrecipes().then((data) => {
      setRecipes(data);
      setLoading(false);
    });
  }, []);

  // Filter by course type
  const filterRecipesByCourse = (courseType) => {
    if (courseType === 'all') return recipes;

    return recipes.filter(recipe =>
      recipe.tags &&
      recipe.tags.toLowerCase().includes(courseType.toLowerCase())
    );
  };

  // 🔥 APPLY SEARCH + COURSE FILTER TOGETHER
  const filteredRecipes = filterRecipesByCourse(selectedFilter).filter(recipe =>
    recipe.title?.toLowerCase().includes((searchText || "").toLowerCase())
  );

  // Pagination calculations
  const indexOfLastRecipe = currentpage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const prevPage = () => {
    if (currentpage > 1) setcurrentpage(currentpage - 1);
  };
  const nextPage = () => {
    if (currentpage < totalPages) setcurrentpage(currentpage + 1);
  };

  // Reset pagination when filter changes
  useEffect(() => {
    setcurrentpage(1);
  }, [selectedFilter, searchText]);

  const RecipeList = ({ recipes }) => (
    <div className='flex flex-col gap-5'>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <div className="bg-white shadow-md border border-gray-400 rounded-lg p-6">

            <div className="flex justify-between items-start mb-4">
              <span className="bg-pink-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded">
                {recipe.tags}
              </span>
            </div>

            <Link to={`/recipes/${recipe.id}`} className="block mb-3">
              <h2 className="text-xl font-semibold text-gray-900">
                {recipe.title}
              </h2>
            </Link>

            <div className='flex flex-row gap-10'>
              <img
                src={recipe.imageURL || 'src/assets/no-image.jpg'}
                alt={recipe.title}
                className="w-48 h-48 object-cover rounded mb-4 border border-black"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'src/assets/no-image.jpg';
                }}
              />

              <div className='flex flex-col'>
                <p className="text-gray-600 line-clamp-3">{recipe.description}</p>

                <div className="flex justify-start my-4">
                  <Link to={`/recipecard/${recipe.id}`}>
                    <button
                      type="button"
                      className="h-[fit-content] w-[fit-content] p-2 bg-orange-600 text-white font-medium rounded-md border border-transparent hover:bg-white hover:text-orange-600 hover:border-orange-600 transition-colors"
                    >
                      View Recipe
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        <div>

          {/* FILTER BUTTONS */}
          <div className="sticky top-50 cssbg pb-4 -mx-4 sm:-mx-6 md:-mx-10 px-4 sm:px-6 md:px-10 mb-6">
            <div className="flex flex-wrap gap-8 border-b border-gray-300">

              {["all", "snack", "main course", "dessert"].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedFilter(type)}
                  className={`pb-3 font-medium transition-colors relative ${
                    selectedFilter === type
                      ? "text-orange-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {type === "all"
                    ? "All Recipes"
                    : type.charAt(0).toUpperCase() + type.slice(1)}

                  {selectedFilter === type && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"></span>
                  )}
                </button>
              ))}

            </div>
          </div>

          {/* SEARCH + FILTER RESULTS */}
          {filteredRecipes.length === 0 ? (
            <p className="text-gray-600">No recipes found.</p>
          ) : (
            <RecipeList recipes={currentRecipes} />
          )}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && filteredRecipes.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={currentpage === 1}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setcurrentpage(i + 1)}
                className={`px-4 py-2 rounded-md font-medium ${
                  currentpage === i + 1 ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentpage === totalPages}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default India;
