

import React from 'react';
import { Handle } from 'reactflow';

export default function CustomBadgeNode({ data }) {
  return (
    <div
      style={{
        width: 40,
        height: 24,
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
      <Handle type="target" position="top" style={{ display: 'none' }} />
      {data.label}
      <Handle type="source" position="bottom" style={{ display: 'none' }} />
    </div>
  );
}