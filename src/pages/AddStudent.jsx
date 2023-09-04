import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';
import convertToBase64 from '../helper/convert';
import axios from 'axios';
import Alert from '../components/Alert'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ToolTipComponent from '../components/ToolTipComponent';
import { Select,MenuItem } from '@mui/material';
import Image from '../components/Image';
import { useForm,Controller} from "react-hook-form";
import ITEM from '../components/Paper'

function AddStudent() {
  const Navigate = useNavigate()
  const location = useLocation()
  const {state} = location;
  const [file,setFile] = useState()
  const [{apiData}]=useFetch(`students/${state?.roll}`,{skip:!state?.roll})
  const {control,register, handleSubmit,setValue,formState: { errors }} = useForm()
  const [alert,setAlert] = useState({});

  useEffect(() => {
    
    if(location.pathname === '/admin/editStudent'){

      if(!state?.roll){
  
        Navigate('../')

      }

    }

    if (apiData) {
      setValue('firstName', apiData?.firstName);
      setValue('lastName', apiData?.lastName);
      setValue('Gender', apiData?.Gender);
      setValue('DOB', apiData?.DOB?.split('T00')[0]);
      setValue('email', apiData.email);
      setValue('Roll_Number', apiData?.Roll_Number);
      setValue('Registration_Number', apiData?.Regitration_Number);
      setValue('Registration_Year', apiData?.Registration_Year);
    }
  
  }, [apiData, setValue,location.pathname,state?.roll,Navigate]);


  const editStudent = (data,event)=>{
    
    event.preventDefault();

    const {firstName,lastName,email,Roll_Number,Registration_Number,Registration_Year,DOB,Gender} = data;

    const Data = {id:apiData?._id,Profile:file,firstName,lastName,Registration_Year,DOB,Gender,email,Roll_Number,Registration_Number}

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
    const {firstName,lastName,email,Roll_Number,Registration_Number,Registration_Year,DOB,Gender} = data;

    const Data = { Profile:file,firstName,lastName,email,Roll_Number,Registration_Number,Registration_Year,DOB,Gender}

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
      <ITEM height='500px' width='700px' marginTop='50px'>
        <br /><br /><br />
        <form style={{marhinTop:'250px',marginLeft:'50px'}}>

            <div>

              <div style={{display:'flex'}}>
                <div>
                  <ToolTipComponent
                    title='upload image'
                    content={
                      <div>
                        <label htmlFor='profile'>
                          <Image Image={apiData?.profile?apiData?.profile:file} width='70px' />
                        </label>
                        <input onChange={onUpload} type='file' id='profile' name='profile'/>
                      </div>
                    }
                  />
                </div>
                <div style={{display:'flex',marginLeft:'20px',marginTop:'30px'}}>
                  <div>
                    <TextField style={{width:'200px'}} type='text' placeholder='First Name' id="standard-basic" {...register('firstName',{required: 'First Name is required'})} variant="standard" /><br/>
                    {errors.firstName && <span style={{color:'red',fontSize:'12px'}}>{errors.firstName.message}</span>}
                  </div>

                  <div style={{marginLeft:'20px'}}>
                    <TextField style={{width:'200px'}} type='text' placeholder='Last Name' id="standard-basic" {...register('lastName',{required: 'Last Name is required'})} variant="standard" /><br/>
                    {errors.lastName && <span style={{color:'red',fontSize:'12px'}}>{errors.lastName.message}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div style={{display:'flex',marginLeft:'20px',marginTop:'40px'}}>
                <div>
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
                <div style={{marginLeft:'20px'}}>
                  <TextField type='date' placeholder='Date of birth' id="standard-basic" {...register('DOB',{required: 'Date of birth is required'})} variant="standard" /><br/>
                  {errors.DOB ? <span style={{color:'red',fontSize:'12px'}}>{errors.DOB.message}</span>:<p style={{fontSize:'12px',color:'gray'}}>D.O.B</p>}
                </div>
                <div style={{marginLeft:'20px'}}>
                  <TextField type='number' placeholder='Roll Number' id="standard-basic" {...register('Roll_Number',{required: 'Roll Number is required'})} variant="standard" /><br/>
                  {errors.Roll_Number&& <span style={{color:'red',fontSize:'12px'}}>{errors.Roll_Number.message}</span>}
                </div>

            </div>

            <div style={{display:'flex',marginLeft:'20px',marginTop:'60px'}}>
              <div>
                  <TextField type='number' style={{width:'160px'}} placeholder='Registration Number' id="standard-basic" {...register('Registration_Number',{required: 'Registration Number is required'})} variant="standard" /><br/>
                  {errors.Registration_Number&& <span style={{color:'red',fontSize:'12px'}}>{errors.Registration_Number.message}</span>}
              </div>
              <div style={{marginLeft:'20px'}}>
                  <TextField type='number' style={{width:'140px'}} placeholder='Registration Year' id="standard-basic" {...register('Registration_Year',{required: 'Registration Year is required'})} variant="standard" /><br/>
                  {errors.Registration_Year&& <span style={{color:'red',fontSize:'12px'}}>{errors.Registration_Year.message}</span>}
              </div>
              <div style={{marginLeft:'20px'}}>
                <TextField InputProps={{type:'email'}} style={{width:'180px'}} placeholder='E-mail' id="standard-basic" {...register('email',{required: 'E-mail is required',pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message: 'Invalid email address',}})} variant="standard" /><br/>
                {errors.email && <span style={{color:'red',fontSize:'12px'}}>{errors.email.message}</span>}
              </div>  
                
            </div>
            <div>
            <div style={{float:'right',marginRight:'70px',marginTop:'20px'}}>
                {!apiData?
                  <Button type='submit' onClick={handleSubmit(addStudent)} variant="contained" size="small">
                  
                    Add Student
                  
                  </Button>:
                  <Button type='submit' onClick={handleSubmit(editStudent)} variant="contained" size="small">
                  
                    Edit Student
              
                  </Button>
                }
              </div>
            </div>
        
        </form>
      </ITEM>
    </div>
  )
}

export default AddStudent