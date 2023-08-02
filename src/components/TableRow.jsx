import React from 'react'
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Typography } from '@mui/material';

import '../styles/table.css'
import Avatar from '../assates/profile.png'

import {AiOutlineEdit} from 'react-icons/ai'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreButton from './MoreButton';



function TableRow({rowsData,handleDelete}) {

  const Navigate = useNavigate()

  return (
    <tbody className='TableBody'>
    {rowsData.map(({_id:ResultId,Roll_Number,profile,firstName,lastName,studentInfoId,Internal,Practical,Semester,subject,Theory,Total})=>(
        <tr key={ResultId}>
            <td >
              <img onClick={()=>Navigate('/admin/studentprofile',{state:{Id:studentInfoId}})} src={profile|| Avatar} alt='student' style={{width:'40px',borderRadius:'50%'}}/>
            </td>
            <td >
              <Typography variant="overline" gutterBottom>{firstName + ' ' + lastName}</Typography>
            </td>
            <td>
              <Typography variant="overline" gutterBottom>{Roll_Number}</Typography>
            </td>
            <td>
              <Typography variant="overline" gutterBottom>{Semester}</Typography>
            </td>
            <td>
              <Typography variant="overline" gutterBottom>{subject}</Typography>
            </td>
            <td>
              <Typography variant="overline" gutterBottom>{Internal}</Typography>
            </td>
            <td>
              <Typography variant="overline" gutterBottom>{Theory}</Typography>
            </td>
            <td>
              <Typography variant="overline" gutterBottom>{Practical}</Typography>
            </td>
            <td>
              <Typography variant="overline" gutterBottom>{Total}</Typography>
            </td>
            <td>
              <MoreButton title='Edit or Remove' Icon={<MoreVertIcon style={{color:'none',background:'none'}} />} options={[
                {
                  name:'Edit',
                  Icon:<AiOutlineEdit style={{width:'15px' , color:'green'}}/>,
                  fun:()=>{Navigate('/admin/editResult',{state:{ResultId:ResultId}})}
                },
                {
                  name:'Delete',
                  Icon:<DeleteIcon style={{width:'15px' , color:'red'}} />,
                  fun:()=>{handleDelete(ResultId)}
                }
              ]} />
            </td>
            
        </tr>
            ))
          }
    
    </tbody>
  )
}

export default TableRow