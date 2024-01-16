import { useState, useEffect } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import AuthPage from './components/Header'
import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ServiceForm from './components/ServiceForm'
import Index from './components/Index'
import Show from './components/Show'
import Edit from './components/Edit'
import Delete from './components/Delete'




function App() {
  
 

  return (
    <div>
     <Routes>
       <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path={'/register'} element={<RegisterForm/>}/>
          <Route path={'/login'} element={<LoginForm/>}/> 
          <Route path={'/create'} element={<ServiceForm/>}/>          
          <Route path={'/services'} element={<Index/>}/>  
          <Route path={'/services/:id'} element={<Show/>}/>
          <Route path={'/services/edit/:id/'} element={<Edit/>}/>
          <Route path={'/services/delete/:id/'} element={<Delete/>}/>

       </Route>
     </Routes>
    
      
    </div>
  )
}

export default App
