import React from 'react'
import {NavLink} from 'react-router-dom'
import Login from '../loginDetails/login'

function Homepage() {

  if(window.location.pathname === '/'){
    localStorage.clear()
  }
  return (
    <div className='home-main'>


 <div className='home-card'>
     <h1>-Vidora-</h1>
     <h4>watch  your thought's  and inspire  & move bolt</h4>
 </div>

 <div>
<NavLink to={'login'}><button className='home-btn-1'><span>Log in</span></button></NavLink>
<NavLink to={'singup'}><button className='home-btn-2'><span>Sing up</span></button></NavLink>
 </div>


    </div>
  )
}

export default Homepage