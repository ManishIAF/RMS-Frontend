import {useNavigate } from 'react-router-dom'
import axios from 'axios';
import Image from '../components/Image';
import { useForm} from "react-hook-form";
import Alerting from '../components/Alert'
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import { useState } from 'react';

function Login() {

  const navigate = useNavigate()
  const {register, handleSubmit,formState: { errors }} = useForm();
  const [alert,setAlert] = useState({});

  const [user,setUser] = useState({
    username:'',
    firstName:'',
    profile:'',
    pass:''
  })

  const sendMail = () =>{

    const data = {username:user?.username};
    
    axios.post('/api/passwordRecovery',data).then((response)=>{

      setUser((prevData)=>{ 

        return {...prevData,pass:response?.data}

      })

    }).catch((error)=>{

      setAlert({message:error?.response?.data,variant:"info"})

    })

  }
  const handleVerify = (data)=>{

    const {username} = data;

    axios.post('/api/veryfyUser',{username}).then((response)=>{

      if(response?.status === 200){
        setUser({username:response?.data?.username,firstName:response?.data?.firstName,profile:response?.data?.profile})
        setAlert({message:response?.data.msg,variant:"success"})
        
      }

    }).catch((error)=>{

      setAlert({message:error?.response?.data,variant:"info"})
      

    })

  }

  const handleLogin = (data)=>{

    axios.post('/api/login',{username:user?.username,password:data?.password}).then((response)=>{

      if(response?.status === 200){
        localStorage.setItem('token', response?.data?.token);
        
        setAlert({message:response?.data.msg,variant:"success"})        
        
        setTimeout(() => {
          
          if(response?.data?.auth === 'moderate'||response?.data?.auth === 'high'){
            navigate('/admin', {replace:true});
          }
          
          if(response?.data?.auth === 'standard'){
            navigate('/student', {replace:true});
          }
          
        }, 1000);
      }

    }).catch((error)=>{

      setAlert({message:error?.response?.data,variant:"info"})
      

    })

  }
  return (
    <div style={{display:'flex' , justifyContent:'center' , paddingTop:'200px' }}>
      {alert?.message&&<Alerting alert={alert}/>}
      <div>

          <div style={{height:'30px'}}>
                      
              {(user?.firstName||user?.username)&&<Alert style={{display:'flex',justifyContent:'center',background:'none'}}>
                {!user?.pass?<strong>{'Hello ' + user?.firstName||user?.username}</strong>:<strong>{user?.pass}</strong>}
              </Alert>}

          </div>

            <div style={{display: 'flex',marginTop:'30px',height:'50px'}}>
              
              <div>
                <Image Image={user?.profile} width='50px'/>
              </div>

              <div style={{display:'flex',marginTop:'10px',marginBottom:'10px' ,marginLeft:'10px'}}>
                <div>
                    <div style={{display:'flex'}}>
                      {!user?.username&&<div>
                        <Input {...register('username', {required:'username is required'})} type='text' placeholder='Username' /><br/>
                        {errors.username&&<span style={{color:'red',fontSize:'12px'}}>{errors.username.message}</span>}
                      </div>}
                      {user?.username&&<div>
                        <Input {...register('password', {required:'password is required'})} type='password' placeholder='password' /><br/>
                        {errors.password&&<span style={{color:'red',fontSize:'12px'}}>{errors.password.message}</span>}
                      </div>}
                      {!user?.username&&<div style={{marginLeft:'10px'}}>
                        <Button size="small" type='submit' variant="contained" onClick={handleSubmit(handleVerify)}>Let's Go</Button>
                      </div>}
                      {user?.username&&<div style={{marginLeft:'10px'}}>
                        <Button size="small" type='submit' variant="contained" onClick={handleSubmit(handleLogin)} >Sign In</Button>
                      </div>}
                    </div>
                </div>
              </div>
            </div>
            <div style={{padding:'10px'}}>
              {!user.username&&<span className='text-gray-500'><strong style={{marginLeft:'50px',color:'gray'}}>Enter your username</strong></span>}
              {(!user.pass&&user?.username) && <span className='text-gray-500'><strong style={{color:'gray',marginLeft:'20px'}}>forgot password?</strong> <Button style={{textDecoration:'none',color:'blue'}} className='text-red-500' onClick={()=>sendMail()} state={{username:user.username}} replace >Recover Now</Button></span>}
            </div>

        </div>

    </div>
  )
}

export default Login;