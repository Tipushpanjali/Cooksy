import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../components/firebase'
import { toast } from 'react-toastify'

const UserPost = () => {
  const navigate = useNavigate()

  const handleCreateUser = async (name, email, password) => {
    await addDoc(collection(db, "users"), {
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    })
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleCreateUser(formData.name, formData.email, formData.password)
      toast.success("User successfully added!", { position: 'bottom-center' })
      setFormData({ name: '', email: '', password: '' })
      navigate("/admin")
    } catch (error) {
      console.error('Failed to add user: ', error)
      toast.error("Failed to add user!", { position: 'bottom-center' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Add New User</h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter user name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
              required
              minLength="6"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-orange-600 text-white font-medium rounded-md border border-transparent hover:bg-white hover:text-orange-600 hover:border-orange-600 focus:outline-none focus:ring-2"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserPost
