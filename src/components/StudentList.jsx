import React,{useEffect, useState} from 'react'
import ITEM from './Paper'
import Select from './Select';
import { Avatar, Typography } from '@mui/material';

import '../styles/table.css'

function StudentList({Params,setParams,students,rollNumber,setRollNumber}) {

  const [studentData,setStudentData] = useState(undefined);
  const [selectedSemester,setSelection]=useState('All');

  useEffect(() => {

    let filteredData = [];

    if (students) {

      filteredData = students.filter(student => student.status === false);

      if (JSON.stringify(filteredData) !== JSON.stringify(studentData)) {
        setStudentData(filteredData);
      }

      
    }
  
  
    if (selectedSemester !== 'All') {
      if (selectedSemester !== Params.semester) {
        setParams({ semester: selectedSemester });
      }
    } else {
      if (Params.semester !== undefined) {
        setParams({ semester: undefined });
      }
    }

  }, [students, selectedSemester,Params.semester, setParams, studentData, setStudentData,setRollNumber]);

  return (
    <div>

      <div style={{display:'flex',height:'60px',backgroundColor:'white',borderTopLeftRadius:'7px',borderTopRightRadius:'7px'}}>
        <div style={{marginTop:'20px',marginLeft:'10px'}}>
            Work Left
        </div>
        <div style={{marginLeft:'280px',marginBottom:'5px'}}>
            <Select options = {[
          
              {selectionText : "All Semester" , value:'All'},
              {selectionText : "Semester 1" , value: 1},
              {selectionText : "Semester 2" , value:2},
              {selectionText : "Semester 3" , value:3},
              {selectionText : "Semester 4" , value:4},

            ]}

            fun={setSelection}
            selectedValue={selectedSemester}

            />
        </div>
      </div>
      <ITEM>

        <div style={{height:'425px',transition:'0.3s' }} className='tableContent'>

          <table style={{width:'500px',borderCollapse: 'collapse'}} id="myTable">
  
            <thead className='TableHeader' style={{boxShadow: '0 7px 9px -1px rgba(51, 51, 51, 0.23)'}}>

              <tr>
      
                <th>
                  <Typography variant="overline" gutterBottom><strong>Image</strong></Typography>
                </th>
                
                <th>
                  <Typography variant="overline" gutterBottom><strong>Name</strong></Typography>
                </th>

                <th>
                  <Typography variant="overline" gutterBottom><strong>Roll Number</strong></Typography>
                </th>   
  
              </tr>

            </thead>
            <tbody className='TableBody'>
              {studentData?.length >= 1?studentData?.map(({_id,Roll_Number,profile,firstName,lastName})=>(
                  <tr onClick={()=>{setRollNumber(Roll_Number)}} style={{cursor: 'pointer',backgroundColor:rollNumber === Roll_Number ? 'whitesmoke' : 'white'}} key={_id}>
                    <td>
                      {profile?<img src={profile} alt='student' style={{width:'40px',borderRadius:'50%'}}/>:<Avatar/>}
                    </td>
                    <td>
                      <Typography variant="overline" gutterBottom>{firstName + ' ' + lastName}</Typography>
                    </td>
                    <td>
                      <Typography variant="overline" gutterBottom>{Roll_Number}</Typography>
                    </td>
                  </tr>
                )):<tr><td></td><td>work Done</td></tr>
              }

            </tbody>
          </table>
        </div>
          <ITEM height='40px'/>
            
      </ITEM>

    </div>
  )
}

export default StudentList