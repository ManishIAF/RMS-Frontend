import React from 'react'

import { useLocation,useNavigate } from 'react-router-dom'

import Image from '../components/Image';

import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import useFetch from '../hooks/fetch.hook'


function StudentProfile() {

  const navigate = useNavigate()

  const {state} = useLocation()
  const [{apiData}] = useFetch(`studentprofile/${state?.Id}`,{skip:!state?.Id})

console.log('apiData : ',apiData);
  return (
    <div style={{marginTop:'20px',width:'auto',overflow: 'auto'}}>
        <Accordion style={{width:'1100px'}}>
          
          <AccordionDetails>
            <div style={{display:'flex'}}>
              <Typography>
                <Image Image={apiData?.profile} width='50px' />
              </Typography>
              <Typography style={{marginTop:'10px',marginLeft:'50px'}}>
                I am <strong>{apiData?.firstName + ' ' + apiData?.lastName}</strong>
              </Typography>
              <Typography style={{marginTop:'10px',marginLeft:'50px'}}>
                <strong>E-mail : </strong> {apiData?.email}
              </Typography>
              <Typography style={{marginLeft:'330px',marginTop:'10px'}}>
                <Button variant="contained" size='small' onClick={()=>navigate('/admin/StudentResult',{state:{id:apiData?._id,Semester:apiData?.Semester}})}>
                  See Result
                </Button>
              </Typography>
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
              <strong>Student Basic Information</strong>
            </Typography>
        
          </AccordionSummary>
        
          <AccordionDetails>
            <div style={{display:'flex'}}>
              
              <div>

                <Typography>
                  Department : {apiData?.department}
                </Typography>

                <Typography>  
                  Roll Number : {apiData?.Roll_Number}
                </Typography>
            
              </div>

              <div style={{marginLeft:'80px'}}>

                <Typography>
                  Registration Number : {apiData?.Registration_Number}
                </Typography>

                <Typography>
                  Semester : {apiData?.Semester}
                </Typography>

              </div>
            
            </div>
          </AccordionDetails>
        
        </Accordion>
        {apiData?.contact&&<Accordion>
          
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
            <div>

              <div style={{display:'flex'}}>
                <Typography style={{color:'gray'}}>
                  <strong>{apiData?.contact?.address?.Street}</strong>
                </Typography>
                <Typography style={{marginLeft:'30px',color:'gray'}}>
                  <strong>{apiData?.contact?.address?.City}</strong>
                </Typography>
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
            </div>
          </AccordionDetails>
        
        </Accordion>}
        
    </div>
  )
}

export default StudentProfile