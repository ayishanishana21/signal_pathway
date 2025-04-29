import React from 'react';
import { Handle, Position } from 'reactflow';

export default function CustomBadgeNode({ data }) {
  return (
    <div
      style={{
        width: 40, // Match initialNodes
        height: 24, // Match initialNodes
        background: 'yellow',
        color: 'black',
        border: '2px solid black',
        borderRadius: '10px',
        padding: '2px 6px',
        fontSize: '12px',
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
        style={{ display: 'none' }}
      />
      {data.label}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ display: 'none' }}
      />
    </div>
  );
}