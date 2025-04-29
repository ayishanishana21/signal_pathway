// src/utils/convertToNodesEdges.js
const convertToNodesEdges = (data) => {
    const nodes = [];
    const edges = [];
  
    data.forEach((row, index) => {
      const nodeId = `node-${index}`;
      const nodeLabel = `${row.Classification} - ${row.Targeted_Cell} - ${row.Targeted_Protein}`;
  
      nodes.push({
        id: nodeId,
        data: { label: nodeLabel },
        position: { x: index * 150, y: index * 100 },
      });
  
      if (index > 0) {
        edges.push({
          id: `edge-${index - 1}-${index}`,
          source: `node-${index - 1}`,
          target: nodeId,
        });
      }
    });
  
    return { nodes, edges };
  };
  
  export default convertToNodesEdges;