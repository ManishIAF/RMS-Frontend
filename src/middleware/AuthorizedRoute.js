import React,{useState,useEffect} from "react";
import { useNavigate,useLocation} from "react-router-dom";
import routes from '../helper/routes'
import axios from "axios";


const AuthorizedRoute = ({children})=>{

    const navigate = useNavigate();
    const location = useLocation();
    const [Autherization,setAutherization] = useState(null)
    const currentRoute = location.pathname;
    useEffect(()=>{
        
        let isMounted = true;
        
        const authenticate = async()=>{
            try {

                const token = localStorage.getItem('token');

                if(!token) return navigate('/')

                const {data,status} = await axios.get('/api/authenticate',{
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })

                if(isMounted){  

                    if(status === 200){

                        if(data?.auth){

                            localStorage.setItem('token', data?.token);

                            const al = routes?.find(({path,accessLevel})=>{return path === currentRoute && accessLevel})
                            
                            if(al){

                                if(al?.accessLevel?.includes(data?.auth)){

                                    setAutherization(data)
                                
                                }
                     
                                if(!al?.accessLevel?.includes(data?.auth)){
        
                                    return navigate('./', { replace: true });
                                
                                }
                     
                            }

                            if(!al){

                                if(!al?.accessLevel?.includes(data?.auth)){
                               
                                    setAutherization(data)
                                
                                }
                            }
                        }
                    }
                }              
                    

            } catch (error) {

                if(error?.response?.status === 401){ 
                    localStorage.removeItem('token');
                    return navigate('/', { replace: true });
                }  

            }

        }

        authenticate()

        return () => {
            isMounted = false;
        };

    },[navigate,currentRoute])
    
    return Autherization&&React.cloneElement(children, { Autherization });
} 

export default AuthorizedRoute;