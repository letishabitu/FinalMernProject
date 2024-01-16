import {React} from 'react'
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

function Edit() {

const [servicetype, setServicetype] = useState('');
const {id} = useParams();
const [redirect, setRedirect] = useState(false);

useEffect(()=> {
    fetch(`http://localhost:4000/services/${id}`).then(response=>{
         response.json().then(list=>{
          setServicetype(list.servicetype)
         })      
     
    })
  }, []);



async function Submit(ev){     
    ev.preventDefault();
    const result = await fetch(`http://localhost:4000/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({servicetype}),
        
        
     })
     if(result.ok){
      setRedirect(true);
    }
  }
  if(redirect){
    return <Navigate to={('/services')} />
  }

  return (
    <div>
        <h4> Edit the service type:</h4>
                <form onSubmit={Submit}>
                   <input type ='text' 
                          placeholder='servicetype'
                          value={servicetype}
                          onChange={ev=>setServicetype(ev.target.value)}/>
                   
                    <button>Submit</button>
                </form>

        </div>
  )
}

export default Edit