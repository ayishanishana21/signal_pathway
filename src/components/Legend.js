import React from 'react';

export default function Legend() {
  return (
    <div className="legend">
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: '#4CAF50' }}></div>
        <span>Input Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: '#2196F3' }}></div>
        <span>Default Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: '#FF9800' }}></div>
        <span>AKT1 Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: '#FF5722' }}></div>
        <span>MAPK Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: '#FFC107' }}></div>
        <span>STAT3 Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: 'yellow' }}></div>
        <span>Site Badge</span>
      </div>
      <div className="legend-item">
        <div className="legend-edge" style={{ backgroundColor: 'black' }}></div>
        <span>Edge</span>
      </div>
    </div>
  );
}