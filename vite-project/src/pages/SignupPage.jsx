import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth,db } from '../components/firebase'

import { setDoc, doc } from 'firebase/firestore'
import { toast }  from "react-toastify";

//import Logo from '../components/Logo'


const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  function googlelogin(){
  const provider= new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(async(result)=>{
    console.log(result);
    if(result.user){
      toast.success("user logged in successfully!",{
        position:'top-center',
      })
    }
    window.location.href="/"
  })
}
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleRegister = async (e)=>{
    e.preventDefault();
    try{
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = auth.currentUser;
        console.log(user);
        if (user){
            await setDoc(doc(db, "users", user.uid),{
                email:user.email,
                
            });
        }
        
        toast.success("user successfully logged-in!!",{position:'bottom-center'});
        window.location.href="/login";
    }
    catch(e){
        
        toast.error(e.message,{position:'bottom-center'});
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 cssbg">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
       {/*<Logo className="mx-auto h-12 w-auto" />*/ } 
        <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-600">
          Create your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            to="/login"
            className="font-medium text-gray-600 hover:text-orange-600"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e)=>{e.preventDefault();
            handleSubmit(e);
            handleRegister(e);
          }}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-orange-600"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-orange-600 focus:outline-none focus:ring-pink-500 focus:border-orange-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-orange-600"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-orange-600 focus:outline-none focus:ring-orange-600 focus:border-orange-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
             
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-orange-600 bg-orange-600 hover:bg-white hover:border-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-orange-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
              onClick={googlelogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-orange-600  rounded-md shadow-sm bg-orange-600 text-sm font-medium text-white hover:text-orange-600 hover:bg-white"
              >
                Google
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
