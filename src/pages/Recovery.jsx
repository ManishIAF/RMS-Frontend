import React, { useEffect, useState } from 'react'
import {useLocation,Navigate,useNavigate} from 'react-router-dom'
import axios from 'axios';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Alerting from '../components/Alert'


const Recovery = ()=> {

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [OTP,setOTP] = useState()
  const [alert,setAlert] = useState({});


  useEffect(()=>{

    axios.get('/api/OTP/generateOTP',{params:{username:state?.username}})
    .then((response)=>{

      setAlert({message:response?.data,variant:"success"})

    }).catch((error)=>{
      setAlert({message:error.response.data,variant:'info'})
    })

  },[state?.username])

  /* handle submit */
  const onSubmit = (e)=>{

    e.preventDefault();

    axios.post('/api/OTP/verifyOTP',{username:state?.username,code:Number(OTP)})
    .then((response)=>{

      setAlert({message:response?.data,variant:"success"})
      setTimeout(() => {
        navigate('/reset', { state: { username:state?.username }});
      }, 1000);

    }).catch((error)=>{
      setAlert({message:error.response.data,variant:'info'})
    })
     
  }

  /* handler of resend OTP */

  const resendOTP = ()=>{

    axios.get('/api/OTP/generateOTP',{params:{username:state?.username}})
    .then((response)=>{
      setAlert({message:response?.data,variant:"success"})
    }).catch((error)=>{
      setAlert({message:error.response.data,variant:'info'})
    })
    
  }

  return (
    <div style={{display:'flex',justifyContent:'center',paddingTop:'200px'}}>
      {alert?.message&&<Alerting alert={alert}/>}
      <div >

        {state?.username?<div>

          <div style={{display:'flex',justifyContent:'center',color:'gray'}}>
            
            <strong>
              {alert?.message&&'Enter OTP sent to your E-mail'}
            </strong>

          </div>

          <form onSubmit={onSubmit}>

            <div style={{display:'flex',marginTop:'20px',gap:'10px'}}>
              <Input onChange={(e)=> setOTP(e.target.value)} type='number' placeholder='OTP' />
              <Button size="small" variant="contained" type='submit'>Verify</Button>
            </div>

          </form>

            <div style={{marginTop:'10px',color:'gray'}}>
              <strong >Can't get OTP? <Button size="small" onClick={resendOTP} >Resend</Button></strong>
            </div>

        </div>:<Navigate to='/' replace />}
      </div>
    </div>
  )
}

export default Recovery