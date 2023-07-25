import React,{useState,useEffect} from 'react'
import Alerting from '../components/Alert'
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useForm} from "react-hook-form";
import {useNavigate, useParams } from 'react-router-dom';

function Reset() {

  const {token:recoveryToken} = useParams()

  const navigate = useNavigate()
  const {register, handleSubmit} = useForm();
  const [alert,setAlert] = useState({});
 
  useEffect(()=>{

    axios.get(`/api/passwordRecovery/${recoveryToken}`).then((response)=>{

        setAlert({message:response?.data,variant:"success"})

      }).catch((error)=>{
        console.log('error.data : ',error.response.data)
    
        setAlert({message:error?.response?.data,variant:"info"})
        setTimeout(() => {
          return navigate('/', { replace: true });
        }, 1000);
    
    })
  },[recoveryToken,navigate])

  const onSubmit = (data)=>{

    const {password,confirm_password} = data;

    if(password !== confirm_password) return setAlert({message:"password doesen't match ",variant:"success"})

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

//Dinesh Mama : 7983014400
  return (
    <div style={{display:'flex',justifyContent:'center',marginTop:'200px'}}>
      {alert?.message&&<Alerting alert={alert}/>}
      <div>

        <div>

          <div>

            <span>
              Enter new password
            </span>

          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div >
              <div>
                <Input {...register('password',{required:true})} type='password' placeholder='new password' />
              </div>
              <div>
                <Input {...register('confirm_password',{required:true})} type='password' placeholder='repeat password' />
              </div>
              <div>
                <Button type='submit'>Reset</Button>
              </div>
            </div>

          </form>

        </div>

      </div>
    </div>
  )
}

export default Reset