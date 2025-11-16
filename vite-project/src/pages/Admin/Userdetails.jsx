import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/Admin/AdminNav';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase';
import { doc } from 'firebase/firestore';
import { Trash2 } from 'lucide-react';
function UserDetails() {

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
          <div className="absolute left-6">
              <Link
                to="/postuser"
                className="bg-orange-600 hover:bg-white text-white hover:text-orange-600 outline hover:border-orange-600 font-medium px-4 py-2 rounded-lg shadow transition"
              >
                + Add User
              </Link>
            </div>

          {/* Table Wrapper */}
          <div className="w-full overflow-x-auto shadow-lg rounded-lg bg-white p-4">
            <Table
              striped
              bordered
              hover
              responsive
              className="text-center align-middle flex flex-col gap-5"
              style={{
                borderCollapse: 'separate',
                borderSpacing: '0 12px', // ⬅️ adds vertical & horizontal gap between rows
              }}
            >
              <thead className="bg-gray-100">
                <tr className=' flex flex-row justify-between '>
                  <th>serial no.</th>
                  <th>UID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='flex flex-col gap-3'>
                {users.length===0?(
                  <p>no user found</p>
                ):(
                  users.map((user,index)=>(
                  <tr key={user.id} className=' flex flex-row justify-between'>
                    <td>{index+1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={()=> handleDelete(user.id)} className='bg-red-600 hover:bg-white rounded-lg p-2 text-white hover:text-red-600 outline hover:border-red-600'>
                      <Trash2 size={16} />
                      delete User
                    </button>
                  </td>
                </tr>
                  ))
                )}
                
                
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
