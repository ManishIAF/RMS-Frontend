import React,{useEffect, useState} from 'react'
import Input from '@mui/material/Input';
import {useLocation,useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Alerting from '../components/Alert'

import useFetch from '../hooks/fetch.hook';
import Button from '@mui/material/Button';

import Image from '../components/Image';
import axios from 'axios';
import ITEM from '../components/Paper';

const EditStudent = ()=> {
  const location = useLocation()
  const {state} = location
  const Navigate = useNavigate()
  const [alert,setAlert] = useState({});
  const [{apiData}] = useFetch(`result/${state?.ResultId}`,{skip:!state?.ResultId});
  const {register, handleSubmit,formState: { errors }} = useForm()

  useEffect(()=>{
    if(location.pathname === '/admin/editResult'){
      if(!state?.ResultId){
        return Navigate('../')
      }
    }
  },[Navigate,location.pathname,state?.ResultId])
  
  const onSubmit = (data) => {

    const {Internal,Theory,Practical} = data;

    const updatedData = {

      Internal:Number(Internal),
      Theory:Number(Theory),
      Practical:Number(Practical)


    }

    const token = localStorage.getItem('token');
    
    axios.patch(`/api/result/${state?.ResultId}`,updatedData,
      {
        "Content-Type":"application/json",
        withCredentials:true, 
        headers:{
          "Authorization" : `Bearer ${token}`
        }
      }).then((response)=>{
      
        setAlert({message:response.data,variant:'success'})
        setTimeout(() => {
          Navigate('/admin');

        }, 1000);
  
      
      }).catch((error)=>{
  
        setAlert({message:error.response.data,variant:'info'})
        
      })

  }


  return (

    <ITEM marginTop='80px' width='600px' height='400px' borderRadius='7px'>
      {alert?.message&&<Alerting alert={alert}/>}

          { apiData && <div style={{marginLeft:'15px',marginTop:'50px'}}>
          <div style={{display:'flex'}}>
          
          <div style={{marginTop:'40px'}}>
            <Image Image={apiData?.profile} alt='student' width='80px' imageRadius='50%'/>
          </div>

          
          <div style={{marginTop:'40px',marginLeft:'15px'}}>
          
            <p><strong>Name :</strong> {apiData?.firstName + ' ' + apiData?.lastName}</p>
            <p><strong>Roll Number :</strong> {apiData?.Roll_Number}</p>
            <p><strong>Registration Number :</strong> {apiData?.Regitration_Number}</p>
            <p><strong>Semester :</strong> {apiData?.currentSemester}</p>
          
          </div>

        </div>

          <form style={{marginTop:'20px'}} onSubmit={handleSubmit(onSubmit)}> 
            
              <div style={{display:'flex'}}>
              
                <div>
                  <Input disabled={true} type='text' {...register('Subject',{maxLength:100})} placeholder='Subject' defaultValue={apiData?.subject}/>
                  {errors.subject&&"error occ"}
                </div>
              
                <div style={{marginLeft:'20px'}}>
                  <Input disabled={true} type='number' {...register('Semester',{maxLength:10})} placeholder='Semester' defaultValue={apiData?.subjectSemester} />
                </div>
              
                <div style={{marginLeft:'20px'}}>
                  <Input type='number' {...register('Internal',{required:true,maxLength:10})} placeholder='Internal' defaultValue={apiData?.Internal} /><br />
                </div>
              
              </div><br />
              
              <div style={{display:'flex'}}>
            
                <div>
                  <Input type='number' {...register('Theory',{required:true,maxLength:10})} placeholder='Theory' defaultValue={apiData?.Theory} />
                </div>
            
                <div style={{marginLeft:'20px'}}>
                  <Input type='number' {...register('Practical',{required:true,maxLength:10})} placeholder='Practical' defaultValue={apiData?.Practical} />
                </div>
            
                <div>
                  <Button type='submit' variant="contained" size="small" style={{marginLeft:'20px'}}>
                    submit
                  </Button>
                </div>
            
            </div>

          </form>
      
      </div>}
    
    </ITEM>

  )

}


export default EditStudent;
