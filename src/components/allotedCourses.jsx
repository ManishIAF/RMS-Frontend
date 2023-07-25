import React from 'react'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useFetch from '../hooks/fetch.hook';

export default function AllotedCourses({setOpenStatus,openStatus}) {

  const [{apiData}] = useFetch('professor/course')
  // console.log('courseData : ',apiData);

  return (
        <Accordion onClick={()=>setOpenStatus(!openStatus)} style={{width:'1180px'}}>
          
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            
            <Typography>
              <strong style={{color:apiData?'green':'red'}}>ALLOTED SUBJECTS</strong>
            </Typography>
        
          </AccordionSummary>
        
          <AccordionDetails style={{display:'flex'}}>
              
            {apiData&&apiData?.map(({_id,Semester,department,subject})=>(
              <div key={_id} style={{marginLeft:'20px'}}>
              
                <Typography>
                  <small><strong>Department :</strong></small> <small style={{color:'gray'}}><strong>{department}</strong></small>
                </Typography>

                <Typography>  
                  <small><strong>Semester : </strong></small><small style={{color:'gray'}}><strong>{Semester}</strong></small>
                </Typography>

                <Typography>  
                <small><strong>Subject : </strong></small><small style={{color:'gray'}}><strong>{subject}</strong></small>
                </Typography>
              
              </div>
            ))}
            {!apiData && <div>
                <Typography style={{color:'green'}}>  
                  <small><strong> There is no subject alloted to you...! Please contect HOD for it.</strong></small>
                </Typography>
            </div>}
          </AccordionDetails>
        
        </Accordion>

  )
}
