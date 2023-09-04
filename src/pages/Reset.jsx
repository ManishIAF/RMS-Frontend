import React,{useState,useEffect} from 'react'
import Alerting from '../components/Alert'
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useForm} from "react-hook-form";
import ITEM from '../components/Paper'
import {useNavigate, useParams } from 'react-router-dom';

function Reset() {

  const {token:recoveryToken} = useParams()

  const navigate = useNavigate()
  const {register, handleSubmit,formState: { errors },watch} = useForm();
  const [alert,setAlert] = useState({});
 
  useEffect(()=>{

    axios.get(`/api/passwordRecovery/${recoveryToken}`).then((response)=>{

        setAlert({message:response?.data,variant:"success"})

      }).catch((error)=>{
    
        setAlert({message:error?.response?.data,variant:"info"})
        setTimeout(() => {
          return navigate('/', { replace: true });
        }, 1000);
    
    })
  },[recoveryToken,navigate])

  const onSubmit = (data)=>{
  
    const {password} = data;

    const Data = {password,token:recoveryToken};

    axios.put(`/api/passwordRecovery`,Data,
    ).then((response)=>{
      setAlert({message:response?.data,variant:"success"})
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1000);

    }).catch((error)=>{
        
        setAlert({message:error.response.data,variant:'info'})

        if(error.response.status === 401){
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1000);
        }
        
      })


  }

  console.log('Errors : ',errors);

  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      {alert?.message&&<Alerting alert={alert}/>}
      <div>

        <ITEM width='500px' justifyContent='center' marginTop='150px'>
          <div style={{height:'1px'}} ></div>
          <div style={{marginLeft:'150px',minHeight:'300px',height:'auto'}}>
            <div style={{marginTop:'80px'}}>

              <h3>
                <strong>Enter new password</strong>
              </h3>

            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

              <div style={{marginTop:'10px'}}>
                <div>
                  <Input {...register('password',{required:'Password is required' , pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                    }})} 
                    type='password' placeholder='new password' 
                  /><br/>
                  {errors.password&&<span style={{color:'red',fontSize:'12px'}}>{errors.password.message}</span>}
                </div>
                <div style={{marginTop:'10px'}}>
                  <Input {...register('confirm_password',{required:'Please Re-Enter password' , validate: value => value === watch('password') || "Passwords don't match"})} type='password' placeholder='repeat password' /><br/>
                  {errors.confirm_password&&<span style={{color:'red',fontSize:'12px'}}>{errors.confirm_password.message}</span>}
                </div>
                <div style={{marginTop:'10px'}}>
                  <Button type='submit' variant="contained">Reset</Button>
                </div>
              </div>

            </form>
          </div>
        </ITEM>

      </div>
    </div>
  )
}

export default Reset