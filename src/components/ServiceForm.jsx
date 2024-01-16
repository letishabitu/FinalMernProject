import {React} from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';




function ServiceForm() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [servicetype, setServicetype] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [service, setService] = useState(false);
    

    async function handleSubmit(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/create', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({firstname,lastname,servicetype,cellphone}),
                   
         })
         if(response.status === 200){
          setService(true);
          alert('service created');
          
         }
       
    }

    if(service){
      return <Navigate to={('/services')} />
    }

  return (
    <div>
        
         <form className="Service" onSubmit={handleSubmit} >
           <p>Creat The service you want!</p>
           <input type ='text' 
        placeholder='firstname'
        value={firstname}
        onChange={ev=>setFirstname(ev.target.value)}/>
        <input type ='text' 
        placeholder='lastname'
        value={lastname}
        onChange={ev=>setLastname(ev.target.value)}/>
         <input type ='text' 
        placeholder='servicetype'
        value={servicetype}
        onChange={ev=>setServicetype(ev.target.value)}/>
         <input type ='text' 
        placeholder='cellphone'
        value={cellphone}
        onChange={ev=>setCellphone(ev.target.value)}/>
            <button>Submit</button>

        </form>
    </div>
  )
}

export default ServiceForm