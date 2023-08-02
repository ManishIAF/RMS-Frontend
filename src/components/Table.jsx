import '../styles/table.css'
import TableColumn from './TableColumn';
import TableRow from './TableRow';

// import SearchBar from './Search';

const Table = ({columns,rowsData,handleDelete})=>{


  return (
    
    <div className='All'>

    <div className='tableContent'>
  
        <table id="myTable">
            
          <TableColumn columnData={columns}/>
          {rowsData?.length > 0 && <TableRow handleDelete={handleDelete} rowsData={rowsData} />}
          <tfoot style={{position:'absolute',bottom:0,height:'50px',width:'1110px',backgroundColor:'#fff'}}>
          </tfoot>

        </table>
  
        {rowsData?.length === 0 
          
          && 
          
          <div style={{paddingTop:'100px',paddingLeft:'400px'}}>
            
            <strong> No Data Available </strong>
          </div>
        }
  
    </div>
  
  </div>
    
    
  )
}


export default Table

