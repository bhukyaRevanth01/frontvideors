import React, {useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import './datainfo.css'
import axios from 'axios'


// icons
import { IoLogoGoogle } from "react-icons/io";
import { GrLinkedin } from "react-icons/gr";
import { SiInstagram } from "react-icons/si";
  
// main icons 
import { IoPersonOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdLockReset } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";





function Staffprofile() {
const navigate = useNavigate()


const[Password,setpassword]=useState(false)
const[imageSaver,setimageSaver]=useState({
  Buffer:''

}) 
const[details,useDetails]=useState([])
const[showPoup,setShowPoup]=useState(false)
const[showimagepoup,setshowimagepoup] = useState(false)
const[imageUrl,setimageUrl]=useState()
const[inputdetails,setInputDetails]=useState([{
  name:""
}])
const[inputvalidation,setInputvalidation]=useState([{
  name:""
}])



 const handleInputUpdate = (last)=>{
  setInputDetails((previous)=>({...previous,...last}))
 }


 const validation = ()=>{
  const throwError = {}
  const noNumber = /^[^0-9]*$/
   if(inputdetails.name === undefined ){
     throwError.name = " Make changes"
   }else if(inputdetails.name.trim()===""){
    throwError.name="cannot be empty"
   }else if(!noNumber.test(inputdetails.name)){
    throwError.name ="no number's allowed in"
   }else if(inputdetails.name.trim() === details.userName){
    throwError.name="it look like same name to last one "
   }
   setInputvalidation(throwError)
    return Object.keys(throwError).length===0
 }


  useEffect(()=>{
    setInputDetails({name:details.userName})
  },[])

const handleclick=(details)=>{
  // console.log(details,"details")
setShowPoup(true)
}

const handlesubmiteUpdate= async()=>{
  console.log(inputvalidation)
 if(validation()){
    await axios.post('http://localhost:4500/updateProfileStaff',[inputdetails,details._id])
    .then((data)=>{
      console.log('data reached here',data)
      window.location.reload()
    })
    .catch((error)=>{
      console.log('errror at post update profile..',error)
    })
 }
}

 const handleuploadimage = ()=>{
  setshowimagepoup(true)
 }
 const handleimages = (e)=>{
  setimageSaver(e.target.files[0])
  
 }

   useEffect(()=>{
    async function imagecall() {
      try {
         
     const Token = localStorage.getItem('Token')
       const res =  await axios.get('http://localhost:4500/imageGetter',{
        headers:{Authorization:`Bearer ${Token}`}
       })
       .then((respon)=>setimageUrl(respon.data?.image))
       .catch((error)=>{
        console.log(error)
       })
      } catch (error) {
         console.log(error)
      }
    }
    imagecall()
   },[])
// details of person
   useEffect(()=>{
    async function apicall() {
      try {
         
     const Token = localStorage.getItem('Token')
       const res =  await axios.get('http://localhost:4500/profileStaff',{
        headers:{Authorization:`Bearer ${Token}`}
       })
      .then((Response)=>{
        useDetails(Response.data)
         console.log("profileData:",Response.data)
      })
      
      .catch((error)=>{
        console.log('error',error)
      })
      } catch (error) {
         console.log(error)
      }
    }
    apicall()
   },[])

   const  handlelogout = ()=>{
      localStorage.removeItem('Token')
 navigate('/')
   } 
 
const formdata = new FormData()
formdata.append('image',imageSaver)
formdata.append('mail',details.email)

    const handlesendimage = async(e)=>{
      console.log(e)
     e.preventDefault()
      try {
        await axios.post('http://localhost:4500/uploadedimages',formdata, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((data)=>console.log(data))
        .catch((error)=>console.log(error))

         
      } catch (error) {
         console.log('error at image',error)
      }
    window.location.reload()

    }



 
  return (

  <div className='datainfo-main'>
 <div className='datainfo-child'>
   <div className='datainfo-one'
     onClick={handleuploadimage}><img  src={imageUrl } className='datainfo-img'></img>
     <div style={{color:'black'}}><h1 style={{color:'white'}}>  {details.userName}</h1>
           <h4>  {details.email}</h4>
           <h5>  {details.role}</h5>
     </div>
     
      
   </div>
 <div className='profile-main'>
  
    <div> <button onClick={handleclick}><IoPersonOutline className='icons' /> Edit Profile</button> </div>
     <div>  <button><IoIosNotificationsOutline className='icons'/>notification</button> </div>
     <div>  <button  > <MdLockReset className='icons'/> Change Password</button> </div>
     <div>  <button> <RiCustomerService2Fill className='icons'/> Help Center</button> </div>
     <div><button><IoSettingsOutline className='icons'/> Setting</button></div>
     <div onClick={handlelogout}>  <button > <IoLogOutOutline className='icons' />LogOut</button> </div>
 </div>
     
         <div className='profile-footer'> 
      <div className='profile-footer-card' >
        <div><button><IoLogoGoogle className='footer-icons'/> Google</button></div>
        <div> <button> <SiInstagram className='footer-icons'/>Instagram</button></div>
        <div><button><GrLinkedin className='footer-icons'/>Linkedin</button></div>
      </div>
      <div className='profileo-foooter-mail'>2023 @copyright:TubEly@gmail.com</div>
     </div>
 </div>


   {/* {showPoup && (
  <div className="modal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Profile</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowPoup(false)}
            aria-label="Close"
          ></button>
        </div>



  <div className="profileCardInput">
       <form>
         <div className='profileCard1'>
            <input id='2'   type="text" onChange={(e)=>handleInputUpdate({name:e.target.value})} defaultValue={inputdetails.name ||details.userName }
           placeholder='name' />
           {inputvalidation && <p>{inputvalidation.name}</p>}
        </div>
      </form>

      <div className="modal-footer" >
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => setShowPoup(false)}>

            Close
          </button>
          <button type="submit" className="btn btn-primary" onClick={handlesubmiteUpdate}>
            Save changes
          </button>
        </div>
 
    </div>
     
       
        </div>
        
      </div>
    </div>

)}
   {showimagepoup&& (
  <div className="modal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">select image :</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setshowimagepoup(false)}
            aria-label="Close"
          ></button>
        </div>



  <div className="profileCardInput">
       <form onSubmit={handlesendimage}>
         <div className='profileCard1'>
              <div>

      <label> select photo
      <input  className='video-file' type="file"  accept='image/*' onChange={handleimages} /></label>

      </div>
         
        </div>
      </form>

      <div className="modal-footer" >
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => setshowimagepoup(false)}>

            Close
          </button>
          <button type="submit" className="btn btn-primary" onClick={handlesendimage} >
            Save changes
          </button>
        </div>
 
    </div>
     
       
        </div>
        
      </div>
    </div>

)} */}












  </div>


  )
}


export default Staffprofile

