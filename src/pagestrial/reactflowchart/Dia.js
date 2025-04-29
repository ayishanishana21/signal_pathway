// src/components/Diagram.js
// import React, { useState } from 'react';
// import { ReactFlowProvider, ReactFlow, Controls, Background } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import CustomNode from './CustomNode';

// const nodeTypes = {
//   custom: CustomNode,
// };

// const Dia = ({ nodes, edges }) => {
//   return (
//     <ReactFlowProvider>
//     <div style={{ width: '100%', height: '100vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         nodesDraggable={true} // Enable node dragging
//         edgesUpdatable={true} // Enable edge updates
//         fitView
//       >
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </div>
//   </ReactFlowProvider>
//   );
// };

// export default Dia;

import React from 'react';
import { ReactFlowProvider, ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const Diagram = ({ nodes, edges, onNodesChange, onEdgesChange }) => {
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

export default Diagram;