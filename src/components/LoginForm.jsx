import {React} from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  

  async function handleSubmit(ev){
    
   
    ev.preventDefault();
    const result = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username,password}),
        credentials:'include',
        
     })
     if(result.ok){
      setRedirect(true);
    }
  }
  if(redirect){
    return <Navigate to={('/')} />
  }
  
  return (
        
        <form className="login" onSubmit={handleSubmit} >
           <p>Put your credentials to login!</p>
        <input type ='text' 
        placeholder='username'
        value={username}
        onChange={ev=>setUsername(ev.target.value)}/>
        <input type ='password' 
        placeholder='password'
        value={password}
        onChange={ev=>setPassword(ev.target.value)}/>
            <button>Login</button>

        </form>
    
  )
}

export default LoginForm