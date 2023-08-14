import React from 'react'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AllotedCourses({Data,openStatus,setOpenStatus}) {

  return (
        <Accordion style={{width:'100%'}} onClick={()=>setOpenStatus(!openStatus)}>
          
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            
            <Typography>
              <strong style={{color:Data?'green':'red'}}>ALLOTED SUBJECTS</strong>
            </Typography>
        
          </AccordionSummary>
        
          <AccordionDetails style={{display:'flex'}}>
              
            {Data&&Data?.map(({_id,Semester,department,subject})=>(
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
            {!Data && <div>
                <Typography style={{color:'green'}}>  
                  <small><strong> There is no subject alloted to you...! Please contect HOD for it.</strong></small>
                </Typography>
            </div>}
          </AccordionDetails>
        
        </Accordion>

  )
}
