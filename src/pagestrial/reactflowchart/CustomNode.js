// import React from 'react';
// import { Handle } from '@xyflow/react';

// const CustomNode = ({ data }) => {
//   return (
//     <div
//       style={{
//         background: '#FFD700',
//         color: 'black',
//         padding: '10px',
//         borderRadius: '10px',
//         width: '200px',
//         height: '50px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Handle type="target" position="left" />
//       <div>{data.label}</div>
//       <Handle type="source" position="right" />
//     </div>
//   );
// };

// export default CustomNode;


// CustomNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

export default function CustomNode({ data }) {
  console.log('CustomNode data:', data);
  return (
    <div
      style={{
        width: 100, // Match initialNodes
        height: 40, // Match initialNodes
        padding: '10px 20px',
        border: '2px solid black',
        borderRadius: '10px',
        background: '#FF9800',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555', width: 10, height: 10 }}
      />
      {data.label}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555', width: 10, height: 10 }}
      />
    </div>
  );
}