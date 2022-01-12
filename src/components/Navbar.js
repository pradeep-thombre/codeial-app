import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';

export const Navbar = () => {
  const auth=useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>}
      
      <div className={styles.rightNav}>
      {auth.user && <div className={styles.user}>
          <a href="/">
            <img
              src="https://files.codingninjas.com/profile1028937fafbe556a143e007e6e6e2ea6c3bca52.jpg"
              alt=""
              className={styles.userDp}
            />
          </a>
          <span>{auth.user.name}</span>
        </div>}

        <div className={styles.navLinks}>
          <ul>
            {auth.user?(
            <>
              <li>
                <button onClick={auth.logout}>Log out</button>
              </li>
            </>
            ):(
            <>
              <li>
                <a href='/login'>Log in</a>
              </li>
              
              <li>
                <a href="/register">Register</a>
              </li>
            </>
            )}
            
          </ul>
        </div>
      </div>
    </div>
  );
};


// export default Navbar;