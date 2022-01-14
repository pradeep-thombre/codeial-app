import { useState } from 'react';
import styles from '../styles/login.module.css';
import { Navigate } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';

export const Login = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [login,setLogin]=useState(false);
  const {addToast} =useToasts();
  const auth=useAuth();
  // const Redirect=useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    setLogin(true);
    if(!email || !password){
      return addToast("Please enter email and password",{
        appearance:'error'
      });
    }
    const response=await auth.login(email,password);
    setLogin(false);
    if(response.success){
      return addToast("Successfully Logged In",{
        appearance:'success'
      });
    }
    else{
      return addToast(response.message,{
        appearance:'error'
      });
    }
  }

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input 
          type="email" 
          placeholder="Email"  
           value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
        />
      </div>

      <div className={styles.field}>
        <input 
          type="password" 
          placeholder="Password"  
           value={password} 
          onChange={(e)=>setPassword(e.target.value)} 
        />
      </div>

      <div className={styles.field} >
        <button disabled={login}> 
          {login?'Logging In...': 'Log In'}
        </button>
      </div>
    </form>
  );
};

// export default Login;
