import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { CreatePost } from '../components/CreatePost'
import { Loader } from '../components/Loader';
import { FriendsList } from '../components/FriendsList';
import { useAuth, usePosts } from '../hooks';
import { Post } from '../components/Post';

export const Home = () => {
  const auth=useAuth();
  const posts=usePosts();

  if (posts.loading) {
    return <Loader />;
  }
  
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
      <CreatePost/>
      {posts.data.map((post) => (
        <Post post={post} key={`post-${post._id}`}/>  
      ))}
    </div>
    {auth.user && <FriendsList />}
  </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

// export default Home;
