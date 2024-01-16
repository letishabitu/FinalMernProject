import React from 'react'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';

function Index() {
    const [services, setServices] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(()=> {
        fetch('http://localhost:4000/services', {
          
        }).then(response=>{
             response.json().then(list=>{
              setServices(list)
             })      
         
        })
      }, []);
      
//function for delete
async function Submit(ev){     
    ev.preventDefault();
    const result = await fetch(`http://localhost:4000/services/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id),
        
        
     })
     if(result.ok){
      setRedirect(true);
    }
  }
  if(redirect){
    alert('service deleted');
  }

// console.log(services);
  return (
    <div>
        <h3>Service Index Page</h3>
        {
            services.length > 0 && services.map((service, i) => {
                return (
                    <li>
                                The service for {' '}
                                <a href={`/services/${service._id}`}>
                                    {service.firstname}<br/>
                                </a> <Link to={`/services/edit/${service._id}`}> Edit This Service </Link>
                            <form action={`/services/delete/${service._id}`}>
                            <button>Delete</button>
                            </form>

                            </li>
                )
            })

        }


    </div>
  )
}

export default Index