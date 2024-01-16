import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

function Show() {
    const {id} = useParams();
    const [show, setShow] = useState(null);
         
   

      useEffect(()=> {
        fetch(`http://localhost:4000/services/${id}`).then(response=>{
             response.json().then(list=>{
              setShow(list)
             })      
         
        })
      }, []);
    if(!show){
        return '';
    }
      
  return (
    <div>
        <h3>your service is: </h3> <br/>
        <li>{show.servicetype}</li>
    </div>
  )
}

export default Show