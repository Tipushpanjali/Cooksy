import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState, useRef } from "react";
import { auth, db} from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
function AdminNav() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async ()=> {
      onAuthStateChanged(auth, async (user) => {
        console.log(user);
  
        if (user) {
          try {
            const docRef= doc(db, "Users", user.uid);
            console.log("DocRef:", docRef);
            
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setUserDetails({
                email: user.email || '',
                name: userData.name || '',
                uid: user.uid,
                ...userData
              });
            } else {
              setUserDetails({
                email: user.email || '',
                uid: user.uid
              });
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            setUserDetails({
              email: user.email || '',
              uid: user.uid
            });
          }
        } else {
          setUserDetails(null);
        }
      });
    };
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log("User signed out successfully");
        setShowProfileMenu(false);
        setShowMobileMenu(false);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };
  
    useEffect(() => {
      fetchUserData();
    }, []);
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowProfileMenu(false);
        }
        if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
          setShowMobileMenu(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0">
        <div className="container mx-auto px-4 py-3 cssbg flex items-center justify-between">
          <div className="flex items-center">
            
              <img src='src/assets/logo.png' className='h-9 w-35' alt="Logo" />
            
          </div>

          
        
            {userDetails ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="rounded-full border border-white/20 p-2 hover:bg-white/10 transition-colors"
                >
                  <svg 
                    className="h-5 w-5 text-orange-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-600 truncate">
                        {userDetails.email}
                      </p>
                    </div>
                     <Link
                      to="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <button className="px-4 py-2 font-medium text-gray-700 hover:bg-white/10 hover:text-orange-600 transition-colors rounded">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-white hover:to-white hover:text-orange-600 text-white font-medium rounded-lg ">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
      </nav>
    </>
  )
}

export default AdminNav