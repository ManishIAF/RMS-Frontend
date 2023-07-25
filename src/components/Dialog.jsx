import React,{useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SubjectSelect from './SubjectSelect';

const DialogComp = ({setOptionsParams,addCourses,open,options,profId,setOpen}) => {

  const [subjectId, setSubjectId] = useState(options[0]?._id);
  const [alert,setAlert] = useState(undefined)

  const onSubmit = (e)=>{
    e.preventDefault();

    const data = {subjectId,profId}

    const token = localStorage.getItem('token');

    axios.post('/api/course',
    data,
    {
      "Content-Type":"application/json",
      withCredentials:true,
      headers:{
        "Authorization" : `Bearer ${token}`
      }
    }).then((response)=>{

      setOptionsParams({})
      addCourses(prevCourses =>prevCourses&&[...prevCourses,response?.data?.addedData]);
      setAlert(response?.data?.msg)
    
    }).catch((error)=>{

      setAlert(error?.response?.data)
  
    });

  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        open={open}
        onClose={()=>setOpen(!open)}
      >
        <DialogTitle>Subject</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {alert?<p style={{color:'green'}}>{alert}</p>:<p style={{color:'gray'}}>Allot Subject to professor</p>}           
          </DialogContentText>
            <form onSubmit={onSubmit}>

              <SubjectSelect m={1} mw={160} ml={30} options={options} subjectId={subjectId} setSubjectId={setSubjectId} setAlert={setAlert} />
              
              <DialogActions style={{display:'flex',gap:'20px'}}>
                <Button onClick={()=>setOpen(!open)}>Close</Button>
                <Button type='submit' variant="contained">Allot</Button>
              </DialogActions>
            </form>
        </DialogContent>
        
      </Dialog>
    </React.Fragment>
  );
}

export default DialogComp;