
import React from 'react';
import { Handle, Position } from 'reactflow';
import 'react-tooltip/dist/react-tooltip.css';

export default function CustomNode({ data }) {
  return (
    <div
      style={{
        width: 100,
        height: 40,
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
      <Handle type="target" position={Position.Top} style={{ background: '#555', width: 10, height: 10 }} />
      {data.label}
      <Handle type="source" position={Position.Bottom} style={{ background: '#555', width: 10, height: 10 }} />
    </div>
  );
}