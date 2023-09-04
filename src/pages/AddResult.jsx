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
  const {control,register, handleSubmit,reset,setValue,formState: { errors }} = useForm();
  const [alert,setAlert] = useState({});

  const handleChange = (value)=>{

    setRollNumber(value)

  }


  useEffect(() => {

    if(rollNumber){
      setValue('Roll_Number',rollNumber)
    }
    
  }, [rollNumber,setValue]);

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
      
      <div >
        <AllotedCourses Data={allotedCourses}/>
      </div>
      <div style={{display:'grid',width:'100%',gridTemplateColumns:state?.roll?'auto':'3fr 2fr',justifyContent:'center'}}>
        <ITEM marginLeft='40px' width='600px' marginTop='60px' height='400px' borderRadius='7px'>
          {apiData?.firstName&&<div><Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 500 } : {})}>
            <div style={{display:"flex",marginTop:'100px',marginLeft:'20px',justifyContent:'left'}}>
          
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
                <Input type='number' defaultValue={rollNumber} {...register('Roll_Number',{required: 'Roll Number is required',maxLength:10,value:rollNumber})} placeholder="Roll_Number" onChange={(event)=>{event.target.value.length >= 8 && handleChange(event.target.value)}} /><br/>
                {errors.Roll_Number&& <span style={{color:'red',fontSize:'10px'}}>{errors.Roll_Number.message}</span>}
              </div>

                <div style={{marginLeft:'20px'}}>
                  <Controller
                    name="SubjectId"
                    defaultValue=''
                    control={control}
                    rules={{
                      required: 'Please select a subject',
                    }}
                    render={({ field }) => (
                      <div>
                        <Select variant="standard" sx={{minWidth: 160}} {...field}>
                          {allotedCourses?allotedCourses?.map(allotedCourse=><MenuItem key={allotedCourse?._id} value={allotedCourse?._id}>
                              {allotedCourse?.Semester +' ' + allotedCourse?.subject}
                            </MenuItem>):<MenuItem key={1} value={undefined}>
                              No course authorised
                            </MenuItem>}
                        </Select><br />
                        {errors.SubjectId && (
                          <span style={{ color: 'red', fontSize: '12px' }}>
                            {errors.SubjectId.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </div>

              <div style={{marginLeft:'20px'}}>
                <Input type='number' {...register('Internal', {required:'Internal marks required', max: {value: 10,message: 'Internal marks cannot exceed 10'}})} disabled={false} placeholder="Internal" /><br/>
                {errors.Internal&& <span style={{color:'red',fontSize:'10px'}}>{errors.Internal.message}</span>}
                
              </div>

            </div><br />
          
            <div style={{display:'flex'}}>
          
              <div>
                <Input type='number' {...register('Theory',{required:'Theory marks required',max: {value: 40,message: 'Theory marks cannot exceed 40'}})} disabled={false} placeholder="Theory" /><br/>
                {errors.Theory&& <span style={{color:'red',fontSize:'10px'}}>{errors.Theory.message}</span>}
              </div>

              <div style={{marginLeft:'20px'}}>
                <Input type='number' {...register('Practical',{required:'Practical marks required',max: {value: 30,message: 'Practical marks cannot exceed 30'}})} disabled={false} placeholder="Practical" /><br/>
                {errors.Practical&& <span style={{color:'red',fontSize:'10px'}}>{errors.Practical.message}</span>}
                
              </div>

              <Button style={{marginLeft:'20px'}} type='submit' variant="contained" size="small">
            
                submit
            
              </Button>

            </div>

          </form>
        </div>
        </ITEM>

        {!state?.roll&&students&&<div style={{width:'500px',padding:'1px',marginLeft:'10px'}}>
            <StudentList Params={Params} setParams={setParams} students={students?.studentData} rollNumber={rollNumber} setRollNumber={setRollNumber}/>
        </div>}

      </div>

    </div>
  )
}

export default AddResult