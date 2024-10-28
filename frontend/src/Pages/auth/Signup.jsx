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
    <div className='flex items-center justify-center h-full'>
      <div className='w-4/5 p-4 rounded-lg shadow-xl md:w-1/2'>
        <h1 className='p-2 text-3xl text-center border-b-2'>SignUp</h1>
        <form className='my-3' onSubmit={handleSubmit}>
          {/* Username */}
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input value={input.username} name='username' onChange={changeEventHandler} type="text" placeholder="Username" className="w-full input input-bordered" />
          </label>
          {/* email */}
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input value={input.email} name='email' onChange={changeEventHandler} type="email" placeholder="xyz@example.com" className="w-full input input-bordered" />
          </label>
          {/* password */}
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input value={input.password} name='password' onChange={changeEventHandler} type="password" placeholder="Password" className="w-full input input-bordered" />
          </label>
          <button className='w-full mt-5 btn btn-success'>{loading ? <span className='loading loading-infinity'></span> : 'Signup'}</button>
        </form>
        <span className='p-2'>Already have a account <Link to={'/login'} className='text-blue-500 '>Login</Link></span>
      </div>
    </div>
  )
}

export default Signup