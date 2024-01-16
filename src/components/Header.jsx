
import { Navigate } from 'react-router-dom';
import { useEffect} from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom'


function Header() {
  const [username, setUsername] = useState('');
  useEffect(()=> {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response=>{
         response.json().then(userLogged=>{
          setUsername(userLogged.username)
         })      
     
    })
  }, []);

  function Logout(){
    fetch('http://localhost:4000/logout', {
      credentials:'include',
      method:'POST',
    })
    setUsername(null);
    

  }
  
  return (
      <header>
          <Link to='/' className="logo">MyLogo</Link>
          <nav>
            {username && (
              <>
              <Link to='/create'>Create</Link>
              <Link to='/services'>Index</Link>
              <a onClick={Logout}>Logout</a>
            <span>Welcome: {username}</span>
              </>
            ) }
             
              {!username && (
                <>
                <Link to="/login" className="login">Login</Link>
                <Link to="/register" className="register">Register</Link>
                </>
              )}                     
          </nav>
          
        </header>
  )
}

export default Header