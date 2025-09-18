import { useState } from 'react'
import './log.css'
import axios from 'axios'
import { detailsUsers } from '../CenteralStore/personalDetails'
import { useNavigate } from 'react-router-dom'
function Login() {
 const navigate = useNavigate()
   const {userDetails,setUserDetails} =detailsUsers()

  const[validation,setvalidation] = useState()
   const [details,setDetails] = useState({
    email:"",
    password:"",
    role:""
   })

    localStorage.setItem("mail",details.email)
    localStorage.setItem('role',details.role)


   const handlinginput = (last)=>{
 setDetails((previous)=>({...previous,...last}))
   }

   const signupValidation = () => {
  try {
    
      const combination = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const roles = ['admin', 'staff', 'user'];
 
    const errorThrow = {};
    
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
     

    setvalidation(errorThrow);
    return Object.keys(errorThrow).length === 0;
  } catch (error) {
     console.log(error)
  }
  };

  

    const submithanling = async()=>{
if(signupValidation()){
  setUserDetails(details)
try {
  await  axios.post('http://localhost:4500/loginStaff',details)
  .then((responses)=>{
    console.log(responses)
    navigate('/otp')
    
  })
  .catch((error)=>console.log(error.response?.data))
  
} catch (error) {
 console.log(error) 
}
}
    }


 
  return (
   <div className='login-main'>
   
   
       <div className='login-card'>
   
  
          <div>
       <div className='login-head' ><p >welcome back !</p></div>
         </div>
          
              <div> <input type="email" placeholder={validation?.email || 'Exmaple@gmail.com'}  onChange={(e)=>handlinginput({email:e.target.value})} defaultValue={details.email }  /></div>
              <div>{validation?.email && <p>{validation?.email}</p>}</div>
              <div><input type="password" placeholder={"Password"} onChange={(e)=>handlinginput({password:e.target.value})} defaultValue={details.password }  /></div> 
               <div>{validation?.password && <p>{validation?.password}</p>}</div>
       
   <div>               
     <select id="role" defaultValue={details?.role || " "} onChange={(e)=>handlinginput({role:e.target?.value})}>
           <option value="" style={{display:'none'}}>select role</option>
           <option value="admin">Admin</option>
           <option value="staff">Staff</option>
           <option value="user">User</option>
         </select></div>
          <div>{validation?.role && <p>{validation?.role}</p>}</div>
         
   
           <button type='submit' className='log-button' onClick={submithanling}  style={{backgroundColor:'#0468BF'}} >Submit</button>
      
            </div>
   
   
   
     </div>
  )
}

export default Login