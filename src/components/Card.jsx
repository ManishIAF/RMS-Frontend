import React from 'react'
import {useNavigate} from 'react-router-dom'
import ToolTipComponent from './ToolTipComponent';
import MoreButton from '../components/MoreButton' ;
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../styles/Card.css'
import Image from './Image'
import Dot from './Dot';
import {AiOutlineEdit} from 'react-icons/ai'
// import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewListIcon from '@mui/icons-material/ViewList';


const Card1 =({datum,Autherization,setConfirmation})=>{

  const Navigate = useNavigate()
  const {_id,profile,firstName,lastName,Roll_Number,department,Semester,status} = datum;

  return (
  
    <div className="container1">
      <Dot vertical='top' horizontal={Autherization === 'high'?'left':'right'} color={status}>
        <div className="card">
          <div className="imgBx">
            <Image Image={profile} alt='student' width='50px'/>
          </div>
          <div className="contentBx">
            <h3>{`${firstName} ${lastName}`}</h3>
            <h6 id='roll'>Roll Number : {Roll_Number}</h6>
            <h6>{department}</h6>
            <h6>Semester : {Semester}</h6>

            <div className="size">
              <span className='hover'>
                <ToolTipComponent
                  title='view Profile' 
                  fun={()=>{
                    Navigate('/admin/studentprofile',{state:{Id:_id}})
                  }}
                  content={<PersonIcon style={{fontSize:'16px',color:'white'}} />}
                />
              </span>
              {!status&&
                <span className='hover'>
                  <ToolTipComponent
                    title='add result' 
                    fun={()=>{
                      Navigate('/admin/addResult',{state:{roll:Roll_Number}})
                    }}
                    content={<NoteAddIcon style={{fontSize:'16px',color:'white'}} />}
                  />
                </span>
              }
              {Autherization === 'high'&&
                <span className='hover'>
                  <MoreButton onClick={(event)=>event.stopPropagation()} title='More' Icon={<MoreHorizIcon style={{fontSize:'16px',color:'white'}} />} options={[
                    {
                      name:'view result',
                      Icon:<ViewListIcon style={{width:'15px' , color:'green'}} />,
                      fun:()=>{Navigate('/admin/StudentResult',{state:{id:_id,Semester:Semester}})}
                    },
                    {
                      name:'Edit',
                      Icon:<AiOutlineEdit style={{width:'15px' , color:'green'}}/>,
                      fun:()=>{Navigate(`/admin/editStudent`,{state:{roll:Roll_Number}})}
                    },
                    {
                      name:'Delete',
                      Icon:<DeleteIcon style={{width:'15px' , color:'red'}} />,
                      fun:()=>{setConfirmation({username:`${firstName + ' ' + lastName}`,userId:_id})}
                    }
                  
                  ]}/>
                </span>
              }
            </div>
            {/* <Link to="">View Profile</Link> */}
          </div>
        </div>
        </Dot> 
      </div>    
  )
}
export default Card1