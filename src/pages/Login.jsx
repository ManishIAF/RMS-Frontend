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

  const {register:register1, handleSubmit:handleSubmit1} = useForm();
  const {register:register2, handleSubmit:handleSubmit2} = useForm();
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
        // console.log('response : ',response.data.token);
        localStorage.setItem('token', response?.data?.token);
        setAlert({message:response?.data.msg,variant:"success"})        
        setTimeout(() => {
          navigate('/admin', {replace:true});
        }, 1000);
      }

    }).catch((error)=>{

      // console.log('error?.response?.data : ',error?.response?.data)
      setAlert({message:error?.response?.data,variant:"info"})
      

    })

  }
  return (
    <div style={{display:'flex' , justifyContent:'center' , paddingTop:'200px' }}>
      {alert?.message&&<Alerting alert={alert}/>}
      <div>

          <div style={{height:'30px'}}>
                      
              {(user?.firstName||user?.username)&&<Alert style={{display:'flex',justifyContent:'center',background:'none'}}>
                <strong>{'Hello ' + user?.firstName||user?.username} </strong>
              </Alert>}
              {user?.pass&&<Alert style={{display:'flex',justifyContent:'center',background:'none'}}>
                <strong>{user?.pass}</strong>
              </Alert>}

          </div>

            <div style={{display: 'flex', alignItems: 'flex-end',marginTop:'30px',height:'50px'}}>
              
              <div>
                <Image Image={user?.profile} width='50px'/>
              </div>

              <div style={{display:'flex', marginBottom:'10px' ,marginLeft:'10px'}}>
                {!user?.username&&<div>
                  <form onSubmit={handleSubmit1(handleVerify)}>
                    <div style={{display:'flex'}}>
                      <div>
                        <Input {...register1('username', {required:true,maxLength:100})} type='text' placeholder='Username' />
                      </div>
                      <div style={{marginLeft:'10px'}}>
                        <Button size="small" variant="contained" type='submit'>Let's Go</Button>
                      </div>
                    </div>
                  </form>
                </div>}
                {user?.username&&<div>
                  <form onSubmit={handleSubmit2(handleLogin)}>
                    <div style={{display:'flex'}}>
                      <div>
                        <Input {...register2('password', {required:true,maxLength:100})} type='password' placeholder='password' />
                      </div>
                      <div style={{marginLeft:'10px'}}>
                        <Button size="small" variant="contained" type='submit'>Sign In</Button>
                      </div>
                    </div>
                  </form>
                </div>}
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