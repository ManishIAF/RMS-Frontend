import axios from "axios";
import { useEffect,useState } from "react";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const useFetch = (query,options={}) => {

    const {skip} = options;
    const [getData,setData] = useState({isLoading:false,apiData:undefined,status:null,serverError:null})
    const [Params,setParams] = useState('')

    useEffect(()=>{

        let isMounted = true;

        if(skip){
            return;
        }

        const fetchData = async()=>{
            try {
                const token = localStorage.getItem('token');
                
                setData(prev => ({...prev,isLoading:true}))
                
                const {data,status} = await axios.get(`/api/${query}`,{
                    params:Params,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },

                });
                   
                if(isMounted){

                    if(status === 200){

                        setData(prev => ({...prev,isLoading:false,apiData:data,status:status}));
    
                    }else if(status !== 200){
    
                        setData(prev => ({...prev,isLoading:true}))

                    }

                }
                
            } catch (error) {
                if(isMounted){

                    setData(prev => ({...prev,isLoading:false,serverError:error}))

                }
                
            };
        }

        fetchData();

        return () => {
            isMounted = false;
          };


    },[query,Params,skip])

    return [getData,setData,setParams,Params];

}

export default useFetch;