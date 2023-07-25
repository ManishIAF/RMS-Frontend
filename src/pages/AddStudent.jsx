import React,{useState} from 'react'
import convertToBase64 from '../helper/convert';
import axios from 'axios';
import Alert from '../components/Alert'
import {InputLabel,OutlinedInput,FormControl} from '@mui/material';
import Button from '@mui/material/Button';
import ToolTipComponent from '../components/ToolTipComponent';
import Image from '../components/Image';
import { useForm} from "react-hook-form";

function AddStudent() {

  const [file,setFile] = useState()
  const {register, handleSubmit} = useForm()

  const [alert,setAlert] = useState({});

  const onSubmit = (data,event)=>{

    event.preventDefault();
    const {firstName,lastName,email,Semester,Roll_Number,Registration_Number} = data;

    const Data = { Profile:file,firstName,lastName,email,Semester,Roll_Number,Registration_Number}

    const token = localStorage.getItem('token');

    axios.post('/api/students',
      Data,

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

  const onUpload = async e =>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    
    <div >

      {alert?.message&&<Alert alert={alert}/>}

      <form onSubmit={handleSubmit(onSubmit)}><br />

          <div>

            <div style={{marginLeft:'160px'}}>
              <ToolTipComponent
                title='upload image'
                content={
                  <div>
                    <label htmlFor='profile'>
                      <Image Image={file} width='80px' />
                    </label>
                    <input onChange={onUpload} type='file' id='profile' name='profile'/>
                  </div>
                }
              />
            </div><br />
            <div style={{display:'flex'}}>
              <div>
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
            </div>
          </div><br />

          <div style={{display:'flex'}}>
              
              <div>
                <FormControl>
                  <InputLabel>Roll Number</InputLabel>
                  <OutlinedInput 
                    id="outlined-adornment-amount"
                    type='number' 
                    {...register('Roll_Number',{required:true})} 
                    disabled={false} 
                    label="Roll Number"
                  />
                </FormControl>
              </div>
            
              <div style={{marginLeft:'20px'}}>
                {/* <Input type='number' {...register('Registration_Number',{required:true,maxLength:100})} disabled={false} placeholder="Regitration_Number" /> */}
                <FormControl>
                  <InputLabel>Registration Number</InputLabel>
                  <OutlinedInput 
                    id="outlined-adornment-amount"
                    type='number' 
                    {...register('Registration_Number',{required:true})} 
                    disabled={false} 
                    label="Registration Number"
                  />
                </FormControl>
              </div>

          </div>

          <div style={{marginTop:'20px'}}>

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
            </div>
            <Button style={{height:'50px',width:'100%',marginTop:'20px'}} type='submit' variant="contained" size="small">
            
                submit
            
            </Button> 
              
          </div>
      
      </form>
    </div>
  )
}

export default AddStudent