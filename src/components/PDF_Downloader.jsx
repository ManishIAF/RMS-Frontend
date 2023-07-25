import React from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import useFetch from '../hooks/fetch.hook'
import ToolTipComponent from "./ToolTipComponent";
import DownloadIcon from '@mui/icons-material/Download';
import logo from '../assates/collegeLogo.jpg';

const PDFDownloader = ({semester,columns,rowsData})=> {

  const [{apiData}] = useFetch('profile');
  let currentDate = new Date()

    const handleDownload = () => {
      const doc = new jsPDF();
      const tableColumnWidths = [100, 100, 10,50, 20, 20,20,20];
      const tableHeaders = [columns];
      const tableRows = rowsData.map(({ firstName , lastName,Roll_Number,Semester,subject,Internal,Theory,Practical,Total }) => [`${firstName} ${lastName}`,Roll_Number,Semester,subject,Internal,Theory,Practical,Total]);
      doc.addImage(logo, 'PNG', 90, 5, 20, 20);
      doc.setFontSize(10)
      doc.text(`${semester}`, 15, 30);
      doc.text(`Department : ${apiData?.department}`, 15, 35);
      doc.text(`Date : ${currentDate.getDate()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getFullYear()}`, 15, 40);
      doc.text(`Professor : ${apiData?.firstName} ${apiData?.lastName}`, 135, 30);
      doc.text(`E-mail : ${apiData?.email}`, 135, 35);


      doc.autoTable({ 
        head: tableHeaders,
        body: tableRows,
        startY: 45,
        columnWidths: tableColumnWidths,
      });
      doc.save('document.pdf');
    };
  
    return (
      <>
        {/* Render your data here */}
        <ToolTipComponent fun={handleDownload} title='download result' content={<DownloadIcon style={{color:'blue',size:'small',marginTop:'10px'}}/>} />
      </>
    );
  }

  export default PDFDownloader;