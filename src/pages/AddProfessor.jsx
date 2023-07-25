import React,{useState} from 'react'
import axios from 'axios';
import Alert from '../components/Alert'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm} from "react-hook-form";


function AddProfessor() {

  const {register, handleSubmit/*, formState: { errors }*/} = useForm()

  const [alert,setAlert] = useState({});

  const onSubmit = (data,event)=>{

    event.preventDefault();

    const token = localStorage.getItem('token');

    axios.post('/api/professor',
      data,

      {
        "Content-Type":"application/json",
        withCredentials:true,
        headers:{
          "Authorization" : `Bearer ${token}`
        }
      }

    ).then(response=>{

      setAlert(()=>{
                
        if(response.status === 200){

            return {message:response.data,variant:'success'}

        }
    })
      
    }).catch((error)=>{

      setAlert({message:error.response.data,variant:'info'})


    })

  }

  return (
    
    <div style={{marginTop:'80px'}}>

      {alert?.message&&<Alert alert={alert}/>}

      <form onSubmit={handleSubmit(onSubmit)}><br />

          <div style={{display:'flex'}}>
            
            <div>
              {/* <Input type='text' {...register('firstName',{required:true,maxLength:100})} disabled={false} placeholder="firstName" /> */}
              <FormControl>
                <InputLabel>First Name</InputLabel>
                <OutlinedInput 
                  id="outlined-adornment-amount"
                  type='text' 
                  {...register('firstName',{required:true})} 
                  disabled={false} 
                  label="First Name"
                />
              </FormControl>
            </div>

            <div style={{marginLeft:'20px'}}>
              <FormControl>
                <InputLabel>Last Name</InputLabel>
                <OutlinedInput 
                  id="outlined-adornment-amount"
                  type='text' 
                  {...register('lastName',{required:true})} 
                  disabled={false} 
                  label="Last Name"
                />
              </FormControl>
            </div>

          </div><br />
          
          <div>

              <FormControl fullWidth>
                <InputLabel>E-mail</InputLabel>
                <OutlinedInput 
                  id="outlined-adornment-amount"
                  type='email' 
                  {...register('email',{required:true})} 
                  disabled={false} 
                  label="E-mail"
                />
              </FormControl>
              
              <div>
                <Button style={{width:'100%',height:'50px',marginTop:'10px'}} type='submit' variant="contained">
            
                  submit
        
                </Button> 
              </div>
      
          </div>
      
      </form>
    </div>
  )
}

export default AddProfessor;