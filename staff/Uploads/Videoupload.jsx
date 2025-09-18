import React, { useEffect, useState } from 'react'
import './videoupload.css'
import { IoMdRocket } from "react-icons/io";
import axios from 'axios';

function Videoupload() {
     const [file,setFile]=useState()


const handlingFile = (e)=>{
setFile(e.target.files[0])
}

const formData = new FormData()
 formData.append('video',file)

  useEffect(()=>{
 async function sendvideoData() {
    await axios.post('http://localhost:4500/videoupload',formData)
    .then((data)=>console.log(data))
    .catch((error)=>console.log(error))
   
      console.log('file sent')
 }
  sendvideoData()
  },[file])

  return (
      <div className='video-main'>
          <div className='video-card' >

              <div className='video-upload'>
                  <div className='video-circle'>
                      <input type="file" id='file' onChange={handlingFile} />
                      <label htmlFor='file'><IoMdRocket className='rocket-icons' /></label>
                  </div>
                  <div className='video-text'>
                      <h3 style={{ color: "white" }}>Drop video files to upload</h3>
                      <p style={{ color: "lightgray" }}>video stores it in dataBase</p>
                  </div>
                  <div className='video-button'>
                      <input type='file' id='file' onChange={handlingFile}></input>
                      <button > <label htmlFor="file">select file</label></button>
                  </div>
              </div>

          </div>
      </div>
  )
}

export default Videoupload