import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthcontext } from "./Context/AuthContext";
import FavouriteBlogs from "./Pages/FavouriteBlogs";
import MyBlogs from "./Pages/MyBlogs";
import DisplayBlog from "./Pages/DisplayBlog";
import AllBlogs from "./Pages/AllBlogs";

function App() {
  const { authUser } = useAuthcontext();
  return (
    <div className="h-screen p-4 ">
      <Router>
        <Routes>
          <Route exact path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />}>
            <Route index element={<AllBlogs />} />
            <Route path='/favourite' element={<FavouriteBlogs />} />
            <Route path='/myblogs' element={<MyBlogs />} />
            <Route path='/displayBlog/:id' element={<DisplayBlog/>}/>
          </Route>
          <Route path="/login" element={authUser ? <Navigate to={'/'} /> : <Login />}></Route>
          <Route path="/signup" element={authUser ? <Navigate to={'/'} /> : <Signup />}></Route>
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
