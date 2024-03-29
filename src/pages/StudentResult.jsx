import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import useFetch from '../hooks/fetch.hook'

import ITEM from '../components/Paper';
import Select from '../components/Select';
import Progress from '../components/Progress'
import logo from '../assates/collegeLogo.jpg'
import Image from '../components/Image'

const StudentResult = ()=>{

    const { state } = useLocation();
    const [{ apiData },,setParams] = useFetch('students/getone');
    const [{ apiData: result },,setResultParams] = useFetch('students/studentResult');
    const [selectedSemester, setSelection] = useState(state?.Semester);

    useEffect(() => {

      if (state?.id) {
        setParams({ id:state?.id });
        setResultParams({ id:state?.id });
      }

      if(!state?.id){
        if(!selectedSemester){
            setSelection(apiData?.Semester)
        }
      }

      if (selectedSemester != null) {
        setResultParams((prevVal) => { return { ...prevVal, semester: selectedSemester } });
      }
    }, [state?.id,apiData?.Semester,selectedSemester, setParams, setResultParams]);
    
    return (
        <div style={{width:'100%',padding:'10px'}} >
            <div style={{width:'100%',height:'60px'}}>
                <div style={{float:'right'}}>
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
            <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
                <div>
                    <div style={{display:'grid',padding:'2px',rowGap:'5px',marginTop:'10px',gridTemplateRows:'auto',gridTemplateColumns:'1fr 1fr 1fr 1fr'}}>
                        
                        {result?.Data?.map((eachStudentData)=>(<div key={eachStudentData?._id}>
                            <strong style={{fontSize:'10px'}}>{eachStudentData?.subject}</strong>
                            <Progress color={(eachStudentData?.status === 'Pass')?'success':'error'} value={eachStudentData?.Percentage} width='50%'/>
                        </div>))}
                        
                        {result?.AgregatePercentage&&<div>
                            <strong style={{fontSize:'10px'}}>Agregate Percentage</strong>
                            <Progress color={result?.AgregatePercentage > 40 ? 'success' : 'error'} value={result?.AgregatePercentage} width='50%'/>
                        </div>}
                        
                    </div>
                
                    <ITEM minWidth='700px' marginTop='5px' maxWidth='900px' borderRadius='7px' width='auto'>
                        <div style={{display:"flex",padding:'2px',marginBottom:'20px',backgroundColor:'white',borderBottom:'1px solid black'}}>
            
                            <div style={{marginLeft:'10px',marginTop:'10px',marginRight:'20px'}}>
                                <Image Image={logo} width='60px' imageRadius='10%' />
                            </div>

                            <div style={{borderRight:'3px solid black'}}></div>

                            <div style={{marginLeft:'30px',marginTop:'10px',marginBottom:'10px'}}>
                                <Image Image={apiData?.profile} alt='student' width='60px' imageRadius='50%'/>
                            </div>

                            <div style={{display:'flex',marginTop:'20px',marginLeft:'30px'}}>
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
                            
                                        return(
                                            <tr key={index}>
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
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td></td><td></td><td></td><td></td><td>Aggregate Marks</td><td>{result?.Agregate}</td>
                                    </tr>
                                </tbody>
                            </table>:<strong><p style={{marginLeft:'250px',marginBottom:'20px'}}>Data not available</p></strong>}

                        </div>
                    </ITEM>
                </div>
            </div>
        </div>
    )

}

export default StudentResult;