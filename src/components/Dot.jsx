import React from 'react'

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme,col,defaultcolor }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: (()=>{
        if(defaultcolor)return '#44b700'
        if(!defaultcolor){
          return col==='true' ?'#44b700':'red'
        }
      })(), 
      color:(()=>{
        if(defaultcolor)return '#44b700'
        if(!defaultcolor){
          return col==='true' ?'#44b700':'red'
        }
      })(),
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(0.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

function Dot({children,vertical,color,defColor,horizontal}) {
  return (
    <StyledBadge col={color?.toString()} defaultcolor={defColor?.toString()} overlap="circular" variant="dot" anchorOrigin={{ vertical: vertical || 'bottom', horizontal: horizontal || 'right' }}>
        {children}
    </StyledBadge>
  )
}

export default Dot