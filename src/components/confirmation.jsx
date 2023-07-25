import React,{useState} from 'react';

import { useForm} from "react-hook-form";

import Alert from './Alert'

import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';


const Confirm = ({setConfirmation,openConfirmation,handleUserDelete})=>{

    const {register, handleSubmit, /*, formState: { errors }*/} = useForm();
    const [alert,setAlert] = useState({});


    const handleValidation = (data,event)=>{

        event.preventDefault()
        const {enteredUsername}=data;

        console.log('formData : ',enteredUsername)

        if(enteredUsername !== openConfirmation?.username){
          return setAlert({message:'entered username not matched',variant:'error'})
        }
        
        if(enteredUsername === openConfirmation?.username){
            
            return handleUserDelete(event);
    
        }

    }

    return(
        <div style={{position:'fixed',width:'100%',top:'0',left:'0',right:'0',bottom:'0',background:'rgba(0,0,0,.85)',zIndex:'10000'}}>
        
            {alert?.message&&<Alert alert={alert}/>}
            
            <div style={{minWidth:'35%',width:'auto',background:'white',left:'35%',top:'35%',padding:'15px',marginleft:'1%',border:'1px solid #ccc',borderRadius:'10px',position:'absolute',boxShadow:'5px 5px 5px #000',zIndex:'10001'}}>
                <div style={{float:'right'}}>
                    <CloseIcon style={{cursor:'pointer',color:'blue'}} onClick={()=>setConfirmation({})}/>
                </div>
                <div>
                    <p>Type <strong style={{color:'green'}}>{openConfirmation.username}</strong> to confirm</p>
                </div>
                <form onSubmit={handleSubmit(handleValidation)} style={{display:'flex',alignContent:'center',marginTop:'20px'}}>
                    <TextField type='text' style={{width:'90%'}} {...register('enteredUsername',{required:true})} size="small" id="outlined-size-small" label="confirm name" />
                    <Button type="submit" variant="contained" size="small" style={{marginLeft:"10px"}}>Confirm</Button>
                </form>
                <p style={{marginTop:'10px',color:'red'}}>
                    <strong style={{color:'black',textDecoration:'underline'}}>Note</strong> :- Deleting user will delete all the information related to <br /> 
                    user including his authentication
                </p>

            </div>
        </div>
    )
}


export default Confirm;