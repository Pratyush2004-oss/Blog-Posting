import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../assets/Apis';
import toast from 'react-hot-toast';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    username: '',
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
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='p-4 md:w-1/2 rounded-lg bg-gray-800 shadow-xl'>
        <h1 className='text-3xl border-b-2 p-2 text-center'>SignUp</h1>
        <form className='my-3' onSubmit={handleSubmit}>
          {/* Username */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input value={input.username} name='username' onChange={changeEventHandler} type="text" placeholder="Username" className="input input-bordered w-full" />
          </label>
          {/* email */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input value={input.email} name='email' onChange={changeEventHandler} type="email" placeholder="xyz@example.com" className="input input-bordered w-full" />
          </label>
          {/* password */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input value={input.password} name='password' onChange={changeEventHandler} type="password" placeholder="Password" className="input input-bordered w-full" />
          </label>
          <button className='btn w-full mt-5 btn-success'>{loading ? <span className='loading loading-infinity'></span> : 'Signup'}</button>
        </form>
        <span className='p-2'>Already have a account <Link to={'/login'} className='text-blue-500 '>Login</Link></span>
      </div>
    </div>
  )
}

export default Signup