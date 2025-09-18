import React, { useState } from 'react'
import "./log.css"
import { HiArrowLeft } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi";

import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Singup() {
   const navigate = useNavigate()
     const [componet ,setComponet] = useState(1)
     const[check,setCheck]=useState({})
     const[image,setimage]=useState()
     const[details,setDetails] = useState({
        name:"",
        email:"",
        password:"",
        role:"",
        userName:""
     })

     const handlinginput = (last)=>{
        setDetails((previous)=>({...previous,...last}))
     }
      const handlingimage = (e)=>{
        setimage(e.target.files[0])
      }



       const userNameVaildation = ()=>{
        const errorThrow = {};

           const usersymbole =/[!@#$%^&*(),.?":{}|<>]/
    const usernumber = (/\d/g)
        try {
            if(!details.userName.trim()){
        errorThrow.userName = "empty"
     }else if(details.userName.length <= 5){
  errorThrow.userName = "password must be 6 or more length"
     }else if(!usersymbole.test(details.userName)){
    errorThrow.userName = "use atleast one symbols"
     }else if(!usernumber.test(details.userName)){
        errorThrow.userName="must contains  number"
     }
      setCheck(errorThrow);
    return Object.keys(errorThrow).length === 0;
        } catch (error) {
            console.log(error)
        }
       }
    //    validation 
    const signupValidation = () => {
  try {
    
      const combination = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const roles = ['admin', 'staff', 'user'];
 
    const errorThrow = {};
    if (!details.name.trim()){
 errorThrow.name = 'empty';
    } 
    if (!details.email.trim()) {
      errorThrow.email = 'empty';
    } else if (!combination.test(details.email)) {
      errorThrow.email = 'invalid';
    }
    if (!details.password.trim()){
        errorThrow.password = 'empty';
    }else if(details.password.length <=5){
        errorThrow.password = "must contains more than 6 character's"
    }
    if (!details.role.trim()) {
      errorThrow.role = 'choose one';
    } else if (!roles.includes(details.role)) {
      errorThrow.role = 'choose one of them';
    }
     

    setCheck(errorThrow);
    return Object.keys(errorThrow).length === 0;
  } catch (error) {
     console.log(error)
  }
  };
 const fromData = new FormData()
fromData.append('pic',image)
fromData.append('name',details.name)
fromData.append('email',details.email)
fromData.append('password',details.password)
fromData.append('role',details.role)
fromData.append('userName',details.userName)

 if(details?.email && details.role){
   localStorage.setItem('mail',details.email)
   localStorage.setItem('role',details.role)

 }
 
   const handlSubmit =  async()=>{
   if(signupValidation()){
   setComponet(2)
   if(userNameVaildation()){
   try {
    await axios.post('http://localhost:4500/staff',fromData,
          {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    .then((respons)=>{
       console.log(respons.data)
       navigate('/otp')
    })
    .catch((error)=>{console.log(error)})

   } catch (error) {
     console.log(error)
   }
   }
   }else{
    console.log('none')
   }
   }
     

  return (
  <div className='singup-main'>

{
    componet === 1 && <div className='singup-one'>

     <div  className='singup-head'>
    <div className='singup-header'><p className='singup-text'>create Account</p>  <button onClick={()=>setComponet(2)}> <HiArrowRight style={{color:"white"}}/></button></div>
      </div>

            <input type="text"  placeholder= {check.name || "Name"} onChange={(e)=>handlinginput({name:e.target.value})} defaultValue={details.name} />
           
            <input type="email" placeholder={check.email || 'Exmaple@gmail.com'}  onChange={(e)=>handlinginput({email:e.target.value})} defaultValue={details.email}  />
            
            <input type="password" placeholder={check.password || "Password"} onChange={(e)=>handlinginput({password:e.target.value})} defaultValue={details.password}  />
    
               
  <select id="role" defaultValue={details.role} onChange={(e)=>handlinginput({role:e.target.value})}>
        <option value="" style={{display:'none'}}>select role</option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
        <option value="user">User</option>
      </select>
       <div>{check.role && <p>{check.role}</p>} </div>
           
               
            
      
       

        <button className='log-button' onClick={handlSubmit}  style={{backgroundColor:'#0468BF'}} > next</button>
         </div>
}
{
    componet === 2 && <div className='singup-two'>
       
      <div className='singup-header'> <button onClick={()=>setComponet(1)}> <HiArrowLeft style={{color:"white"}}/></button><p className='singup-text'>create Account</p> </div>
            <div className='singup-image'>
      <label> profile  pic
       <input  className='video-file' type="file"  accept='image/*' onChange={handlingimage}  />
       </label>
      </div>

      <div className='userName-input'>
        <input type='username' placeholder='userName@9344'
         onChange={(e)=>handlinginput({userName:e.target.value})} defaultValue={details.userName} />
         <div style={{color:"white"}}> {check.userName && <p>{check.userName}</p>} </div>
         </div>

        <div className='sinup-footer'>
     <button className='log-button' onClick={handlSubmit} >submit</button>
     </div>
     
         
    </div>


}

  </div>
  )
}

export default Singup