import {React} from 'react'
import { useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

function Delete() {
    const {id} = useParams();
    const [redirect, setRedirect] = useState(false);

    async function Submit(ev){     
        ev.preventDefault();
        const result = await fetch(`http://localhost:4000/services/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          
                      
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
        <h4>Delete the service type:</h4>
                <form onSubmit={Submit}>
                                    
                    <button>Delete</button>
                </form>
    </div>
  )
}

export default Delete