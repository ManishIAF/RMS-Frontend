import TableColumn from './TableColumn';
import TableRow from './TableRow';

const Table = ({columns,rowsData,handleDelete})=>{


  return (
    
      <div className='tableContent'>
      
        <table id='myTable'>
            
          <TableColumn columnData={columns}/>
          {rowsData?.length > 0 ? <TableRow style={{outerHeight:'300px'}} handleDelete={handleDelete} rowsData={rowsData} />:<tbody><tr><td></td><td></td><td></td><td></td><td>No Data Available</td></tr></tbody>}
      
        </table>
  
      </div>
  )
}


export default Table

