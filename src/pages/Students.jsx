import React,{useEffect,useState} from 'react'
import axios from 'axios';
import '../styles/Card.css'
import useFetch from '../hooks/fetch.hook';
import Confirm from '../components/confirmation';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '../components/Card'
import Select from '../components/Select';
import Alert from '../components/Alert'
import SearchBar from '../components/Search';
import { SearchFunction1 } from '../helper/searchFunction';


function Students() {

  const [selectedSemester,setSelection]=useState('All')
  const [openConfirmation,setConfirmation] = useState({username:null,userId:null})
  const [{apiData},,setParams,Params] = useFetch(`students`);
  const [alert,setAlert] = useState({});

  const handleUserDelete = (event)=>{
    event.preventDefault();
    
    const token = localStorage.getItem('token');
    axios.delete('/api/students',{
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
    
    }).catch(error => {
      // handle error response
      setAlert({message:error.response.data,variant:'info'})

    });

  }

  useEffect(() => {
    if (selectedSemester !== 'All') {
      if (selectedSemester !== Params.semester) {
        setParams({ semester: selectedSemester });
      }
    } else {
      if (Params.semester !== undefined) {
        setParams({ semester: undefined });
      }
    }
  },[selectedSemester,setParams,Params.semester]);

  return (
    <div style={{width:'100%'}}>     
     {alert?.message&&<Alert alert={alert}/>}
      {openConfirmation?.userId&&
        <Confirm setConfirmation={setConfirmation} openConfirmation={openConfirmation} handleUserDelete={handleUserDelete} />
      }
      {apiData?.studentData && <div style={{width:'100%',height:'60px' }}>

        <div style={{float:'left',marginTop:'10px'}}>
          <SearchBar SearchFunction={SearchFunction1}/>
        </div> 
        
        <div style={{float:"right",marginTop:'10px'}}>

          <Select options = {[
            
            {selectionText : "All Semester" , value:'All'},
            {selectionText : "Semester 1" , value:1},
            {selectionText : "Semester 2" , value:2},
            {selectionText : "Semester 3" , value:3},
            {selectionText : "Semester 4" , value:4},

          ]}

          fun={setSelection}
          selectedValue={selectedSemester}

        />

      </div></div>}
      <div style={{marginTop:'5px',width:'100%',justifyContent:'center'}}>
        <div className='rapper'>
          {apiData?apiData?.studentData?.map(

            (eachStudentData)=>{

              return( 
                
                <div key={eachStudentData._id}>
                  <Card setConfirmation={setConfirmation} Autherization={apiData?.auth} datum={eachStudentData}/>
                </div>
                
                      
              )
              
            }

          ):<CircularProgress style={{marginTop:'200px',marginLeft:'500px'}} color="success" />}
        </div>
      </div>
    </div>
  )
}

export default Students;