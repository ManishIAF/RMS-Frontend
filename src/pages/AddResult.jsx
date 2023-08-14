import React,{useState,useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import useFetch from '../hooks/fetch.hook';

import Grow from '@mui/material/Grow';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

import Image from '../components/Image';
import { useForm,Controller} from "react-hook-form";
import Alerting from '../components/Alert'
import axios from 'axios';
import AllotedCourses from '../components/allotedCourses';
import { Select,MenuItem } from '@mui/material';
import StudentList from '../components/StudentList';
import ITEM from '../components/Paper';


function AddResult() {

  const {state} = useLocation();
  const Navigate = useNavigate()

  const [rollNumber,setRollNumber] = useState(state?.roll);
  const [{apiData}] = useFetch(`students/${rollNumber}`,{ skip: !rollNumber });
  const [{apiData:students},,setParams,Params] = useFetch('students');
  const [{apiData:allotedCourses}] = useFetch('professor/course');
  const {control,register, handleSubmit,reset,setValue} = useForm();
  const [openStatus,setOpenStatus] = useState(false);
  const [alert,setAlert] = useState({});

  const handleChange = (value)=>{

    setRollNumber(value)

  }


  useEffect(() => {

    if(allotedCourses){ 

      setValue('SubjectId',allotedCourses&&allotedCourses[0]?._id)

    }

    if(rollNumber){
      setValue('Roll_Number',rollNumber)
    }
    
  }, [allotedCourses,rollNumber,setValue]);

  const onSubmit = (data,event) => {

    event.preventDefault();
    const {Roll_Number,SubjectId,Semester,Internal,Theory,Practical} = data;

    const Data = {

      Roll_Number:Number(Roll_Number),
      SubjectId:SubjectId,
      Semester:Semester,
      Internal:Number(Internal),
      Theory:Number(Theory),
      Practical:Number(Practical),


    }

    const token = localStorage.getItem('token');

    axios.post('/api/result',
      Data,
      {
        "Content-Type":"application/json",
        withCredentials:true,
        headers:{
          "Authorization" : `Bearer ${token}`
        }
      }
    ).then((response)=>{

      setParams({})
      reset({ Roll_Number: null, Internal: null,Theory: null, Practical: null });
      setAlert({message:response?.data,variant:"success"})

      if(state?.roll){
        setTimeout(() => {
            Navigate('/admin/students')

        }, 1000);
      }
    }).catch((error)=>{

      setAlert({message:error.response.data,variant:'info'})
        
    })


  }

  return (
    
    <div style={{width:'100%',alignContent:'center',height:'100%',marginTop:'5px'}}>
      {alert?.message&&<Alerting alert={alert}/>}
      
      <div onClick={()=>setOpenStatus(!openStatus)}>
        <AllotedCourses Data={allotedCourses} openStatus={openStatus} setOpenStatus={setOpenStatus}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:state?.roll?'auto':'3fr 2fr',justifyContent:'center'}}>
        <ITEM marginLeft='40px' marginTop={!openStatus?'70px':'10px'} width='600px' height='400px' borderRadius='7px'>
          {apiData?.firstName&&<div><Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 500 } : {})}>
            <div style={{display:"flex",marginTop:'100px',justifyContent:'center'}}>
          
              <div>
                <Image Image={apiData?.profile} alt='student' width='80px' imageRadius='50%'/>
              </div>
        
              <div style={{display:'flex',marginLeft:'10px',marginTop:'15px',lineHeight:'25px'}}>
                <div>
                  <p><strong>Name :</strong> {apiData?.firstName + ' ' + apiData?.lastName}</p>
                  <p><strong>Semester :</strong> {apiData?.Semester}</p>
                </div>
                <div style={{marginLeft:'10px'}}>
                  <p><strong>Registration Number :</strong> {apiData?.Regitration_Number}</p>
                  <p><strong>Roll Number :</strong> {apiData?.Roll_Number}</p>
                </div>
              </div>
      
            </div>
          </Grow></div>}
      
        <div style={{display:'flex',justifyContent:'center',marginTop:!rollNumber&&'120px'}}>
          <form onSubmit={handleSubmit(onSubmit)} ><br />

            <div style={{display:'flex'}}>
            
              <div>
                <Input type='number' defaultValue={rollNumber} {...register('Roll_Number',{required:true,maxLength:10,value:rollNumber})} placeholder="Roll_Number" onChange={(event)=>{event.target.value.length >= 8 && handleChange(event.target.value)}} />
              </div>

                <div style={{marginLeft:'20px'}}>
                <Controller
                  name="SubjectId"
                  defaultValue=''
                  control={control}
                  render={({ field }) => (
                    <Select variant="standard" sx={{minWidth: 160}} {...field}>
                      {allotedCourses?allotedCourses?.map(allotedCourse=><MenuItem key={allotedCourse?._id} value={allotedCourse?._id}>
                          {allotedCourse?.Semester +' ' + allotedCourse?.subject}
                        </MenuItem>):<MenuItem key={1} value={undefined}>
                          No course authorised
                        </MenuItem>}
                    </Select>
                  )}
                />
                </div>

              <div style={{marginLeft:'20px'}}>
                <Input type='number' {...register('Internal', {required:true,maxLength:10})} disabled={false} placeholder="Internal" />
              </div>

            </div><br />
          
            <div style={{display:'flex'}}>
          
              <div>
                <Input type='number' {...register('Theory',{required:true,maxLength:10})} disabled={false} placeholder="Theory" />
              </div>

              <div style={{marginLeft:'20px'}}>
                <Input type='number' {...register('Practical',{required:true,maxLength:10})} disabled={false} placeholder="Practical" />
              </div>

              <Button style={{marginLeft:'20px'}} type='submit' variant="contained" size="small">
            
                submit
            
              </Button>

            </div>

          </form>
        </div>
        </ITEM>

        {!state?.roll&&students&&<div style={{width:'500px',padding:'1px',marginLeft:'10px'}}>
            <StudentList Params={Params} setParams={setParams} openStatus={openStatus} students={students?.studentData} rollNumber={rollNumber} setRollNumber={setRollNumber}/>
        </div>}

      </div>

    </div>
  )
}

export default AddResult