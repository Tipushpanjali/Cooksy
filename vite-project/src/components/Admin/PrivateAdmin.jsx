import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";
export default function PrivateAdmin({ children }) {
  const [user, loading] = useAuthState(auth);
  const ADMIN_EMAIL = "tipushpa7@gmail.com";

  console.log("PrivateAdmin Check:", { 
    user: user?.email, 
    loading, 
    isAdmin: user?.email === ADMIN_EMAIL 
  });

  if (loading) return <p>Loading...</p>;
  if (!user) {
    localStorage.removeItem("isAdmin");
    return <Navigate to="/login" replace />;
  }
  
  
  const isActualAdmin = user.email === ADMIN_EMAIL;
  
 
  localStorage.setItem("isAdmin", isActualAdmin.toString());
  if (!isActualAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}