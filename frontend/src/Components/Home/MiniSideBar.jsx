import React from 'react'
import { Data } from '../../Assets/SidebarData'
import { Link } from 'react-router-dom'
import { LogOut, Menu } from 'lucide-react'
import { useAuthcontext } from '../../Context/AuthContext'
import { USER_API_END_POINT } from '../../assets/Apis'
import axios from 'axios'

const MiniSideBar = () => {
    const { authUser, setauthUser } = useAuthcontext();
    const Logout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            // localstorage
            localStorage.removeItem("chat-user")

            // context
            setauthUser(null);

            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return authUser && (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="flex flex-col items-center justify-center drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="my-2 btn btn-outline drawer-button lg:hidden">
                    <Menu />
                </label>
            </div>
            <div className="z-20 drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="min-h-full p-4 menu bg-base-200 text-base-content w-80">
                
                    {/* Sidebar content here */}
                    <div className='h-[90vh] p-3 flex flex-col justify-between'>
                        <div className='font-bold'>
                            <h2 className='text-xl font-extrabold'>The Blog <span className='text-red-500'>Master</span></h2>
                            <h2 className='my-1 text-sm'>{authUser.username}</h2>
                            <h2 className='my-1 text-sm'>{authUser.email}</h2>
                            <hr />
                        </div>
                        <div>
                            {Data.map((item, idx) => (
                                <Link to={item.link} className='flex items-center gap-4 p-2 m-2 transition-all duration-300 rounded-md hover:bg-gray-200' key={idx}> <item.icon /> {item.title}</Link>
                            ))}
                        </div>
                        <div><button onClick={Logout} className='w-full gap-3 btn btn-outline'>Logout <LogOut /></button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniSideBar