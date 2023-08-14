import React from 'react'
import Select1 from '@mui/material/Select'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from '@mui/material'
import '../styles/Select.css'

function Select({defaultchoice,options,fun,selectedValue}) {

  return (
        
        <FormControl variant="standard" sx={{minWidth: 120 }}>
          <InputLabel id="demo-multiple-name-label">Semester</InputLabel>
          <Select1 
            variant="standard" 
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard" 
            value={selectedValue} 
            onChange={(event)=>fun(event.target.value)}
            label="Semester"
          >
            {defaultchoice&&
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>}
              {options.map((opt)=> <MenuItem key={opt.value} value={opt.value}>{opt.selectionText}</MenuItem>)
            }
          
          </Select1>
        
        </FormControl>
  
  ) 
}

export default Select