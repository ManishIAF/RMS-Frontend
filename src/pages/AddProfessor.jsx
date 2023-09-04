import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../hooks/fetch.hook';
import Alert from '../components/Alert'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Select,MenuItem } from '@mui/material';
import ITEM from '../components/Paper'
import { useForm,Controller} from "react-hook-form";


function AddProfessor() {

  const {state,pathname} = useLocation()
  const Navigate = useNavigate()
  const [{apiData}] = useFetch(`professor/${state?.id}`,{skip:!state?.id})
  const {control,register,handleSubmit,setValue,formState: { errors }} = useForm()
  const [alert,setAlert] = useState({});

  useEffect(()=>{

    if(!state?.id){
      if(pathname === '/admin/editprofessor'){
        Navigate('/admin/professorList')
      }
    }

    if (apiData) {

      setValue('firstName', apiData?.firstName);
      setValue('lastName', apiData?.lastName);
      setValue('Gender', apiData?.Gender);
      setValue('DOB', apiData?.DOB?.split('T00')[0]);
      setValue('email', apiData?.email);
    }

  },[Navigate,pathname,state?.id,setValue,apiData])

  const editProfessor = (data,event)=>{

    event.preventDefault();

    const Data = {id:apiData?._id,firstName:data?.firstName,lastName:data?.lastName,email:data?.email,DOB:data?.DOB,Gender:data?.Gender}
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
    
    <ITEM marginTop='80px' width='700px' height='400px'>

      {alert?.message&&<Alert alert={alert}/>}

      <form style={{marginLeft:'70px',marginTop:'100px'}}>

          <div>
            
            <div style={{display:'flex'}}>
              <div>
                <TextField type='text' id="standard-basic" {...register('firstName',{required: 'First Name is required'})} placeholder="First Name" variant="standard" /><br/>
                {errors.firstName && <span style={{color:'red',fontSize:'12px'}}>{errors.firstName.message}</span>}
              </div>
              <div style={{marginLeft:'30px'}}>
                <TextField type='text' id="standard-basic" {...register('lastName',{required: 'Last Name is required'})} placeholder="Last Name" variant="standard" /><br/>
                {errors.lastName && <span style={{color:'red',fontSize:'12px'}}>{errors.lastName.message}</span>}
              </div>
              <div style={{marginLeft:'20px'}}>
                  <Controller
                        name="Gender"
                        defaultValue=''
                        control={control}
                        rules={{
                          required: 'Please select a Gender',
                        }}
                        render={({ field }) => (
                          <div>
                            <Select placeholder='Gender' variant="standard" sx={{minWidth: 160}} {...field}>
                                <MenuItem value='Male'>
                                  Male
                                </MenuItem>
                                <MenuItem value='Female'>
                                  Female
                                </MenuItem>
                                <MenuItem value='Others'>
                                  Others
                                </MenuItem>
                            </Select><br />
                            {errors.Gender ? (
                              <span style={{ color: 'red', fontSize: '12px' }}>
                                {errors.Gender.message}
                              </span>
                            ):<p style={{fontSize:'12px',color:'gray'}}>Select Gender</p>}
                          </div>
                        )}
                      />
                </div>
            </div>
            <div style={{display:'flex',marginTop:'40px'}}>
              <div >
                  <TextField type='date' style={{width:'200px'}} placeholder='Date of birth' id="standard-basic" {...register('DOB',{required: 'Date of birth is required'})} variant="standard" /><br/>
                  {errors.DOB ? <span style={{color:'red',fontSize:'12px'}}>{errors.DOB.message}</span>:<p style={{fontSize:'12px',color:'gray'}}>D.O.B</p>}
              </div>
              <div style={{marginLeft:'20px'}}>
                <TextField style={{width:'340px'}} InputProps={{type:'email'}} id="standard-basic" {...register('email',{required: 'E-mail is required',pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message: 'Invalid email address',}})} placeholder="E-mail" variant="standard" /><br/>
                {errors.email && <span style={{color:'red',fontSize:'12px'}}>{errors.email.message}</span>}
              </div>
            </div>

          </div>
          
          <div style={{marginTop:'20px',marginRight:'70px',float:'right'}}>

              {!apiData?
                <Button onClick={handleSubmit(addProfessor)} type='submit' variant="contained">
          
                  Add Professor
      
                </Button>:
                <Button onClick={handleSubmit(editProfessor)} type='submit' variant="contained">
          
                  Edit Professor
      
                </Button>

              } 
      
          </div>
      
      </form>
    </ITEM>
  )
}

export default AddProfessor;