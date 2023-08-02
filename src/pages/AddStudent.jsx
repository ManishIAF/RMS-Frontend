import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';
import convertToBase64 from '../helper/convert';
import axios from 'axios';
import Alert from '../components/Alert'
import {InputLabel,OutlinedInput,FormControl} from '@mui/material';
import Button from '@mui/material/Button';
import ToolTipComponent from '../components/ToolTipComponent';
import Image from '../components/Image';
import { useForm} from "react-hook-form";

function AddStudent() {
  const Navigate = useNavigate()
  const location = useLocation()
  const {state} = location;
  const [file,setFile] = useState()
  const [{apiData}]=useFetch(`students/${state?.roll}`,{skip:!state?.roll})
  const {register, handleSubmit,setValue} = useForm()
  const [alert,setAlert] = useState({});
  
  useEffect(() => {
    
    if(location.pathname === '/admin/editStudent'){

      if(!state?.roll){
  
        Navigate('../')

      }

    }

    if (apiData) {
      setValue('firstName', apiData.firstName);
      setValue('lastName', apiData.lastName);
      setValue('email', apiData.email);
      setValue('Roll_Number', apiData.Roll_Number);
      setValue('Registration_Number', apiData.Regitration_Number);
    }
  
  }, [apiData, setValue,location.pathname,state?.roll,Navigate]);

  const editStudent = (data,event)=>{
    
    event.preventDefault();

    const {firstName,lastName,email,Roll_Number,Registration_Number} = data;

    const Data = {id:apiData?._id,Profile:file,firstName,lastName,email,Roll_Number,Registration_Number}

    const token = localStorage.getItem('token');

    axios.patch('/api/students',
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

  const addStudent = (data,event)=>{

    event.preventDefault();
    const {firstName,lastName,email,Roll_Number,Registration_Number} = data;

    const Data = { Profile:file,firstName,lastName,email,Roll_Number,Registration_Number}

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

      <form><br />

          <div>

            <div style={{marginLeft:'160px'}}>
              <ToolTipComponent
                title='upload image'
                content={
                  <div>
                    <label htmlFor='profile'>
                      <Image Image={apiData?.profile?apiData?.profile:file} width='80px' />
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
            {!apiData?
              <Button type='submit' onClick={handleSubmit(addStudent)} style={{height:'50px',width:'100%',marginTop:'20px'}} variant="contained" size="small">
              
                Add Student
              
              </Button>:
              <Button type='submit' onClick={handleSubmit(editStudent)} style={{height:'50px',width:'100%',marginTop:'20px'}} variant="contained" size="small">
              
                Edit Student
          
              </Button>
            } 
              
          </div>
      
      </form>
    </div>
  )
}

export default AddStudent