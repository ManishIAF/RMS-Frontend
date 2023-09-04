import React,{useEffect,useState} from 'react'
import { useForm} from "react-hook-form";
import axios from 'axios'
import Image from '../components/Image';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alerting from '../components/Alert'
import ToolTipComponent from '../components/ToolTipComponent';
import convertToBase64 from '../helper/convert';

import useFetch from '../hooks/fetch.hook'
import AllotedCourses from '../components/allotedCourses';


function Profile() {

  const [file,setFile] = useState()
  const [{apiData},,setParams] = useFetch('profile');
  const [edit,setEdit] = useState(false)
  const [alert,setAlert] = useState({});
  const {register, handleSubmit,setValue,formState: { errors }} = useForm()

  useEffect(() => {
    if (apiData?.contact) {
      setValue('Street', apiData.contact.address.Street);
      setValue('City', apiData.contact.address.City);
      setValue('State', apiData.contact.address.State);
      setValue('pinCode', apiData.contact.address.pinCode);
      setValue('District', apiData.contact.address.District);
      setValue('Mobile', apiData.contact.Mobile);
    }
  }, [apiData,setValue]);

  const onSubmit = (data,event) => {

    event.preventDefault();
    
    const {Street,City,State,pinCode,District,Mobile} = data;

    const Data = {

      userId:apiData?._id,
      Street:Street,
      City:City,
      State:State,
      pinCode:Number(pinCode),
      District:District,
      Mobile:Number(Mobile),

    }

    const token = localStorage.getItem('token');
    axios.post('/api/profile',
      Data,
      {
        "Content-Type":"application/json",
        withCredentials:true,
        headers:{
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  .then((response)=>{
    
      setParams({})
      setAlert({message:response.data,variant:'success'})

    }).catch((error)=>{

      setAlert({message:error.response.data,variant:'info'})
  
  });


  }

  const onEdit = (data,event)=>{

    event.preventDefault();

    const {Street,City,State,pinCode,District,Mobile} = data;
    
    let Data = {}

    if(file){

      Data={
        profile:file
      }
      setFile(null)
    }
    if(!file){
      Data = {

        profile:file,
        userId:apiData?._id,
        Street:Street,
        City:City,
        State:State,
        pinCode:Number(pinCode),
        District:District,
        Mobile:Number(Mobile),
      }
    }

    const token = localStorage.getItem('token');

    axios.put('/api/profile',
      Data,
      {
        "Content-Type":"application/json",
        withCredentials:true,
        headers:{
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  .then((response)=>{

      setEdit(false)
      setParams({})

      setAlert({message:response.data,variant:'success'})

    }).catch((error)=>{


      if(error.response.status === 401){
        setAlert({message:error.response.data,variant:'error'});
      }else{
        setAlert({message:error.response.data,variant:'info'})
      }

  
  });

}

const onUpload = async e =>{
  const base64 = await convertToBase64(e.target.files[0]);
  setFile(base64);
}

  return (
    <div style={{width:'100%',height:'100%',overflow: 'auto'}}>
      {alert?.message&&<Alerting alert={alert}/>}

        <Accordion>
          
          <AccordionDetails>
            <div style={{display:'flex'}}>
              <div>
                <ToolTipComponent
                  title={apiData?.profile ? 'update image':'upload image'}
                  content={
                    <div>
                      <label htmlFor='profile'>
                       <Image Image={file||apiData?.profile} width='50px' />
                      </label>
                      <input onChange={onUpload} type='file' id='profile' name='profile'/>
                    </div>
                  }
                />
              </div>
              <Typography style={{marginTop:'20px',marginLeft:'50px'}}>
                <strong>{apiData?.firstName + ' ' + apiData?.lastName}</strong>
              </Typography>
              <Typography style={{marginTop:'20px',marginLeft:'50px'}}>
                <strong>E-mail : </strong> {apiData?.email}
              </Typography>
                <Typography style={{marginTop:'20px',marginLeft:'50px'}}>
                  <strong>D.O.B : </strong>{apiData?.DOB?.split('T0')[0]}
                </Typography>
                <Typography style={{marginTop:'20px',marginLeft:'50px'}}>  
                  <strong>Gender : </strong>{apiData?.Gender}
                </Typography>
              
              {file&&<Button type='submit' onClick={(event)=>onEdit({},event)} style={{marginTop:'15px',marginLeft:'50px',height:'30px'}} variant="contained">Change</Button>}
              
            </div>
            
          </AccordionDetails>
        
        </Accordion>
      
        <Accordion>
          
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            
            <Typography>
              <strong>Basic Information</strong>
            </Typography>
        
          </AccordionSummary>
        
          <AccordionDetails>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gridTemplateRows:'1fr 1fr'}}>
              
                <Typography>
                  Department : {apiData?.department}
                </Typography>

                {apiData?.Roll_Number&&<Typography>  
                  Roll Number : {apiData?.Roll_Number}
                </Typography>}
            
                {apiData?.Registration_Number&&<Typography>
                  Registration Number : {apiData?.Registration_Number}
                </Typography>}

                {apiData?.Registration_Year&&<Typography>
                  Registration Year : {apiData?.Registration_Year}
                </Typography>}

                {apiData?.Semester&&<Typography>
                  Semester : {apiData?.Semester}
                </Typography>}

            </div>
          </AccordionDetails>
        
        </Accordion>
          {apiData?.courses&&<AllotedCourses Data={apiData?.courses} style={{width:'100%'}} />}
        <Accordion>
          
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            
            <Typography>
              <strong>Address</strong>
            </Typography>
        
          </AccordionSummary>

          <AccordionDetails>
            <div style={{display:'flex'}}>
              
              <div>

                  <div>
                  {(!apiData?.contact||edit)?<form>
                      
                      <div>
                        
                        <div style={{display:'flex'}}>
                          <div>
                            <TextField type='text' style={{width:'795px'}} {...register('Street',{required:'Please enter street and house number'})} id="standard-basic" label="Street/House Number" variant="standard" /><br/>
                            {errors.Street&&<span style={{fontSize:'12px',color:'red'}}>{errors.Street.message}</span>}
                          </div>
                          <div style={{marginLeft:'30px'}}>
                            <TextField type='text' {...register('City',{required:'Enter your city'})} id="standard-basic" label="City" variant="standard" /><br/>
                            {errors.City&&<span style={{fontSize:'12px',color:'red'}}>{errors.City.message}</span>}
                          </div>
                        </div>

                        <div style={{display:'flex',marginTop:'20px'}}>
                          <div>
                            <TextField type='text' id="standard-basic" {...register('State',{required:'Enter State name'})} label="State" variant="standard" /><br/>
                            {errors.State&&<span style={{fontSize:'12px',color:'red'}}>{errors.State.message}</span>}
                          </div>  
                          <div style={{marginLeft:'30px'}}>
                            <TextField type='number' {...register('pinCode',{required:'Pin number is required'})} id="standard-basic" label="Pin Code" variant="standard" /><br/>
                            {errors.pinCode&&<span style={{fontSize:'12px',color:'red'}}>{errors.pinCode.message}</span>}
                          </div>
                          <div style={{marginLeft:'30px'}}>
                            <TextField type='text' {...register('District',{required:'District name is required'})} id="standard-basic" label="District" variant="standard" /><br/>
                            {errors.District&&<span style={{fontSize:'12px',color:'red'}}>{errors.District.message}</span>}
                          </div>                  
                          <div style={{marginLeft:'30px'}}>
                            <TextField type='number' {...register('Mobile',{required:'Mobile name is required'})} id="standard-basic" label="Mobile Number" variant="standard" /><br/>
                            {errors.Mobile&&<span style={{fontSize:'12px',color:'red'}}>{errors.Mobile.message}</span>}
                          </div> 

                            {!apiData?.contact&&<Button type='submit' onClick={handleSubmit(onSubmit)} style={{marginLeft:'30px',marginTop:'10px'}} variant="contained">Add Info</Button>}
                            {apiData?.contact&&<Button type='submit' onClick={handleSubmit(onEdit)} style={{marginLeft:'30px',marginTop:'10px'}} variant="contained">Edit Info</Button>}

                        </div>
                      
                      </div>
                      
                    </form>
                    :
                    <div>

                      <div style={{display:'flex'}}>
                        <Typography style={{color:'gray'}}>
                          <strong>{apiData?.contact?.address?.Street}</strong>
                        </Typography>
                        <Typography style={{marginLeft:'30px',color:'gray'}}>
                          <strong>{apiData?.contact?.address?.City}</strong>
                        </Typography>
                        {apiData?.contact&&<IconButton title='edit info' style={{display:'flex',float:'right',marginLeft:'20px'}} onClick={()=>setEdit(true)} color="primary" aria-label="add to shopping cart">
                          <EditIcon style={{fontSize:'18px'}} />
                        </IconButton>}
                      </div>
                      <div style={{display:'flex'}}>
                        <Typography style={{color:'gray'}}>
                          <strong>{apiData?.contact?.address?.State}</strong>
                        </Typography>
                        <Typography style={{marginLeft:'30px',color:'gray'}}>
                          <strong>{apiData?.contact?.address?.pinCode}</strong>
                        </Typography>
                        <Typography style={{marginLeft:'30px',color:'gray'}}>
                          <strong>{apiData?.contact?.address?.District}</strong>
                        </Typography>
                        <Typography style={{marginLeft:'30px',color:'gray'}}>
                          <strong>{apiData?.contact?.Mobile}</strong>
                        </Typography>
                      </div>

                    </div>}
                  </div>
              </div>

            </div>
          </AccordionDetails>
        
        </Accordion>
        
    </div>
  )
}

export default Profile