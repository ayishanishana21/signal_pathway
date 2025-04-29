import React from 'react';
import { Handle } from '@xyflow/react';

const RoundNode = ({ data, isConnectable }) => {
  return (
    <div
      style={{
        background: '#FFD700',
        color: 'black',
        padding: '10px',
        borderRadius: '30%', // Makes the node round
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Handle
        type="target"
        position="left"
        isConnectable={isConnectable}
        style={{ background: '#555', borderColor: '#555' }}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position="right"
        isConnectable={isConnectable}
        style={{ background: '#555', borderColor: '#555' }}
      />
    </div>
  );
};

export default RoundNode;