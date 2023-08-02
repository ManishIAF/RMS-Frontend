import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import useFetch from '../hooks/fetch.hook'

import Select from '../components/Select';
import Progress from '../components/Progress'
import logo from '../assates/collegeLogo.jpg'
import Image from '../components/Image'

const StudentResult = ()=>{

    const { state: { id, Semester } } = useLocation();
    const [{ apiData }, setData, setParams] = useFetch('students/getone');
    const [{ apiData: result }, /*setResultData*/, setResultParams] = useFetch('students/studentResult');
    const [selectedSemester, setSelection] = useState(Semester);
    
    useEffect(() => {
      if (id) {
        setParams({ id: id });
        setResultParams({ id: id });
      }
    
      if (!id) {
        console.log('without id called');
        const token = localStorage.getItem('token');
        axios.get('/api/students/getone', {
          "Content-Type": "application/json", 
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then((response) => {
          setData({ apiData: response?.data });
        });
      }
    
      if (selectedSemester != null) {
        setResultParams((prevVal) => { return { ...prevVal, semester: selectedSemester } });
      }
    }, [id, selectedSemester, setData, setParams, setResultParams]);
    


    return (
        <div style={{display:'grid',marginLeft:'200px',gridTemplateColumns:'3fr 1fr'}} >
            <div>
                <div style={{display:'grid',rowGap:'5px',marginTop:'10px',gridTemplateRows:'1fr 1fr 1fr',gridTemplateColumns:'1fr 1fr 1fr 1fr'}}>
                    
                    {result?.Data?.map((eachStudentData)=>(<div key={eachStudentData?._id}>
                        <strong>{eachStudentData?.subject}</strong>
                        <Progress color={(eachStudentData?.status === 'Pass')?'success':'error'} value={eachStudentData?.Percentage} width='50%'/>
                    </div>))}
                    
                    {result?.AgregatePercentage&&<div>
                        <strong>Agregate Percentage</strong>
                        <Progress color={result?.AgregatePercentage > 40 ? 'success' : 'error'} value={result?.AgregatePercentage} width='50%'/>
                    </div>}
                    
                </div>
                <div style={{border:'1px solid black',minWidth:'700px',width:'auto',backgroundColor:'white'}}>
                    <div style={{display:"flex",marginBottom:'20px',backgroundColor:'white',marginTop:'10px',borderBottom:'1px solid black'}}>
          
                        <div style={{marginLeft:'10px',marginRight:'20px'}}>
                            <Image Image={logo} width='60px' imageRadius='10%' />
                        </div>

                        <div style={{borderRight:'3px solid black'}}></div>

                        <div style={{marginLeft:'30px',marginBottom:'10px'}}>
                            <Image Image={apiData?.profile} alt='student' width='60px' imageRadius='50%'/>
                        </div>

                        <div style={{display:'flex',marginTop:'10px',marginLeft:'30px'}}>
                            <div>
                                <p><strong>Name :</strong> {apiData?.firstName + ' ' + apiData?.lastName}</p>
                                <p><strong>Semester :</strong> {selectedSemester}</p>
                            </div>
                            <div style={{marginLeft:'30px'}}>
                                <p><strong>Roll Number :</strong> {apiData?.Roll_Number}</p>
                                <p><strong>Registration Number :</strong> {apiData?.Regitration_Number}</p>
                            </div>
                        </div>

                    </div>

                    <div style={{marginLeft:'10px',marginRight:'10px'}}>

                    {result?.Data?.length>0?<table style={{marginTop:'20px',minWidth:'600px',width:'auto',minHeight:'200px',height:'auto',backgroundColor:'white'}}>
                            <thead style={{color:'gray'}}>
                                <td style={{textAlign:'left'}}>
                                    Subject
                                </td>
                                <td>
                                    Subject Code
                                </td>
                                <td>
                                    Internal
                                </td>
                                <td>
                                    Theory
                                </td>
                                <td>
                                    Practical
                                </td>
                                <td>
                                    Total
                                </td>
                                <td>
                                    Remarks
                                </td>
                            </thead>
                            
                            <tbody>
                                {result?.Data?.map((eachSubject,index)=>{
                        
                                    return(<tr key={index}>
                                        <td style={{textAlign:'left'}}>
                                            {eachSubject?.subject}
                                        </td>
                                        <td>
                                            {eachSubject?.SubjectCode}
                                        </td>
                                        <td>
                                            {eachSubject?.Internal}
                                        </td>
                                        <td>
                                            {eachSubject?.Theory}
                                        </td>
                                        <td>
                                            {eachSubject?.Practical}
                                        </td>
                                        <td>
                                            {eachSubject?.Total}
                                        </td>
                                        <td>
                                            {eachSubject?.status}
                                        </td>
                                    </tr>)})}
                                    <tr>
                                        <td></td><td></td><td></td><td></td><td>Aggregate Marks</td><td>{result?.Agregate}</td>
                                    </tr>
                            </tbody>
                        </table>:<strong><p style={{marginLeft:'250px',marginBottom:'20px'}}>Data not available</p></strong>}

                    </div>
                </div>
            </div>
            <div style={{marginLeft:'100px',marginTop:'10px'}}>
                <Select options = {[
            
                    {selectionText : "Semester 1" , value:1},
                    {selectionText : "Semester 2" , value:2},
                    {selectionText : "Semester 3" , value:3},
                    {selectionText : "Semester 4" , value:4},

                ]}

                    fun={setSelection}
                    selectedValue={selectedSemester}

                />
            </div>
        </div>
    )

}

export default StudentResult;