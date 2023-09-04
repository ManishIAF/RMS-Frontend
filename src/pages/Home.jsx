import React,{useEffect,useState} from 'react'
import ResultList from "../components/Table"
import axios from 'axios';

import { useNavigate } from 'react-router-dom'; 

import PDFDownloader from '../components/PDF_Downloader';
import ITEM from '../components/Paper'
import Alerting from '../components/Alert'
import { SearchFunction } from '../helper/searchFunction';
import useFetch from '../hooks/fetch.hook';
import Select from '../components/Select'
import SearchBar from '../components/Search';
import { Button } from '@mui/material';

const Home = ()=> {
  const Navigate = useNavigate()

  const [selectedSemester,setSelection] = useState('All')
  const [{apiData},,setParams,Params] = useFetch(`result`);
  const [alert,setAlert] = useState({});

  useEffect(()=>{

    if (selectedSemester !== 'All') {
      if (selectedSemester !== Params.semester) {
        setParams({ semester: selectedSemester });
      }
    } else {
      if (Params.semester !== undefined) {
        setParams({ semester: undefined });
      }
    }

  },[setParams,Params.semester,selectedSemester])

  const handleDelete = (ResultId)=>{

    const token = localStorage.getItem('token');

    axios.delete(`/api/result/${ResultId}`,
      {
        "Content-Type":"application/json",
        
        withCredentials:true,
        
        headers:{
          
          "Authorization" : `Bearer ${token}`
        
        }
      }
    ).then((response)=>{
      
      setParams({})
      setAlert({message:response.data,variant:'success'})

    
    }).catch((error)=>{

      setAlert({message:error.response.data,variant:'info'})
      
    })

  }
 
  
  return (
    <div style={{marginTop:'10px',justifyContent:'center',padding:'5px',width:'100%',height:'100%',overflow:'auto'}}>
    
      {alert?.message&&<Alerting alert={alert}/>}
      
      <div style={{display:'flex',width:'100%',justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h3><strong>Result List</strong></h3>
        </div>
        
        <div style={{alignItems: 'center'}} >
          <Button variant="contained" onClick={()=>Navigate('/admin/addResult')}>Add Result</Button>
        </div>

      </div>
    
      <ITEM borderRadius='7px' width='100%' marginTop='15px'>

        <div style={{display:'flex',height:'70px',justifyContent: 'space-between', alignItems: 'center',width:'100%'}} >

          <div style={{width:'25px'}}>
            <SearchBar SearchFunction={SearchFunction} />
          </div>

          <div style={{ display:'flex',marginRight:'10px',alignItems:'center'}}>
            <div style={{marginRight:'20px'}}>
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
            <div style={{marginTop:'20px'}}>
          
              <PDFDownloader 
                semester={selectedSemester?`Semester : ${selectedSemester}`:'Semester : All'}
                  columns={['Name','Roll Number','Semester','Subject',"Internal",'Theory',"Practical","Total"]} 
                  rowsData={apiData} 
                />
            </div>

          </div>

        </div>
        <div style={{width:'100%'}}>
      
          <ResultList handleDelete={handleDelete} columns={['Images','Name','Roll Number','Semester','Subject',"Internal",'Theory',"Practical","Total","Actions"]} rowsData={apiData}/>
          <ITEM height='40px'/>
        </div>
      </ITEM>
      

    </div>

  )
}

export default Home