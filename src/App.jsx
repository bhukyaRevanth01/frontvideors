
import Login from '../loginDetails/login'
import Singup from '../loginDetails/Singup'
import Dashboard from '../Mainborad/Dashboard'
import Otp from '../sendOtp/Otp'
import Streaming from '../staff/mainVideo/Streaming'
import Staffprofile from '../staff/profile/Staffprofile'
import Videoupload from '../staff/Uploads/Videoupload'
import './App.css'
 import Homepage from './Homepage'
import{BrowserRouter,Route,Routes} from'react-router-dom'



function App() {
  

  return (
    <>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Homepage/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/singup' element={<Singup/>}/>
  <Route path='/otp' element={<Otp/>}/>

  <Route path='/home' element={<Dashboard/>}>
 <Route path='/home' element={<Streaming/>}/>
 <Route path='uploads' element={<Videoupload/>}/>
 <Route path='profile' element={<Staffprofile/>}/>
  </Route>

 </Routes>
 </BrowserRouter>
    
    </>
  )
}

export default App
