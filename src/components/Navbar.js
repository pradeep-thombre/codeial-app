import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchUsers } from '../api';

export const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth=useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);

      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>
      
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn2.iconfinder.com/data/icons/minimal-set-five/32/minimal-48-512.png"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
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