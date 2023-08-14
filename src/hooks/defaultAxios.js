import axios from 'axios';

// const Axios = ()=>{

    // const token = localStorage.getItem('token');

    const Axios = axios.create({
        baseURL: 'http://localhost:8000',
        // timeout: 10000, 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    axios.defaults.withCredentials = true;
//     return defaultAxios;
// }

export default Axios;
