import React,{useState} from "react";
import axios from 'axios';

const ScheduleExam = ()=>{

    const [schedulling,setSchedulling] = useState()

    axios.get('/api/schedule').then(response=>{
        console.log(Object.keys(response?.data));
        const gg = Object.keys(response?.data);
        setSchedulling(gg);

    }).catch((error)=>{
        console.log('error : ',error);
    })



    return (
        <div>
           <div>exam schedule</div>
           {/* <div>
            {schedulling?.map((sd,index)=>(
                <div key={index} >{sd}</div>
            )) }
           </div> */}
        </div>
    )   

}

export default ScheduleExam;