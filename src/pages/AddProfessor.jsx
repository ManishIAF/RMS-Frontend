import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../hooks/fetch.hook';
import Alert from '../components/Alert'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm} from "react-hook-form";


function AddProfessor() {

  const {state,pathname} = useLocation()
  const Navigate = useNavigate()
  const [{apiData}] = useFetch(`professor/${state?.id}`,{skip:!state?.id})
  const {register, handleSubmit,setValue} = useForm()
  const [alert,setAlert] = useState({});

  useEffect(()=>{

    if(!state?.id){
      if(pathname === '/admin/editprofessor'){
        Navigate('/admin/professorList')
      }
    }

    if (apiData) {
      setValue('firstName', apiData.firstName);
      setValue('lastName', apiData.lastName);
      setValue('email', apiData.email);
    }

  },[Navigate,pathname,state?.id,setValue,apiData])

  const editProfessor = (data,event)=>{

    event.preventDefault();

    const Data = {id:apiData?._id,firstName:data?.firstName,lastName:data?.lastName,email:data?.email}

    const token = localStorage.getItem('token');

    axios.patch('/api/professor',
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

  const addProfessor = (data,event)=>{

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

      <form><br />

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
                {!apiData?
                  <Button onClick={handleSubmit(addProfessor)} style={{width:'100%',height:'50px',marginTop:'10px'}} type='submit' variant="contained">
            
                    Add Professor
        
                  </Button>:
                  <Button onClick={handleSubmit(editProfessor)} style={{width:'100%',height:'50px',marginTop:'10px'}} type='submit' variant="contained">
            
                    Edit Professor
        
                  </Button>

                } 
              </div>
      
          </div>
      
      </form>
    </div>
  )
}

export default AddProfessor;