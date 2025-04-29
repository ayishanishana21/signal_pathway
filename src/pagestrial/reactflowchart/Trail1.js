// import React, { useCallback } from 'react';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from '@xyflow/react';
 
// import '@xyflow/react/dist/style.css';
 
// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2',markerEnd: {
//   type: 'arrowclosed',
//   width: 30,     // default is 10
//   height: 30,    // default is 10
//   color: 'black'
// }, }];

// export default function Trail() {
//     const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//     const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   
//     const onConnect = useCallback(
//       (params) => setEdges((eds) => addEdge(params, eds)),
//       [setEdges],
//     );
   
//     return (
//       <div style={{ width: '100vw', height: '100vh' }}>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//         >
//           <Controls />
//           <MiniMap />
//           <Background variant="dots" gap={12} size={1} />
//         </ReactFlow>
//       </div>
//     );
// }



import React, { useCallback } from 'react';
import {
  MiniMap,
  Controls,
  Background,
  addEdge,
  MarkerType,
  useNodesState,
  useEdgesState,
  ReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '@juggle/resize-observer';
import CustomNode from './CustomNode';
import CustomBadgeNode from './CustomBadgeNode';

const nodeTypes = {
  custom: CustomNode,
  customBadge: CustomBadgeNode,
};

const initialNodes = [
  {
    id: 'IL19',
    type: 'input',
    position: { x: 375, y: -250 },
    data: { label: 'IL19' },
    style: { backgroundColor: '#4CAF50', width: 100, height: 40 },
    draggable: false,
  },
  {
    id: 'IL20R',
    position: { x: 255, y: -150 },
    style: { width: 340, height: 60, backgroundColor: '#2196F3' },
    draggable: false,
  },
  {
    id: 'IL20RA',
    type: 'input',
    data: { label: 'IL20RA' },
    position: { x: 10, y: 10 },
    parentId: 'IL20R',
    extent: 'parent',
    style: { width: 150, height: 40 },
    draggable: false,
  },
  {
    id: 'IL20RB',
    type: 'input',
    data: { label: 'IL20RB' },
    position: { x: 170, y: 10 },
    parentId: 'IL20R',
    extent: 'parent',
    style: { width: 150, height: 40 },
    draggable: false,
  },
  {
    id: 'AKT1',
    // type: 'custom',
    position: { x: 150, y: 60 },
    data: { label: 'AKT1' }, // Remove badge from data
    style: { backgroundColor: '#FF9800', width: 100, height: 40 },
    draggable: false,
  },
  {
    id: 'AKT1-badge',
    type: 'customBadge',
    position: { x: 230, y: 50 }, // Adjust position relative to AKT1
    data: { label: 'S473' },
    style: { width: 40, height: 24 },
    draggable: false,

  },
  {
    id: 'MAPK1',
    position: { x: -70, y: 10 },
    data: { label: 'MAPK1' },
    style: { backgroundColor: '#FF5722', width: 100, height: 40 },
    draggable: false,
  },
  {
    id: 'MAPK1-badge-1',
    type: 'customBadge',
    position: { x: 0, y: 0 }, // Adjust position relative to AKT1
    data: { label: 'T185' },
    style: { width: 40, height: 24 },
    draggable: false,
  },
  {
    id: 'MAPK1-badge-2',
    type: 'customBadge',
    position: { x: -95, y: 0 }, // Adjust position relative to AKT1
    data: { label: 'Y187' },
    style: { width: 40, height: 24 },
    draggable: false,
  },
  {
    id: 'MAPK3',
    position: { x: 60, y: 10 },
    data: { label: 'MAPK3' },
    style: { backgroundColor: '#FF5722', width: 100, height: 40 },
    draggable: false,
  },
  {
    id: 'MAPK3-badge-1',
    type: 'customBadge',
    position: { x: 130, y: 0 }, // Adjust position relative to AKT1
    data: { label: 'T202' },
    style: { width: 40, height: 24 },
    draggable: false,
  },
  {
    id: 'MAPK3-badge-2',
    type: 'customBadge',
    position: { x: 48, y: 0 }, // Adjust position relative to AKT1
    data: { label: 'Y204' },
    style: { width: 40, height: 24 },
    draggable: false,
  },
  {
    id: 'STAT3',
    position: { x: 250, y: 100 },
    data: { label: 'STAT3' },
    style: { backgroundColor: '#FFC107', width: 100, height: 40 },
    draggable: false,
  },
  {
    id: 'STAT3-badge',
    type: 'customBadge',
    position: { x: 230, y: 120 }, // Adjust position relative to AKT1
    data: { label: 'P' },
    style: { width: 40, height: 24 },
    draggable: false,
  },
  {
    id: 'NFKB1',
    position: { x: 500, y: 100 },
    data: { label: 'NFKB1' },
    style: { backgroundColor: '#FFC107', width: 100, height: 40 },
    draggable: false,
  },
  {
    id: 'NFKB1-badge',
    type: 'customBadge',
    position: { x: 480, y: 90 }, // Adjust position relative to AKT1
    data: { label: 'S536' },
    style: { width: 40, height: 24 },
    draggable: false,
  },
  {
    id: 'MAPK8',
    position: { x: 600, y: 20 },
    data: { label: 'MAPK8' },
    style: { backgroundColor: '#FF5722', width: 100, height: 40 },
    draggable: false,
  },
  {
    id: 'MAPK8-badge-1',
    type: 'customBadge',
    position: { x: 680, y: 10 }, // Adjust position relative to AKT1
    data: { label: 'T183' },
    style: { width: 40, height: 24 },
    draggable: false,
  },
  {
    id: 'MAPK8-badge-2',
    type: 'customBadge',
    position: { x: 580, y: 10 }, // Adjust position relative to AKT1
    data: { label: 'Y185' },
    style: { width: 40, height: 24 },
    draggable: false,
  },
  {
    id: 'MAPK14',
    position: { x: 750, y: 70 },
    data: { label: 'MAPK14' },
    style: { backgroundColor: '#FF5722', width: 100, height: 40 },
    draggable: false,
  },
  {
    id: 'MAPK14-badge-1',
    type: 'customBadge',
    position: { x: 830, y: 60 }, // Adjust position relative to AKT1
    data: { label: 'T180' },
    style: { width: 40, height: 24 },
    draggable: false,
  },
  {
    id: 'MAPK14-badge-2',
    type: 'customBadge',
    position: { x: 730, y: 60 }, // Adjust position relative to AKT1
    data: { label: 'Y182' },
    style: { width: 40, height: 24 },
    draggable: false,
  },
  {
    id: 'Branch',
    position: { x: 255, y: 180 },
    style: { width: 340, height: 120, backgroundColor: '#2196F3' },
    draggable: false,
  },
  {
    id: 'MMP1',
    type: 'input',
    data: { label: 'MMP1' },
    position: { x: 10, y: 10 },
    parentId: 'Branch',
    extent: 'parent',
    style: { width: 150, height: 40 },
    draggable: false,
  },
  {
    id: 'TGFB1',
    type: 'input',
    data: { label: 'TGFB1' },
    position: { x: 170, y: 10 },
    parentId: 'Branch',
    extent: 'parent',
    style: { width: 150, height: 40 },
    draggable: false,
  },
  {
    id: 'CXCR4',
    type: 'input',
    data: { label: 'CXCR4' },
    position: { x: 10, y: 70 },
    parentId: 'Branch',
    extent: 'parent',
    style: { width: 150, height: 40 },
    draggable: false,
  },
  {
    id: 'CCNB1',
    type: 'input',
    data: { label: 'CCNB1' },
    position: { x: 170, y: 70 },
    parentId: 'Branch',
    extent: 'parent',
    style: { width: 150, height: 40 },
    draggable: false,
  },
];

const initialEdges = [
  {
    id: 'e1',
    source: 'IL19',
    target: 'IL20R',
    animated: false,
    type: 'step',
    markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30, color: 'green' },
  },
  {
    id: 'e2',
    source: 'IL20R',
    target: 'AKT1',
    animated: true,
    type: 'step',
    markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30, color: 'blue' },
    style: { stroke: 'blue',strokeWidth:1,fill: 'none' },
  },
  {
    id: 'e3',
    source: 'IL20R',
    target: 'MAPK1',
    animated: true,
    type: 'step',
    markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30, color: 'blue' },
    style: { stroke: 'blue', strokeWidth: 1, fill: 'none' },
  },
  {
    id: 'e4',
    source: 'IL20R',
    target: 'MAPK3',
    animated: true,
    type: 'step',
    markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30, color: 'blue' },
    style: { stroke: 'blue', strokeWidth: 1, fill: 'none' },
  },
  {
    id: 'e5',
    source: 'IL20R',
    target: 'NFKB1',
    animated: true,
    type: 'step',
    markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30, color: 'blue' },
    style: { stroke: 'blue', strokeWidth: 1, fill: 'none' },
  },
  {
    id: 'e6',
    source: 'IL20R',
    target: 'STAT3',
    animated: true,
    type: 'step',
    markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30, color: 'blue' },
    style: { stroke: 'blue', strokeWidth: 1, fill: 'none' },
  },
  {
    id: 'e7',
    source: 'IL20R',
    target: 'MAPK8',
    animated: true,
    type: 'step',
    markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30, color: 'blue' },
    style: { stroke: 'blue', strokeWidth: 1, fill: 'none' },
  },
  {
    id: 'e8',
    source: 'IL20R',
    target: 'MAPK14',
    animated: true,
    type: 'step',
    markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30, color: 'blue' },
    style: { stroke: 'blue', strokeWidth: 1, fill: 'none' },
  },
  {
    id: 'e9',
    source: 'IL20R',
    target: 'Branch',
    animated: true,
    type: 'step',
    markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30, color: 'black' },
    style: { stroke: 'black', strokeWidth: 1, fill: 'none' },
  },
];

export default function Pathway() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}