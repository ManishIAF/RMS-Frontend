import React, { useState,useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
// import Button from '@mui/material/Button';
// import { SnackbarProvider, useSnackbar } from 'notistack';

// function MyApp({message,variant}) {

//   const { enqueueSnackbar } = useSnackbar();

//   const handleCall = ()=>{

//     enqueueSnackbar(message, { variant:variant })


//   }


//   return <>{handleCall()}</>


// }

export default function Alerting({alert}) {

  const [open,setOpen] = useState(false)

  useEffect(()=>{

    setOpen(true)

  },[alert])

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={() => setOpen(false)}>
      <Alert severity={alert?.variant} onClose={() => setOpen(false)}>
        {alert?.message}
      </Alert>
    </Snackbar>
  );
}




