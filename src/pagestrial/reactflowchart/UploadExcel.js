// // src/components/UploadExcel.js
// import React, { useState } from 'react';
// import parseExcel from './parseExcel';
// import convertToNodesEdges from './convertToNodesEdges';

// const UploadExcel = ({ setNodes, setEdges }) => {
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     try {
//       const data = await parseExcel(file);
//       const { nodes, edges } = convertToNodesEdges(data);
//       setNodes(nodes);
//       setEdges(edges);
//     } catch (error) {
//       console.error('Error parsing file:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//     </div>
//   );
// };

// export default UploadExcel;


import React from 'react';
import parseExcel from './parseExcel';
import convertToNodesEdges from './convertToNodesEdges';

const UploadExcel = ({ setNodes, setEdges }) => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const data = await parseExcel(file);
      const { nodes, edges } = convertToNodesEdges(data);
      setNodes(nodes);
      setEdges(edges);
    } catch (error) {
      console.error('Error parsing file:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  );
};

export default UploadExcel;