import React,{useState,useEffect} from "react";
import { useNavigate,useLocation} from "react-router-dom";
import axios from "axios";
import routes from '../helper/routes'

const AuthorizedRoute = ({children})=>{
    const navigate = useNavigate();
    const location = useLocation();
    const [Autherization,setAutherization] = useState(null)
    const token = localStorage.getItem('token');
    const currentRoute = location.pathname;


    useEffect(()=>{

        if(!token) {return navigate('/', { replace: true });}

        if(token){
            
            axios.get('/api/authenticate',{
                    "Content-Type":"application/json",
                    withCredentials:true,
                    headers:{
                    "Authorization" : `Bearer ${token}`
                },

            }).then((response)=>{
            
                    if(response.status === 200){
                        const al = routes?.find(({path,accessLevel})=>{return path === currentRoute && accessLevel})

                        if(al){
                            if(al?.accessLevel?.includes(response?.data?.auth)){

                                setAutherization(response?.data)
                            
                            }
                            if(!al?.accessLevel?.includes(response?.data?.auth)){

                                return navigate('./', { replace: true });
                            
                            }
                        }
                        if(!al){
                            setAutherization(response?.data)
                        }
                        setAutherization(response?.data)
                    }
                
                }
            )
            .catch((error) => { 
                
                    if(error.response.status === 401){ 
                        localStorage.removeItem('token');
                        return navigate('/', { replace: true });
                    }                
                }
            )
        }
    },[token,navigate,currentRoute])
    
    return Autherization&&React.cloneElement(children, { Autherization });
} 

export default AuthorizedRoute;