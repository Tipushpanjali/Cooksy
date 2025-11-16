import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/Admin/AdminNav';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase';
import { doc } from 'firebase/firestore';
function AdminPanel() {

  const [users, setUsers]= useState([]);
  const fetchUser= async()=>{
    const response = await getDocs(collection(db,"users"));
    console.log(response)
    const userList = response.docs.map(doc => ({id:doc.id, ...doc.data()}));
    setUsers(userList);
    console.log(userList);
  }
  useEffect(()=>{
    fetchUser();
  },[])
  const handleDelete= async(id)=>{
    try {
      await deleteDoc(doc(db,"users", id));
      fetchUser()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="min-h-screen">
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-20 bg-white shadow-md">
          <AdminNav />
        </div>

        {/* Main Content */}

        <div className="sticky top-20 max-w-5xl mx-auto px-6 py-10 flex flex-col items-center">
           <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
            Admin Panel
          </h2>
          <div className='flex gap-6'>
            <Link to="/UserDetails">
                            <button className="px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-white hover:to-white hover:text-orange-600 text-white outline hover:border-orange-600 font-medium rounded-lg ">
                             User Details
                            </button>
                          </Link>
                          <Link to="/RecipeDetails">
                            <button className="px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-white hover:to-white hover:text-orange-600 text-white  outline hover:border-orange-600 font-medium rounded-lg ">
                             Recipe Details
                            </button>
                          </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
