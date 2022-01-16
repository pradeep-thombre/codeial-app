import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { getPosts } from '../api';
import  {Home}  from '../pages/Home';
import  {Loader} from '../components/Loader';
import {Navbar}  from './Navbar';
import {Login} from '../pages/Login';
import {Signup} from '../pages/Signup';
import { useAuth } from '../hooks';
import {Settings} from '../pages/Settings';

import {  UserProfile } from '../pages/UserProfile';

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        return auth.user?children:Navigate("/login");
      }}
    />
  );
}

const Page404 = () => {
  return <h1>404</h1>;
};

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
      
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/" element={<Home posts={posts} />} />
          <Route exact path="/settings" element={<Settings/>}></Route>
          <Route exact path="/user/:userId" element={<UserProfile/>}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
