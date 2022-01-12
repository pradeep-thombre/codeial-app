import PropTypes from 'prop-types';

import  {Comment}  from '../components/comments';
import styles from '../styles/home.module.css';


export const Home = ({ posts }) => {
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          {console.log(post)}
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://files.codingninjas.com/profile1028937fafbe556a143e007e6e6e2ea6c3bca52.jpg"
                alt="user-pic"
              />
              <div>
                <span className={styles.postAuthor}>{post.user.name}</span>
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
