import React from 'react'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function ToolTipComponent({title,content,fun}) {
  return (
    <Tooltip style={{background:'none',backgroundColor:'none'}} title={title} arrow>
      <IconButton style={{background:'none',backgroundColor:'none'}} onClick={fun}>
        {content}
      </IconButton>
    </Tooltip>
  )
}

export default ToolTipComponent