import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthcontext } from '../../Context/AuthContext';
import toast from 'react-hot-toast'
import axios from 'axios'
import { USER_API_END_POINT } from '../../assets/Apis';

const Login = () => {
  const { setauthUser } = useAuthcontext();
  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      })
      // localstorage
      localStorage.setItem('Task-manager', JSON.stringify(res.data.user))

      // context
      setauthUser(res.data.user);

      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false)
    }

  }

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='w-4/5 p-4 rounded-lg shadow-xl md:w-1/2'>
        <h1 className='p-2 text-3xl text-center border-b-2'>Login</h1>
        <form onSubmit={handleSubmit} className='my-3'>
          {/* email */}
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input value={input.email} onChange={changeEventHandler} name='email' type="email" placeholder="xyz@example.com" className="w-full input input-bordered" />
          </label>
          {/* password */}
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input name='password' value={input.password} onChange={changeEventHandler} type="password" placeholder="Password" className="w-full input input-bordered" />
          </label>
          <button type='submit' className='w-full mt-5 btn btn-info'>{loading ? <span className='loading loading-infinity'></span> : 'Login'} </button>
        </form>
        <span className='p-2'>Didn't have a account <Link to={'/signup'} className='text-blue-500 '>Signup</Link></span>
      </div>
    </div>
  )
}

export default Login