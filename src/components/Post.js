import  {Comment}  from '../components/comments';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { usePosts } from '../hooks';
import { useToasts } from 'react-toast-notifications';
import { createComment, toggleLike } from '../api';

export const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        addToast('Comment created successfully!', {
          appearance: 'success',
        });
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
      }

      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async ()=>{
    const response = await toggleLike(post._id,'Post');

    if (response.success) {
      if(response.data.deleted){
        addToast('Like Removed successfully!', {
          appearance: 'success',
        });
      }
      else{
        addToast('Liked successfully!', {
          appearance: 'success',
        });
      }
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  }

    return (
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
                    state: {
                      user: post.user,
                    },
                  }}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <button onClick={handlePostLikeClick}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2107/2107854.png"
                    alt="likes-icon"
                  />
                </button>
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
              <input 
              placeholder="Start typing a comment"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              onKeyDown={handleAddComment} />
            </div>
            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} key={comment._id}/>
              ))}
            </div>
          </div>
        </div>
    );
}