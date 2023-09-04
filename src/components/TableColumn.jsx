import React from 'react'
import { Typography } from '@mui/material';

const TableColumn = ({columnData}) => {


  return (
      <thead>
    
        <tr>
            {columnData?.map((datum,index)=>(
              <th key={index}>
                <Typography variant="overline" gutterBottom><strong>{datum}</strong></Typography>
              </th>
            ))}
                
        </tr>

      </thead>
  )
}

export default TableColumn