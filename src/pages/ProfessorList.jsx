import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SpeedDialTooltipOpen from '../components/speedDial';
import {AiOutlineEdit} from 'react-icons/ai';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ToolTipComponent from '../components/ToolTipComponent';
import DialogComp from '../components/Dialog';
import Alert from '../components/Alert';
import Image from '../components/Image';
import useFetch from '../hooks/fetch.hook';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreButton from '../components/MoreButton' ;
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import '../styles/test.css';
import Confirm from '../components/confirmation';

function ProfessorList() {

    const navigate = useNavigate()
    const [open,setOpen] = useState(false)
    const [openConfirmation,setConfirmation] = useState({username:null,userId:null})
    const [activeIndex, setActiveIndex] = useState(null);
    const [{apiData},,setParams] = useFetch('professor');
    const [{apiData:options},,setOptionsParams] = useFetch('course')
    const [alert,setAlert] = useState({});
    const [courses,setCourses] = useState(null);

    const actions = [
        { icon: <ManageAccountsIcon />, name: 'Add_Student',fun:()=>navigate('/admin/addStudent')},
        { icon: <PersonAddIcon />, name: 'Add_Professor',fun:()=>navigate('/admin/addProfessor') },
      ];

    const handleClick = (courses,id)=>{

        setActiveIndex(id)

        if(courses?.length>=1){

           setCourses(courses);

        }
        if(courses?.length === 0){

            setCourses([]);

        }
        setParams({})
    }

   const handleUserDelete = (event)=>{
        event.preventDefault();

        const token = localStorage.getItem('token');
        axios.delete('/api/professor',{
            params:{id:openConfirmation?.userId},
            "Content-Type":"Application/json",
            withCredential:true,
            headers:{
                "Authorization": `Bearer ${token}`
            }

        }).then((response)=>{

            setConfirmation({})
            setParams({})
            setAlert({message:response.data,variant:'success'})
    
        })
   
    }

    const handleSubjectDelete = (courseId,professorId)=>{

        const data = {
 
            courseId:courseId,
            professorId:professorId
 
        }

        const token = localStorage.getItem('token');

        axios.delete('/api/course', {
            data: data,
            headers:{
                    
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            
            },
            withCredentials: true
        })
        .then(response => {
            // handle successful response
            if(response.status === 200){

                setOptionsParams({})
                setAlert({message:response.data,variant:'success'})
                setCourses(prevCourses => prevCourses?.filter(course => course._id !== courseId));

            }
        })
        .catch(error => {
            // handle error response
            setAlert({message:error.response.data,variant:'info'})

        });

    }

return (
    <div style={{display:'flex',width:'1150px',marginTop:'50px'}}>

        {alert?.message&&<Alert alert={alert}/>}

        {open&&<DialogComp setOptionsParams={setOptionsParams} addCourses={setCourses} open={open} options={options?options:[{_id:0,subject:'No subjects under you'}]} profId={activeIndex} setOpen={setOpen} />}
        {openConfirmation?.userId&&
            <Confirm setConfirmation={setConfirmation} openConfirmation={openConfirmation} handleUserDelete={handleUserDelete} />
        } 
        <div className="leaderboard">    
            <ul className="leaderboard__profiles">
                {apiData&&apiData?.map((profData)=>(
                            <li className="leaderboard__profile" key={profData?._id} style={{backgroundColor:activeIndex === profData?._id ? 'whitesmoke' :      'white'}} onClick={()=>handleClick(profData?.coursesId,profData?._id)} > 
                                <div>
                                    <Image Image={profData?.profile} width='50px' />
                                </div> 
                        
                                <div className="leaderboard__name" >
                                    <div>Prof. {profData?.firstName + ' ' + profData?.lastName}</div>
                                </div> 
                        
                                <div className="leaderboard__value" >
                                    <span>{profData?.department}</span>
                                </div>
                                <div>
                                    <MoreButton title='More' Icon={<MoreVertIcon style={{color:'none',background:'none'}} />} options={[
                                        {
                                            name:'Edit',
                                            Icon:<AiOutlineEdit style={{width:'15px' , color:'green'}}/>,
                                            fun:()=>{navigate(`/admin/editProfessor/${profData?._id}`)}
                                        },
                                        {
                                            name:'Add Course',
                                            Icon:<NoteAddIcon style={{width:'15px' , color:'green'}} />,
                                            fun:()=>{ 
                                                // event.stopPropagation();
                                                return setOpen(true)
                                            }
                                        },
                                        {
                                            name:'Delete',
                                            Icon:<DeleteIcon style={{width:'15px' , color:'red'}} />,
                                            fun:()=>{setConfirmation({username:`${profData?.firstName + ' ' + profData?.lastName}`,userId:profData?._id})/*handleUserDelete()*/}
                                        }
                                    ]} />
                                </div>

                            </li>
                ))}

            </ul>
    
        </div>

        <div>
            <div style={{marginLeft:'30px'}}>

                  <ol style={{listStyleType: 'none'}}>
                    {courses?.length >= 1 ?courses?.map((course)=>(
                        
                        <li key={course?._id} style={{backgroundColor:'whitesmoke',boxShadow: '0 7px 9px -1px rgba(51, 51, 51, 0.23)',borderRadius:'7px',marginTop:'10px',minWidth:'300px',width:'auto'}} >
                            
                            <div style={{display:'flex',marginLeft:'10px',marginTop:'10px'}}>
                                <div style={{color:'green'}}>Semester : {course?.Semester}</div>
                                <div style={{color:'green',marginLeft:'50px'}}>Course : {course?.name}</div>
                            </div>

                            <div style={{display:'flex' ,marginTop:'10px',marginLeft:'10px'}}>
                                <div style={{color:'green',marginTop:'5px'}}>Subject : {course?.subject}</div>
                                <div><ToolTipComponent fun={()=>handleSubjectDelete(course?._id,course?.professorId)} title='remove course' content={<DeleteIcon style={{fontSize:'medium',color:'red'}} />} /></div>
                            </div>

                        </li>

                    )):
                        activeIndex&&<li style={{backgroundColor:'whitesmoke',boxShadow: '0 7px 9px -1px rgba(51, 51, 51, 0.23)',borderRadius:'7px',marginTop:'10px',minWidth:'300px',width:'auto'}} >
                            
                            <div style={{display:'flex',marginLeft:'10px',marginTop:'10px'}}>
                                <div style={{color:'green'}}>You haven't alloted any course</div>
                            </div>

                        </li>
                    }
                </ol>

                {courses === null &&<div style={{margin:'10px',color:'green'}}>Please click on any professor to know alloted courses</div>}
            </div>
        
        </div>
        <SpeedDialTooltipOpen actions={actions} />
    </div>
)}

export default ProfessorList