import React,{useState} from 'react';
import routes from '../helper/routes'
import { NavLink,useNavigate} from 'react-router-dom';
import {FaAngleDoubleLeft,FaAngleDoubleRight} from 'react-icons/fa';
import { Typography } from '@mui/material';
import Image from './Image';
import '../styles/sideBar.css'
import ToolTipComponent from '../components/ToolTipComponent';


const Sidebar = ({apiData})=>{

    const [isOpen,setOpen] = useState(true);
    const Navigate = useNavigate()


    const toggle = ()=> setOpen(!isOpen);

    const AuthorisedRoutes = routes?.map((route)=>{
        let authRouting
        if(route?.accessLevel?.includes(apiData?.auth)&&route?.show === 'sidebar'){
            authRouting = {path:route?.path,name:route?.name,icon:route?.icon}
        }
        return authRouting; 
    }).filter((route) => route !== undefined);

    return(
 
        <div style={{overflow:'auto',background: 'rgb(0, 7, 61)',color: 'white',height:'100vh',width:isOpen?'180px':'50px'}}>

            <div>

                <div className="top_section">
                    {isOpen&&<div className='logo'>
                        <div onClick={()=>Navigate('/admin/profile')} style={{display:'flex'}}>
                            <Image Image={apiData?.profile} width='40px' />
                            <Typography style={{marginLeft:'5px',marginTop:'5px'}} variant="overline">
                                {`Hii ${apiData?.firstName?apiData?.firstName:apiData?.username}`}
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

        </div>

    )

}

export default Sidebar;