import {FaHome, FaUser} from 'react-icons/fa';

import {MdMessage} from 'react-icons/md';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const routes = [

    {
        path : '/admin',
        name : 'Result List',
        accessLevel: ['moderate','high'],
        show:'sidebar',
        ICN : 101,
        icon : <FaHome/>

    },
    {
        path : '/admin/students',
        name : 'Students',
        accessLevel: ['moderate','high'],
        show:'sidebar',
        ICN : 102,
        icon : <FaUser/>

    },
    {
        path : '/admin/addResult',
        name : 'Add Result',
        accessLevel: ['moderate','high'],
        show:'sidebar',
        ICN : 103,
        icon : <MdMessage/>

    },
    {

        path : '/admin/addStudent',
        name : 'Add Student',
        show:'other',
        ICN:105,
        accessLevel: ['high']

    },
    {

        path : '/admin/addProfessor',
        name : 'Add Professor',
        show:'other',
        ICN:106,
        accessLevel: ['high']

    },
    {
        path : '/admin/professorList',
        name : 'Professors',
        accessLevel: ['high'],
        show:'sidebar',
        ICN : 107,
        icon : <AssignmentIndIcon/>

    },

]


export default routes 