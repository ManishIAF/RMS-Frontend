import React from 'react'
import {useNavigate} from 'react-router-dom'
import ToolTipComponent from './ToolTipComponent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreButton from '../components/MoreButton' ;
import '../styles/Card.css'
import Image from './Image'
import Dot from './Dot';
import {AiOutlineEdit} from 'react-icons/ai'
import VisibilityIcon from '@mui/icons-material/Visibility';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewListIcon from '@mui/icons-material/ViewList';


const Card1 =({datum,Autherization,setConfirmation})=>{
  const Navigate = useNavigate()
  const {_id,profile,firstName,lastName,Roll_Number,department,Semester,status} = datum;

  return (
    <Dot vertical='top' horizontal={Autherization?.auth === 'high'?'left':'right'} color={status}>
      <div class="container">
        <div class="card">
          <div style={{display:'flex'}}>
            <div class="imgBx" title='view profile' onClick={()=>Navigate('/admin/studentprofile',{state:{Id:_id}})}>
              <Image Image={profile} alt='student' width='50px'/>
            </div>
            {Autherization?.auth === 'high'&&
              <small style={{marginTop:'15px',marginLeft:'150px'}}>
                <MoreButton onClick={(event)=>event.stopPropagation()} title='More' Icon={<MoreVertIcon style={{color:'none',background:'none'}} />} options={[
                  {
                    name:'view result',
                    Icon:<ViewListIcon style={{width:'15px' , color:'green'}} />,
                    fun:()=>{Navigate('/admin/StudentResult',{state:{id:_id,Semester:Semester}})}
                  },
                  {
                    name:'Edit',
                    Icon:<AiOutlineEdit style={{width:'15px' , color:'green'}}/>,
                    fun:()=>{Navigate(`/admin/editStudent/${_id}`)}
                  },
                  {
                    name:'Delete',
                    Icon:<DeleteIcon style={{width:'15px' , color:'red'}} />,
                    fun:()=>{setConfirmation({username:`${firstName + ' ' + lastName}`,userId:_id})}
                  }
                
                ]}/>
              </small>
            }
          </div>
          <div class="contentBx">
            <h3>{`${firstName} ${lastName}`}</h3>
            <h6>Roll Number : {Roll_Number}</h6>
            <h6>{department}</h6>
            <h6>Semester : {Semester}</h6>

            <div class="size">
              <span>
                <ToolTipComponent
                  title='view profile' 
                  fun={()=>{
                    Navigate('/admin/studentprofile',{state:{Id:_id}})
                  }}
                  content={<VisibilityIcon style={{fontSize:'20px'}} />}
                />
              </span>
              <span>
                {!status&&<ToolTipComponent
                  title='add result' 
                  fun={()=>{
                    Navigate('/admin/addResult',{state:{roll:Roll_Number}})
                  }}
                  content={<NoteAddIcon style={{fontSize:'20px'}} />}
                />}
              </span>
            </div>
            {/* <Link to="">View Profile</Link> */}
          </div>
        </div>
      </div>
    </Dot>     
  )
}
export default Card1