import React from 'react'

import '../styles/result.css'
// import profile from '../assates/profile.jpg';
import profile from '../assates/profile.png'
// import Avatar from './Avatar';
import collegeLogo from '../assates/collegeLogo1.jpg'

function Result() {
  return (
   <div className='ALL'>

        <div>
            <img className='collegeLogo' src={collegeLogo} alt="collegeLogo" />
        </div>

        <div className='stuInfo'>

          <div className='img'>  
    
            <img src={profile} alt='student' style={{width:'100px',borderRadius:'50%'}}/>

          </div>

          <div style={{marginLeft:'20px',marginTop:'40px'}}>
            <p><strong>Name : </strong>Manish Shaw</p>
            <p><strong>Registration Number : </strong>987654321</p>
            <p><strong>Roll Number : </strong>123456789</p>
            <p><strong>Semester : </strong>3</p>
          </div> 

        </div>

        <table className='table'>

            <thead>

                <tr>
                    <th>
                        Subject Name
                    </th>
                    
                    <th>
                        Theoretical Marks
                    </th>
                    
                    <th>
                        Internal Assessment
                    </th>
                    
                    <th>
                        
                        Practical/Tutorial Marks
                        
                    </th>
                    
                    <th>
                        Total
                    </th>
                    
                    <th>
                        Status
                    </th>
                
                </tr>
            </thead>
            
            <tbody>
                <tr>
                    <td>
                         A.I
                    </td>
            
                    <td>
                       50
                    </td>
            
                    <td>
                        20
                    </td>
            
                    <td>
                        30
                    </td>
            
                    <td>
                        100
                    </td>
            
                    <td>
                        pass
                    </td>
            
                </tr>
            
                <tr>
            
                    <td>
                        Artificial
                    </td>
            
                    <td>
                        50
                    </td>
            
                    <td>
                        20
                    </td>
            
                    <td>
                        30
                    </td>
            
                    <td>
                        100
                    </td>
            
                    <td>
                        pass
                    </td>
            
                </tr>
            
                <tr>
                    <td>
                        Cloud Computing 
                    </td>
            
                    <td>
                        50
                    </td>
            
                    <td>
                        20
                    </td>
            
                    <td>
                        30
                    </td>
            
                    <td>
                        100
                    </td>
            
                    <td>
                        pass
                    </td>
            
                </tr>
            
            </tbody>
        
        </table>
 
    </div>
 
  )

}


export default Result