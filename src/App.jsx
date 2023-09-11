import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

/** Import All Component **/

import Recovery from './pages/Recovery'
import Reset from  './pages/Reset';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile'
import Login from './pages/Login';
import SharedLayOut from './pages/SharedLayOut';
import AuthorizedRoute from './middleware/AuthorizedRoute';
import Home from './pages/Home'
import EditResult from './pages/EditResult'
import AddResult from './pages/AddResult'
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import AddProfessor from './pages/AddProfessor';
import StudentProfile from './pages/StudentProfile';
import ProfessorList from './pages/ProfessorList';
import QRCODE from './pages/QRCode';
import PasswordReset from './pages/PasswordReset';
import StudentResult from './pages/StudentResult'
import List from './components/List'

const App = ()=>{

    return(

        <Router>
            <Routes>
                
                <Route path='/' element={<Login/>}/>
                <Route path='/recovery' element={<Recovery/>} />
                <Route path='/reset/:token' element={<Reset/>} />
                
                <Route path='admin' element={<AuthorizedRoute><SharedLayOut/></AuthorizedRoute>}>

                 <Route index='/' element={<Home/>} />

                 <Route path='StudentResult' element={<StudentResult/>} />
                  
                 <Route path='professorList' element={<ProfessorList/>} />

                 <Route path='profile' element={<Profile/>} />

                 <Route path='studentProfile' element={<StudentProfile/>} />
                   

                  <Route path='students' element={<Students />}/>
                  <Route path='qrcode' element={<QRCODE/>}/>

                  <Route path='addStudent' element={<AddStudent/>}/>
                  <Route path='editStudent' element={<AddStudent/>} />

                  <Route path='addProfessor' element={<AddProfessor/>}/>
                  <Route path='editProfessor' element={<AddProfessor/>} />
                  <Route path='passwordReset/:token' element={<PasswordReset/>} />
                   
                  <Route path='addResult' element={<AddResult/>} />
                  <Route path='list' element={<List/>} />
                  <Route path='editResult' element={<EditResult/>} />
                  {/* <Route path='result' element={<StudentResult/>}/> */}
                  <Route path='403' element={<PageNotFound/>}/>
                </Route>
                
                <Route path='student' element={<AuthorizedRoute><SharedLayOut/></AuthorizedRoute>}>
                    
                    <Route index='/' element={<StudentResult/>}/>
                    <Route path='profile' element={<Profile/>} />

                </Route>
                
                <Route path='*' element={<PageNotFound/>}/>


            </Routes>
        </Router>

    )

}


export default App;