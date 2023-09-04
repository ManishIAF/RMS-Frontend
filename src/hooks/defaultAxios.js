import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://0690-2405-201-801e-b056-9852-66e3-33c4-e467.ngrok-free.app', // Replace with your API base URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // You can add more default headers here if needed
    // 'Authorization': `Bearer ${tokenOb?.token}`,
  },
});

customAxios.interceptors.request.use(async (req) => {

    const token = localStorage.getItem('token');
    console.log('Interceptor Token:', token);
  
    // Perform token refresh logic here (e.g., axios.get('/api/authenticate'))
  
    // Return a promise to ensure that the main request waits for the token refresh
    return new Promise((resolve, reject) => {
      axios.get('/api/authenticate', {
        baseURL: 'https://0690-2405-201-801e-b056-9852-66e3-33c4-e467.ngrok-free.app',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('interceptors data : ', response.data);
        localStorage.setItem('token', response.data?.token);
        // Resolve the promise to allow the main request to continue
        resolve(req);
      })
      .catch(error => {
        // Handle token refresh errors here
        reject(error);
      });
    });
  });

export default customAxios;



  // Axios.interceptors.request.use(async (req) => {
  //   const token = localStorage.getItem('token');
  //   console.log('Interceptor Token:', token);
  
  //   // Perform token refresh logic here (e.g., axios.get('/api/authenticate'))
  
  //   // Return a promise to ensure that the main request waits for the token refresh
  //   return new Promise((resolve, reject) => {
  //     axios.get('/api/authenticate', {
  //       baseURL: 'https://23fb-2405-201-801e-b056-282f-e4be-a611-eb26.ngrok-free.app',
  //       withCredentials: true,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     })
  //     .then(response => {
  //       console.log('interceptors data : ', response.data);
  //       localStorage.setItem('token', response.data?.token);
  //       // Resolve the promise to allow the main request to continue
  //       resolve(req);
  //     })
  //     .catch(error => {
  //       // Handle token refresh errors here
  //       reject(error);
  //     });
  //   });
  // });
  

// export default Axios;
