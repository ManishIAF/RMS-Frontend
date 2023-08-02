import React,{useState} from 'react';
import routes from '../helper/routes'
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink,useNavigate} from 'react-router-dom';
import {FaAngleDoubleLeft,FaAngleDoubleRight} from 'react-icons/fa';
import { Typography } from '@mui/material';
import Image from './Image';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import logo from '../assates/collegeLogo.jpg'
import '../styles/sideBar.css'
import ToolTipComponent from '../components/ToolTipComponent';


const Sidebar = ({apiData})=>{

    const [isOpen,setOpen] = useState(true);
    const Navigate = useNavigate()

    const toggle = ()=> setOpen(!isOpen);

    const handleLogOut = ()=>{

        
        localStorage.removeItem('token');
        Navigate('/')

    }

    const AuthorisedRoutes = routes?.map((route)=>{
        let authRouting
        if(route?.accessLevel?.includes(apiData?.auth)&&route?.show === 'sidebar'){
            authRouting = {path:route?.path,name:route?.name,icon:route?.icon}
        }
        return authRouting; 
    }).filter((route) => route !== undefined);

    return(
 
        <div style={{overflow:'auto',background: 'rgb(0, 7, 61)',color: 'white',height:'100vh',width:isOpen?'200px':'50px'}}>

            <div>

                <div className="top_section">
                    {isOpen&&<div className='logo'>
                        <div onClick={()=>Navigate('/admin')} style={{display:'flex'}}>
                            <Image Image={logo} width='40px' imageRadius='10%' />
                            <Typography style={{marginLeft:'10px',marginTop:'5px',fontSize:'15px'}} variant="overline">
                                WBSU
                            </Typography>
                        </div> 
                    </div>}
                    <div className="bars">
                        {isOpen?<ToolTipComponent fun={toggle} title='click to close' content={<FaAngleDoubleLeft style={{color:'white',fontSize:'medium'}}/>} /> :
                        <ToolTipComponent fun={toggle} title='click to open' content={<FaAngleDoubleRight style={{color:'white' ,fontSize:'medium'}} />}/>}
                    </div>
                </div>

                <section className='routes' style={{marginTop:'20px'}}>

                    {AuthorisedRoutes?.map((authorisedRoute)=>(

                        <NavLink to={authorisedRoute?.path} key={authorisedRoute?.name} className='link'>
                            <div className="icons">
                                {authorisedRoute?.icon}
                            </div>
                            <div>
                                {isOpen&&<div className="link-text">
                                        
                                        <Typography variant="overline" >{authorisedRoute?.name}</Typography>
                                
                                </div>}
                            </div>     
                        </NavLink>

                    ))}

                </section>

            </div>

            {isOpen&&<div style={{position:'absolute',bottom:'130px',marginLeft:'10px',width:'180px',height:'1px',backgroundColor:'white'}}></div>}
            
            {isOpen&&<div style={{display:'flex',position:'absolute',bottom:'60px',width:'200px',padding:'5px'}} >
                <div onClick={()=>Navigate('/admin/profile')} style={{display:'flex'}}>
                    <PermIdentityOutlinedIcon title='profile' style={{marginTop:'7px',cursor:'pointer'}} />
                    <Typography style={{marginLeft:'10px',marginTop:'5px'}} variant="overline">
                       <strong>{`Hii ${apiData?.firstName?apiData?.firstName:apiData?.username}`}</strong>
                    </Typography>
                </div> 
                <div title='log out' style={{marginTop:'10px',marginLeft:'10px'}} onClick={handleLogOut} >
                    <LogoutIcon style={{fontSize:'20px',cursor:'pointer'}} />
                </div>
            </div>}
            <div style={{display:'flex',position:'absolute',justifyContent:'center',color:'white',padding:'5px',textAlign:'center',bottom:'20px'}}>
                {isOpen&&<div style={{width:'180px',textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}} >
                    <strong title={apiData?.email} >{apiData?.email}</strong>
                </div>}
            </div>

        </div>

    )

}

export default Sidebar;