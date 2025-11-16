import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../components/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faArrowLeft, faClock } from '@fortawesome/free-solid-svg-icons'

function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "Recipes", id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setRecipe({ id: docSnap.id, ...docSnap.data() })
        } else {
          setError("Recipe not found")
        }
      } catch (err) {
        console.error("Error fetching recipe:", err)
        setError("Failed to load recipe")
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading recipe...</div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl text-red-600 mb-4">{error || "Recipe not found"}</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="m-20 min-h-screen  py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-orange-600 hover:text-orange-700 mb-6 font-medium"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Recipes
        </button>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
            <span className="bg-pink-100 text-orange-600 text-sm font-medium px-3 py-1 rounded">
              {recipe.tags}
            </span>
          </div>

          {/* Author and Date */}
          <div className="flex items-center text-gray-600 mb-4">
            <FontAwesomeIcon icon={faUserCircle} className="text-2xl mr-2" />
            <span className="text-sm">by: {recipe.email}</span>
            <span className="text-sm ml-4">
              {recipe.createdAt?.toDate
  ? recipe.createdAt.toDate().toLocaleDateString()
  : new Date(recipe.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Prep Time */}
          {recipe.TotalTime && (
            <div className="flex items-center text-gray-700 mb-4">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span className="font-medium">{recipe.TotalTime} minutes</span>
            </div>
          )}

          {/* Recipe Image */}
          <img
            src={recipe.imageURL || 'src/assets/no-image.jpg'}
            alt={recipe.title || 'Recipe image'}
            className="w-full h-96 object-cover rounded-lg border border-gray-300 mb-6"
          />

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
          </div>

          {/* State/Origin */}
          {recipe.state && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Origin</h2>
              <p className="text-gray-700">From: {recipe.state}</p>
            </div>
          )}

          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Ingredients</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{recipe.ingredient}</p>
            </div>
          </div>

          {/* Preparation */}
          {recipe.preparation && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Preparation</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{recipe.preparation}</p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Instructions</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{recipe.instruction}</p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail