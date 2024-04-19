import React from 'react';
import reportData from '../../data/reports.json';
import Image from 'next/image';

const Table = () => {
  const reports = reportData.reports;
  return (
    // creating the table having colums like date, report name & download
    <div className="">
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-primary font-medium'>
            <th>Date</th>
            <th>Report Name</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {/* data comes from the report json */}
          {reports.map((report, index) => (
            <tr key={index} className=''>
              <td>{report.date}</td>
              <td>{report.name}</td>
              <td>
                <a href={report.fileUrl} download={report.fileUrl} target="_blank" rel="noreferrer">
                  <Image src="/report/document-download.svg" width={100} height={100} alt="download" className='w-8 h-8' />  
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
