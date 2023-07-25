import React,{useState} from 'react'
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ToolTipComponent from './ToolTipComponent'

function MoreButton({options,Icon,title}) {

  const [anchorEl, setAnchorEl] = useState(null);
  
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

        <ToolTipComponent
            title={title}
            fun={handleClick}
            content={Icon}
        />
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
        
            {options.map((option,index)=>(<MenuItem key={index} onClick={()=>{handleClose(); option.fun()}}> <small>{option.Icon}</small> <small style={{marginLeft:'10px'}}>{option.name}</small></MenuItem>))}
        
        </Menu>

    </div>
  )
}

export default MoreButton