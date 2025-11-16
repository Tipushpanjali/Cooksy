import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { addDoc, collection, serverTimestamp  } from 'firebase/firestore';
import { db } from '../components/firebase';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

const PostRec = () => {
  const navigate = useNavigate()
  const auth = getAuth();
  const user = auth.currentUser; 

  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    ingredient: '',
    instruction: '',
    preparation: '',
    TotalTime: '',
    tags: '',
    state:'',
  })

  const [imageFile, setImageFile] = useState(null)

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Step 1: Upload image to DRF and get URL
    let imageURL = '';

    if (imageFile) {
      const data = new FormData();
      data.append('image', imageFile); // ✅ only image

      const response = await axios.post('http://127.0.0.1:8000/apiimages/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      imageURL = response.data.image || '';
      console.log(imageURL)
    }

    // Step 2: Save recipe data to Firebase
    await addDoc(collection(db, "Recipes"), {
      imageURL, // ✅ full image URL
      title: formData.title,
      description: formData.description,
      ingredient: formData.ingredient,
      instruction: formData.instruction,
      preparation: formData.preparation,
      TotalTime: formData.TotalTime,
      tags: formData.tags,
      state: formData.state,
      userId: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    toast.success("Recipe successfully posted!", { position: 'bottom-center' });
    navigate('/recipes');
  } catch (error) {
    console.error('Failed to post Recipe: ', error);
    toast.error("Failed to post recipe. Please try again.", { position: 'bottom-center' });
  }
};


  return (
    <div className="m-20 bg-white p-10 rounded-2xl shadow-md min-h-screen flex flex-col justify-center max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Post your recipe</h1>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Recipe title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your recipe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
            required
          />
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Ingredients</label>
          <textarea
            name="ingredient"
            value={formData.ingredient}
            onChange={handleChange}
            rows="4"
            placeholder="List all ingredients"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
            required
          />
        </div>

        {/* Instruction */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Instruction</label>
          <textarea
            name="instruction"
            value={formData.instruction}
            onChange={handleChange}
            rows="4"
            placeholder="Step by step instructions"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
            required
          />
        </div>

        {/* Preparation */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Preparation</label>
          <textarea
            name="preparation"
            value={formData.preparation}
            onChange={handleChange}
            rows="4"
            placeholder="Preparation notes"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
            required
          />
        </div>

        {/* Total Time */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Total Time (minutes)</label>
          <input
            type="number"
            name="TotalTime"
            value={formData.TotalTime}
            onChange={handleChange}
            placeholder="Time to make this recipe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
            required
          />
        </div>

        {/* Image */}
        <InputGroup className="mb-3">
          <Form.Control
            type="file"
            id="image"
            onChange={handleImageChange}
            required
          />
        </InputGroup>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Tags</label>
          <select
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
            required
          >
            <option value="">Select a tag</option>
            <option value="Main-Course">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-2">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
            required
          >
            <option value="">Select your state</option>
            <option value="Bihar">Bihar</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Odisha">Odisha</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Manipur">Manipur</option>
            <option value="Kerala">Kerala</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Delhi">Delhi</option>
            <option value="Assam">Assam</option>
            <option value="Jammu Kashmir">Jammu Kashmir</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 text-white font-medium rounded-md border border-transparent hover:bg-white hover:text-orange-600 hover:border-pink-900 focus:outline-none focus:ring-2"
          >
            Post Recipe
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostRec