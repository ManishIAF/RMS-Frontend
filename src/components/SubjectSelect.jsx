import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SubjectSelect({m,mw,ml,dfv,setSubjectId,subjectId,options,il,setAlert}) {

  const chooseSubject = (event) => {
    
    event.preventDefault();
    setAlert(undefined)
    setSubjectId(event.target.value);
  
  };

  return (
    <div>
          {il&&<InputLabel sx={{m:1,ml:30 }} >Subject</InputLabel>}
              <Select
                autoFocus
                value={subjectId}
                defaultValue={dfv}
                sx={{ m: m, minWidth: mw,ml:ml }}
                variant="standard"
                onChange={chooseSubject}
              >

                {options?.map((course)=>(

                  <MenuItem key={course?._id} value={course?._id}><div style={{display:'flex'}}>
                    <p>{course?.Semester} {course?.subject}</p>
                    <div>
                      {course?.professorId?<CheckCircleIcon style={{marginLeft:'10px',marginTop:'5px',color:'green',fontSize:'15px'}} />:<HighlightOffIcon style={{marginLeft:'10px',marginTop:'5px',color:'red',fontSize:'15px'}} />}</div>
                    </div>
                  </MenuItem>

                ))}
              
              </Select>
    </div>
  )
}

export default SubjectSelect