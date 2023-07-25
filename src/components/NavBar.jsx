import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dot from './Dot';
import ToolTipComponent from '../components/ToolTipComponent';
import Image from '../components/Image'


function Navbar({apiData}) {

    const Navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

    const handleLogOut = ()=>{

        
        localStorage.removeItem('token');
        Navigate('/')

    }

  return (

    <div style={{backgroundColor:'#1234',width:'100%' , height:'65px'}} >

        <div style={{display:'flex',float:'right'}}>
            <div >
                    <ToolTipComponent title={`Hii,${apiData?.firstName||apiData?.username}`} fun={handleOpenUserMenu} content={

                      <Dot defColor={true}><Image Image={apiData?.profile||''} alt='student' width='50px'/></Dot>
                        
                    }/>


                <Menu
                    sx={{ mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                
                    {/* {settings.map((setting) => ( */}
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography onClick={handleLogOut} textAlign="center">LogOut</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography onClick={()=>Navigate('/admin/profile')} textAlign="center">Profile</Typography>
                        </MenuItem>
                    {/* // ))} */}
                
                </Menu>


            </div>
        </div>
    
    </div>
  )
}

export default Navbar