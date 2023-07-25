import React from 'react'
import Select1 from '@mui/material/Select'
import { MenuItem } from '@mui/material'
// import InputLabel from '@mui/material/InputLabel';
import '../styles/Select.css'

function Select({options,fun,selectedValue}) {

  return (
        
        <div>
          <Select1 
            sx={{ m: 1, minWidth: 120 }}
            variant="standard" 
            labelId="demo-simple-select-standard-label" 
            id="demo-simple-select-standard" 
            value={selectedValue} 
            onChange={(event)=>fun(event.target.value)}
          >
          
            {options.map((opt)=> <MenuItem key={opt.value} value={opt.value}>{opt.selectionText}</MenuItem>)}
          
          </Select1>
        
        </div>
  
  ) 
}

export default Select