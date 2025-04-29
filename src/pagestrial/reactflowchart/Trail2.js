// import React from 'react';
// import { ReactFlowProvider, ReactFlow } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import RoundNode from './RoundNode';

// const initialNodes = [
//   {
//     id: '1',
//     type: 'round', // Use the custom node type
//     data: { label: 'Round Node 1' },
//     position: { x: 0, y: 0 },
//   },
//   {
//     id: '2',
//     type: 'round', // Use the custom node type
//     data: { label: 'Round Node 2' },
//     position: { x: 200, y: 100 },
//   },
// ];

// const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2', animated: true },
// ];

// const nodeTypes = {
//   round: RoundNode, // Register the custom node
// };

// const LayoutFlow = () => {
//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView />
//     </div>
//   );
// };

// const Trail2 = () => {
//   return (
//     <ReactFlowProvider>
//       <LayoutFlow />
//     </ReactFlowProvider>
//   );
// };

// export default Trail2;


// src/App.js
// import React, { useState } from 'react';
// import UploadExcel from './UploadExcel';
// import Diagram from './Dia';

// const Trail2 = () => {
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <UploadExcel setNodes={setNodes} setEdges={setEdges} />
//       <Diagram nodes={nodes} edges={edges} />
//     </div>
//   );
// };

// export default Trail2;



// import React, { useState } from 'react';
// import { useNodesState, useEdgesState } from '@xyflow/react';
// import UploadExcel from './UploadExcel';
// import Diagram from './'; // Corrected import

// const Trail2 = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <UploadExcel setNodes={setNodes} setEdges={setEdges} />
//       <Diagram
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//       />
//     </div>
//   );
// };

// export default Trail2;


import React, { useState, useEffect, useRef } from 'react';
import { useNodesState, useEdgesState, ReactFlowProvider, ReactFlow, Controls, Background, Handle, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import * as XLSX from 'xlsx';

const parseExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet_name_list = workbook.SheetNames;
      const dataJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      resolve(dataJson);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsBinaryString(file);
  });
};

const convertToNodesEdges = (data) => {
  const nodes = [];
  const edges = [];
  const nodeMap = {};

  data.forEach((row, index) => {
    const classification = row.Classification;
    const targetedCell = row.Targeted_Cell;
    const targetedProtein = row.Targeted_Protein;
    const targetedKinase = row.Targeted_Kinase;

    const classificationId = `node-${classification}`;
    const targetedCellId = `node-${targetedCell}`;
    const targetedProteinId = `node-${targetedProtein}`;
    const targetedKinaseId = `node-${targetedKinase}`;

    if (!nodeMap[classificationId]) {
      nodeMap[classificationId] = { id: classificationId, data: { label: classification }, position: { x: Math.random() * 800, y: Math.random() * 600 },style: { backgroundColor: '#85c1e9', color: 'black' } };
      nodes.push(nodeMap[classificationId]);
    }

    if (!nodeMap[targetedCellId] && targetedCell) {
      nodeMap[targetedCellId] = { id: targetedCellId, data: { label: targetedCell }, position: { x: Math.random() * 800, y: Math.random() * 600 },style: { backgroundColor: '#dc7633', color: 'black',borderRadius: '50%',}  };
      nodes.push(nodeMap[targetedCellId]);
    }

    if (!nodeMap[targetedProteinId] && targetedProtein) {
      nodeMap[targetedProteinId] = { id: targetedProteinId, data: { label: targetedProtein }, position: { x: Math.random() * 800, y: Math.random() * 600 },style: { backgroundColor: '#a569bd', color: 'black' }  };
      nodes.push(nodeMap[targetedProteinId]);
    }

    if (!nodeMap[targetedKinaseId] && targetedKinase) {
      nodeMap[targetedKinaseId] = { id: targetedKinaseId, data: { label: targetedKinase }, position: { x: Math.random() * 800, y: Math.random() * 600 },style: { backgroundColor: '#f4d03f', color: 'black' } };
      nodes.push(nodeMap[targetedKinaseId]);
    }

    if (targetedCell) {
      edges.push({
        id: `edge-${classificationId}-${targetedCellId}`,
        source: classificationId,
        target: targetedCellId,
        markerEnd: { type: MarkerType.ArrowClosed,
          width: 30,     
          height: 30,    
          color: 'black' },
      });
    }

    if (targetedProtein) {
      edges.push({
        id: `edge-${classificationId}-${targetedProteinId}`,
        source: classificationId,
        target: targetedProteinId,
        markerEnd: { type: MarkerType.ArrowClosed ,width: 30,     // default is 10
          height: 30,    // default is 10
          color: 'black',
        },
      });
    }

    if (targetedKinase) {
      edges.push({
        id: `edge-${classificationId}-${targetedKinaseId}`,
        source: classificationId,
        target: targetedKinaseId,
        markerEnd: { type: MarkerType.ArrowClosed ,width: 30,     // default is 10
          height: 30,    // default is 10
          color: 'black'},
      });
    }
  });

  return { nodes, edges };
};

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        background: '#FFD700',
        color: 'black',
        padding: '10px',
        borderRadius: '10px',
        width: '200px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Handle type="target" position="left" />
      <div>{data.label}</div>
      <Handle type="source" position="right" />
    </div>
  );
};

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

const Diagram = ({ nodes, edges, onNodesChange, onEdgesChange }) => {
  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

const Trail2 = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <UploadExcel setNodes={setNodes} setEdges={setEdges} />
      <Diagram
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      />
    </div>
  );
};

export default Trail2;