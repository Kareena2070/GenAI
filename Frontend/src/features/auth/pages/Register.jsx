import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = ()=>{
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {loading, handleRegister}= useAuth()

     const handleSumbit = async(e)=>{
        e.preventDefault()
        await handleRegister({username, email, password})

        navigate('/')
    }

    if(loading){
        return(
            <main>
                <h1 className="text-center">Loading...</h1>
            </main>
        )
    }

    return(
         <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleSumbit} className="space-y-5">

            {/* name */}
            <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your username"
            //   onChange={(e)=>setUsername=(e.target.value)}
            onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            //   onChange={(e)=>setEmail=(e.target.value)}
            onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            //   onChange={(e)=>setPassword=(e.target.value)}
            onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-2">Already have an account? <Link className="text-red-500" to={"/login"}>Login</Link> </p>
      </div>
    </main>
    );
}

export default Register