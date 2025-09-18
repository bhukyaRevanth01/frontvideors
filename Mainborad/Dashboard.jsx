
import './dashboard.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import {Outlet} from 'react-router-dom'
function Dashboard() {


   const[serach,setSearch]= useState({
    input:''
   })

    const handlingInput = (last)=>{
      setSearch((previous)=>({...previous,...last}))
    }


     console.log(serach)
     const handlesubmit = (e)=>{
      e.preventDefault()
      console.log(serach.input)
     }
  return (
    <div className='main'>
         <div className='card-1'>

        <div className='nav-head-1' >
      

          <div>
            <h3>VidOra</h3>
          </div>

       <div className='nav-child-2'> 

         <form onSubmit={handlesubmit}>

          <input type='search' placeholder='search' onChange={(e)=>handlingInput({input:e.target?.value})} value={serach.input}>
          </input > 

         </form>

          </div>

  
            <NavLink to={'profile'} ><button className='pro-button'><CgProfile className='pro-icon'/>  </button></NavLink>
    

          </div>
          
          </div>

          <div className='card-2'>
             <div className='menu-card-1'>
              <div className='button-1'>
                <NavLink to={'/home'}><button>Home</button></NavLink>
                <NavLink to={'uploads'}><button>Upload</button></NavLink>
                <button>Add on</button>
                <button>Add on</button>
              </div>
           <center><div className='underline'>_________________</div></center>
              <div className='button-1'>
                <button>Add on</button>
                <button>Add on</button>
                <button>Add on</button>
                <button>Add on</button>
              </div>
              <center><div className='underline'>_________________</div></center>
                <div className='button-1'>
                <button>Add on</button>
                <button>Add on</button>
                <button>Add on</button>
                <button>Add on</button>
                  <center><div className='underline'>_________________</div></center>
              </div>  <div className='button-1'>
                <button>Add on</button>
                <button>Add on</button>
                <button>Add on</button>
                <button>Add on</button>
              </div>
             </div>

          
           <div className='menu-card-2'> <Outlet /></div>
           </div>

    </div>
  )
}

export default Dashboard