import React from 'react'

import Input from '@mui/material/Input';

const Input1 = ({type,disabled,placeholder,defaultValue,fun})=> {
  return (
    <div>
      <Input type={type} defaultValue={defaultValue} disabled={disabled} 
      
        placeholder={placeholder} onChange={fun}/>
    </div>
  )
}

export default Input1;