import React from 'react'
import ResultList from "../components/Table"

import { useParams } from 'react-router-dom'; 

import {useResultContext} from '../contexts/ResultContext'

function Result() {

  const {semester} = useParams()

  const {Data,setSemester} = useResultContext()
  
  
  if(semester){setSemester(semester)}

  return (

    <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
            <ResultList column={['Images','Name','Roll_Number','Semester','Subject','Marks','Edit']} rows={Data}/>
        </div>

  )
}

export default Result;