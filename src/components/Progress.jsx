import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';

const Progress = (props)=>{

    return(
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width:props.width, mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(props.value,)}%`}
                </Typography>
            </Box>
        </Box>
    )

}

export default Progress;