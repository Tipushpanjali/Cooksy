import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter , createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Navbar from './components/Navbar.jsx'

import Home from './pages/Home.jsx'
import Layout from './components/layout.jsx'
import RecipesPage from './pages/RecipesPage.jsx'
import PostRec from './pages/PostRec.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardSwap from './components/designs/CardSwap.jsx'

import India from './pages/StateNames/India.jsx'
import Gujrat from './pages/StateNames/Gujrat.jsx'
import Rajasthan from './pages/StateNames/Rajasthan.jsx'
import Bihar from './pages/StateNames/Bihar.jsx'
import South from './pages/StateNames/South.jsx'
import RecipeCard from './components/RecipeCard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Punjab from './pages/StateNames/Punjab.jsx'
import Haryana from './pages/StateNames/Haryana.jsx'
import Odissa from './pages/StateNames/Odissa.jsx'
import Mizoram from './pages/StateNames/Mizoram.jsx'
import Manipur from './pages/StateNames/Manipur.jsx'
import Kerela from './pages/StateNames/Kerela.jsx'
import UttarPradesh from './pages/StateNames/UttarPradesh.jsx'
import Delhi from './pages/StateNames/Delhi.jsx'
import Assam from './pages/StateNames/Assam.jsx'
import JammuKashmir from './pages/StateNames/JammuKashmir.jsx'
import MadhyaPradesh from './pages/StateNames/MadhyaPradesh.jsx'

import AdminPanel from './pages/Admin/AdminPanel.jsx'
import PrivateAdmin from './components/Admin/PrivateAdmin.jsx'
import UserProfile from './pages/UserProfile.jsx'
import UserPost from './pages/Admin/UserPost.jsx'
import UserDetails from './pages/Admin/Userdetails.jsx'
import RecipeDetails from './pages/Admin/RecipeDetails.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
     <Route path='/Admin' element={<PrivateAdmin><AdminPanel/></PrivateAdmin>}/>
     <Route path='/postuser' element={<PrivateAdmin><UserPost/></PrivateAdmin>}/>
     <Route path="/UserDetails" element={<PrivateAdmin><UserDetails/></PrivateAdmin>}/>
     <Route path="/RecipeDetails" element={<PrivateAdmin><RecipeDetails/></PrivateAdmin>}/>
    <Route path='/' element={<Layout/>}>
      <Route path='/profile' element={<UserProfile/>}/>
      <Route index path='' element={<Home/>}/>
      <Route path='recipes' element={<PrivateRoute> <RecipesPage/></PrivateRoute>}>
        <Route index element={<Navigate to='all' replace />} />  
        <Route path='all' element={<India/>}/>
        <Route path='gujrat' element={<Gujrat/>}/>
        <Route path='rajasthan' element={<Rajasthan/>}/>
        <Route path='bihar' element={<Bihar/>}/>
        <Route path='south' element={<South/>}/>
        <Route path='Punjab' element={<Punjab/>}/>
        <Route path='Haryana' element={<Haryana/>}/>
        <Route path='MadhyaPradesh' element={<MadhyaPradesh/>}/>
        <Route path='Odissa' element={<Odissa/>}/>
        <Route path='Mizoram' element={<Mizoram/>}/>
        <Route path='Manipur' element={<Manipur/>}/>
        <Route path='Kerela' element={<Kerela/>}/>
        <Route path='UttarPradesh' element={<UttarPradesh/>}/>
        <Route path='Delhi' element={<Delhi/>}/>
        <Route path='Assam' element={<Assam/>}/>
        <Route path='JammuKashmir' element={<JammuKashmir/>}/>
      </Route>
      <Route path='add-recipe' element={<PrivateRoute><PostRec/></PrivateRoute>}/>
      <Route path='signup' element={<SignupPage/>}/>
      <Route path='login' element={<LoginPage/>}/>
      <Route path= 'recipecard/:id' element={<PrivateRoute><RecipeCard/></PrivateRoute>}/>
     
    </Route>
    
    </>
    

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer 
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>,
)