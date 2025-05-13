import React from 'react';

export default function Toolbar({
  onZoomIn,
  onZoomOut,
  onReset,
  onExportPNG,
  onExportSVG,
}) {
  return (
    <div className="toolbar">
      <button onClick={onZoomIn}>Zoom In</button>
      <button onClick={onZoomOut}>Zoom Out</button>
      <button onClick={onReset}>Reset View</button>
      <button onClick={onExportPNG}>Export PNG</button>
      <button onClick={onExportSVG}>Export SVG</button>
    </div>
  );
}