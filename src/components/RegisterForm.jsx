import React, { useState } from 'react'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(ev){
   ev.preventDefault();
   const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username,password}),
      
   })
   if(response.status === 200){
    alert('Registration succesful')
   }
   else{
    alert('Registration unscessful');
   }
   

  }
  return (
    <div>
      <p>Register here by creating username and password!</p>
    <form className="register" onSubmit={handleSubmit}>
        <input type ='text' 
        placeholder='username'
        value={username}
        onChange={ev=>setUsername(ev.target.value)}/>
        <input type ='password' 
        placeholder='password'
        value={password}
        onChange={ev=>setPassword(ev.target.value)}/>
        <button>Register</button>

    </form>
</div>
  )
}

export default RegisterForm