import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Patient') // default role
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:8080/api/auth/register", { name, email, password, role })
      navigate("/login")
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-black text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>Create Account</p>
        <p>Please sign up to book appointment</p>

        {/* Full Name */}
        <div className='w-full'>
          <p>Full Name</p>
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type="text" 
            required 
          />
        </div>

        {/* Email */}
        <div className='w-full'>
          <p>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type="email" 
            required 
          />
        </div>

        {/* Password */}
        <div className='w-full'>
          <p>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type="password" 
            required 
          />
        </div>

        {/* Submit */}
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
          Create Account
        </button>

        {/* Toggle text */}
        <p>
          Already have an account?{" "}
          <span 
            onClick={() => navigate('/login')} 
            className='text-primary underline cursor-pointer'
          >
            Login here
          </span>
        </p>
      </div>
    </form>
  )
}

export default UserRegister
