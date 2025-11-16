import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../components/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom'; // ✅ Import Link

function UserProfile() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setError(null);

        try {
          const recipeRef = collection(db, 'Recipes');
          const q = query(recipeRef, where('userId', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);

          const userRecipes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setRecipes(userRecipes);
        } catch (err) {
          setError(`Failed to load recipes: ${err.message}`);
        }
      } else {
        setUser(null);
        setRecipes([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-40">Loading...</div>;

  if (!user)
    return (
      <div className="text-center mt-40 text-red-500 font-semibold">
        Please log in to view your profile.
      </div>
    );

  return (
    <div className="mt-30 min-h-screen flex flex-col items-center p-6">
      {/* User Info */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-orange-600">
          User Profile
        </h2>

        <div className="space-y-3 text-center">
          <div>
            <p className="text-gray-600 font-medium">Name:</p>
            <p className="text-lg">
              {user.displayName ? user.displayName : 'No name set'}
            </p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Email:</p>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">User ID:</p>
            <p className="text-sm text-gray-500 break-all">{user.uid}</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-3xl">
          {error}
        </div>
      )}

      {/* Recipes Section */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">
          My Recipes ({recipes.length})
        </h3>

        {recipes.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven't uploaded any recipes yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipecard/${recipe.id}`} 
                className="border rounded-lg p-4 shadow hover:shadow-md transition block hover:bg-orange-50"
              >
                <h4 className="font-semibold text-lg mb-2 text-gray-800">
                  {recipe.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {recipe.description}
                </p>
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="mt-3 rounded-lg w-full h-32 object-cover"
                  />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
