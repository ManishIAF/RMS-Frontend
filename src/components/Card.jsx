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

  //   <div className="container">

  //   <div className="card">
  //     <div className="content">
  //       <div>
  //         <Image width='100px' Image="https://unsplash.it/200/200" alt="profile" />
  //       </div>
  //       <div className="cardContent">
  //         <h3>
  //           Luis Molina<br />
  //           <span>Web Developer</span>
  //         </h3>
  //       </div>
  //     </div>
  //     <ul className="sci">
  //       <li style={{ '--i': 1 }}>
  //         <a href="./">
  //           <i className="fa fa-facebook" aria-hidden="true"></i>
  //         </a>
  //       </li>
  //       <li style={{ '--i': 2 }}>
  //         <a href="./">
  //           <i className="fa fa-instagram" aria-hidden="true"></i>
  //         </a>
  //       </li>
  //       <li style={{ '--i': 3 }}>
  //         <a href="./">
  //           <i className="fa fa-github" aria-hidden="true"></i>
  //         </a>
  //       </li>
  //     </ul>
  //   </div>
  //   {/* Add more card components here */}
  // </div>

        <div id='cardData' className='Card'>
          <Dot vertical='top' horizontal={Autherization?.auth === 'high'?'left':'right'} color={status}>  
            <div className='CardContainer'>
                <div style={{display:'flex'}}>
                  <div title='view profile' onClick={()=>Navigate('/admin/studentprofile',{state:{Id:_id}})}style={{marginTop:'10px',marginLeft:'50px'}}>
                    <Image Image={profile} alt='student' width='50px'/>
                  </div> 
                  {Autherization?.auth === 'high'&&
                    <small style={{marginTop:'3px',marginLeft:'15px'}}>
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
                    </small>}
                </div>

                <div className='cardInfo'>
                  <div>
                    <small><strong>Name : </strong><strong>{firstName + ' ' + lastName}</strong></small><br />
                    <small><strong>Dept. : {department}</strong></small><br />
                    <small><strong>Roll No : {Roll_Number}</strong></small><br />
                    <small><strong>Semester : {Semester}</strong></small><br />
                  </div>
                  <ul style={{marginTop:'10px',listStyleType:'none'}}>
                    <li style={{float:'right',backgroundColor:'whitesmoke',marginBottom:'20px',marginRight:'5px',width:'40px',heigth:'10px',borderRadius:'3px solid'}}>
                      <ToolTipComponent
                        title='view profile' 
                        fun={()=>{
                          Navigate('/admin/studentprofile',{state:{Id:_id}})
                        }}
                        content={<VisibilityIcon style={{color:'#35d8ac',fontSize:'20px'}} />}
                      />
                    </li>
                    <li style={{float:'right'}}>
                      {!status&&<ToolTipComponent
                        title='add result' 
                        fun={()=>{
                          Navigate('/admin/addResult',{state:{roll:Roll_Number}})
                        }}
                        content={<NoteAddIcon style={{color:'#35d8ac',fontSize:'20px'}} />}
                      />}
                    </li>
                  </ul>
              </div>
            </div>
          </Dot>
        </div>
  )
}
export default Card1