// CustomCentralNode.jsx
import React from 'react';
import { Handle } from 'reactflow';

const CustomCentralNode = ({ data, isConnectable }) => {
  return (
    <div style={{ padding: '10px', textAlign: 'center', position: 'relative' }}>
      <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{data.label}</span>
      {/* Add a hidden handle at the center */}
      <Handle 
        type="source" 
        position="bottom" 
        style={{ 
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'none' // Hide the handle dot
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomCentralNode;