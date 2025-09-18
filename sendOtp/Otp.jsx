import React from 'react'
import { useState,useRef } from 'react'
import './otp.css'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Otp() {
 const navigate = useNavigate()
   const otpRef = useRef([])
    const [storeOtp,setStoreOtp]=useState(Array(6).fill(''))


  const spaceOtp = [1,2,3,4,5,6]

 
    const handlingChange = (value,index)=>{
  if(! /^[0-9]?$/.test(value)) return;

    if(value){
       
 const newOtp = [...storeOtp]
 newOtp[index] = value
 setStoreOtp(newOtp)
       const otpchange = otpRef.current[index+1]
       if(otpchange){
        otpchange.focus()
       } 
    }

    }

  
     const handlingPlaceChanger = (e,index)=>{
       if(e.key === 'Backspace' && index>0){
         const newOtp = [...storeOtp]
 newOtp[index]=''
 setStoreOtp(newOtp)
       
        setTimeout(()=>{
          const otpChange = otpRef.current[index-1]
        if(otpChange){
          otpChange.focus()
        }
        },400)
       }else if(e.key === 'ArrowRight'){
        const otpPlaceChanger = otpRef.current[index+1]
        if(otpPlaceChanger){
          otpPlaceChanger.focus()
        }
       }else if(e.key === "ArrowLeft"){
        const otpPlaceChanger = otpRef.current[index-1]
        if(otpPlaceChanger){
          otpPlaceChanger.focus()
        }
       }
     }


    

     const handlingSubmit = async()=>{
     try {
        const mail = localStorage.getItem('mail')
        const role = localStorage.getItem('role')
        
    if(storeOtp.join('').length === 6){
const finalOtpSend = {
  otp:storeOtp.join(''),
  email:mail,
  role:role
}

         await axios.post('http://localhost:4500/otpSender',finalOtpSend)
         .then((res)=>{
          localStorage.setItem('Token',JSON.stringify(res?.data?.token),
          navigate('/home')

        )})
         .catch((error)=>console.log(error))
    }
     } catch (error) {
      console.log(error)
     }
      }

  return (

 <div className='otp-main'>
   <div className='otp-card'>
    <div className='otp-title'>
      <div>-email-</div>
      <div>-verification-</div>
    </div>
<div className='otp-input'>
    {
    spaceOtp.map((ele,index)=>{
      return(
        <input type="text"
           ref={(el)=>(otpRef.current[index]=el)}
          key={ele}
          id={ele}
         autoComplete='off'
          maxLength={1}
          onKeyDown={(e)=>handlingPlaceChanger(e,index)}
         onChange={(e)=>handlingChange(e.target.value,index)} />
      )
    })
  }
</div>

   <div className='otp-submit-btn' onClick={handlingSubmit}><button>submit</button></div>
    <div className='otp-resend-btn'><button>resend Otp ?</button></div>
   </div>
 </div>
  )
}

export default Otp