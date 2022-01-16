import styles from '../styles/home.module.css';

export const Comment=({comment})=>{
    return (
        <div className={styles.postCommentsItem} key={comment._id}>
          <div className={styles.postCommentHeader}>
            <span className={styles.postCommentAuthor}>{comment.user.name}</span>
            <span className={styles.postCommentTime}>a minute ago</span>
            <span className={styles.postCommentLikes}>22</span>
          </div>
          <div className={styles.postCommentContent}>{comment.content}</div>
        </div>
      );
}
// export default Comment;