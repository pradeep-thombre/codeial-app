import PropTypes from 'prop-types';

import  {Comment}  from '../components/comments';
import styles from '../styles/home.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {  Loader } from '../components/Loader';
import { getPosts } from '../api';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
        
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://files.codingninjas.com/profile1028937fafbe556a143e007e6e6e2ea6c3bca52.jpg"
                alt="user-pic"
              />
              <div>
              <Link
                  to={{
                    pathname: `/user/${post.user._id}`,
                    state: 
                    {
                      user: `${post.user}`,
                    },
                  }}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.conent}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2107/2107854.png"
                  alt="likes-icon"
                />
                <span>{post.likes.length}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://image.flaticon.com/icons/png/512/25/25360.png"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <Comment comments={post.comments}/>
          </div>
        </div>
      ))}
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

// export default Home;
