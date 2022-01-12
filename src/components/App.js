import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { getPosts } from '../api';
import  {Home}  from '../pages/Home';
import  {Loader} from '../components/Loader';
import {Navbar}  from './Navbar';
import {Login} from '../pages/Login';
import {Signup} from '../pages/Signup';
import { useAuth } from '../hooks';

function App() {
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true);
  const auth=useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if(response.success){
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if(auth.loading){
    return (<Loader/>);
  }
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/" element={<Home posts={posts} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
