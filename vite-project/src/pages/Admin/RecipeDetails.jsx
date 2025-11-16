import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

import AdminNav from '../../components/Admin/AdminNav';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase';
import { doc } from 'firebase/firestore';
function RecipeDetails() {
  const [recipes, setrecipes]= useState([]);
    const fetchRec= async()=>{
      const response = await getDocs(collection(db,"Recipes"));
      console.log(response)
      const recipeList = response.docs.map(doc => ({id:doc.id, ...doc.data()}));
      setrecipes(recipeList);
      console.log(recipeList);
    }
    useEffect(()=>{
      fetchRec();
    },[])
    const handleDelete= async(id)=>{
      try {
        await deleteDoc(doc(db,"Recipes", id));
        fetchRec()
      } catch (error) {
        console.log(error)
      }
    }
 
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white shadow-md">
        
          <AdminNav/>
      
      </div>

      {/* Main Content */}
      <div className="sticky top-20 max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Recipe Management
        </h2>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">
                    No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                    User ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                    State
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                    Tag
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                    Ingredients
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                    Instructions
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                    Prep Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                    Total Time
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                { recipes.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="px-4 py-8 text-center text-gray-500">
                      No recipes found
                    </td>
                  </tr>
                ) : (
                  recipes.map((recipe, index) => (
                    <tr key={recipe.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <div className="truncate max-w-[90px]" title={recipe.id}>
                          {recipe.id}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <div className="break-words max-w-[150px]">
                          {recipe.email}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <div className="break-words max-w-[120px]">
                          {recipe.title}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <div className="break-words max-w-[180px]">
                          {recipe.description}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          recipe.state === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {recipe.state}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {recipe.tag}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <div className="break-words max-w-[150px]">
                          {recipe.ingredient}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <div className="break-words max-w-[150px]">
                          {recipe.instruction}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {recipe.preparation}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {recipe.TotalTime}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;