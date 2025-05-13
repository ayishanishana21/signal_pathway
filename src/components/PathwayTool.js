// import React, { useState, useCallback } from 'react';
// import {
//   ReactFlow,
//   useNodesState,
//   useEdgesState,
//   Controls,
//   MiniMap,
//   Background,
//   addEdge,
//   MarkerType,
// } from 'reactflow';
// import * as XLSX from 'xlsx';
// import 'reactflow/dist/style.css';
// import './PathwayTool.css';

// import CustomNode from './CustomNode';
// import CustomBadgeNode from './CustomBadgeNode';

// const nodeTypes = {
//   custom: CustomNode,
//   customBadge: CustomBadgeNode,
// };

// export default function PathwayTool() {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
  
//       let allRows = [];
//       let allEdges = [];
  
//       workbook.SheetNames.forEach((sheet) => {
//         const ws = workbook.Sheets[sheet];
//         const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
//         allRows = allRows.concat(rows);
  
//         // Log the rows of each sheet
//         console.log(`Rows from sheet ${sheet}:`, rows);
  
//         // If the sheet contains edge data (like "edges", or any similar keyword), process it
//         if (sheet.toLowerCase().includes('sheet2')) {
//           allEdges = allEdges.concat(rows);
//         }
//       });
  
//       // Log all rows and edges
//       console.log('All Rows:', allRows);
//       console.log('All Edges:', allEdges);
  
//       const nodeMap = new Map();
//       const nodesRaw = [];
//       const compoundGroups = [];
  
//       allRows.forEach((row) => {
//         const node = {
//           id: row.id || row.node_id,
//           label: row.label || row.id,
//           type: row.type || 'default',
//           parentId: row.parentId || row.parent_id || undefined,
//           position: { x: Number(row.pos_x) || 0, y: Number(row.pos_y) || 0 },
//           style: {
//             backgroundColor: row.style_background || '#ddd',
//             width: Number(row.style_width) || 100,
//             height: Number(row.style_height) || 40,
//           },
//         };
  
//         if (node.parentId) {
//           let group = compoundGroups.find((g) => g.id === node.parentId);
//           if (!group) {
//             group = { id: node.parentId, children: [], style: {} };
//             compoundGroups.push(group);
//           }
//           group.children.push(node);
//         } else {
//           nodesRaw.push(node);
//         }
  
//         nodeMap.set(node.id, node);
  
//         // Handle badges
//         const badgeKeys = Object.keys(row).filter((k) =>
//           k.toLowerCase().includes('badge')
//         );
//         badgeKeys.forEach((key, index) => {
//           const badgeLabel = row[key];
//           if (badgeLabel) {
//             nodesRaw.push({
//               id: `${node.id}-badge-${index}`,
//               type: 'customBadge',
//               label: badgeLabel,
//               position: {
//                 x: node.position.x + 80 + index * 10,
//                 y: node.position.y - 10 + index * 10,
//               },
//               style: { width: 40, height: 24 },
//             });
//           }
//         });
//       });
  
//       const newNodes = [];
  
//       // Add main nodes
//       nodesRaw.forEach((node) => {
//         newNodes.push({
//           id: node.id,
//           type: node.type,
//           data: { label: node.label },
//           position: node.position,
//           style: node.style,
//           parentId: node.parentId || undefined,
//           extent: node.parentId ? 'parent' : undefined,
//           draggable: false,
//         });
//       });
  
//       // Add compound group nodes
//       compoundGroups.forEach((group) => {
//         newNodes.push({
//           id: group.id,
//           type: 'default',
//           data: { label: '' },
//           position: { x: 255, y: 180 }, // fallback
//           style: {
//             backgroundColor: '#2196F3',
//             width: 340,
//             height: 120,
//             ...group.style,
//           },
//           draggable: true,
//         });
  
//         group.children.forEach((child, index) => {
//           newNodes.push({
//             id: child.id,
//             type: child.type,
//             data: { label: child.label },
//             parentId: group.id,
//             extent: 'parent',
//             position: {
//               x: index % 2 === 0 ? 10 : 170,
//               y: index < 2 ? 10 : 70,
//             },
//             style: child.style,
//             draggable: false,
//           });
//         });
//       });
  
//       // Parse edges (Ensure correct source/target)
//       const newEdges = allEdges.map((row) => {
//         const sourceNode = nodeMap.get(row.Source);
//         const targetNode = nodeMap.get(row.Target);
  
//         // Log the source and target nodes to ensure they exist
//         if (!sourceNode || !targetNode) {
//           console.log('Skipping invalid edge:', row);
//           return null; // Skip if source or target node is not found
//         }
  
//         console.log('Source Node:', sourceNode);
//         console.log('Target Node:', targetNode);
  
//         return {
//           id: row.ID,
//           source: sourceNode.id,
//           target: targetNode.id,
//           animated: row.Animated === 'TRUE',
//           type: row.Type || 'step',
//           markerEnd: {
//             type: MarkerType.ArrowClosed,
//             width: 30,
//             height: 30,
//             color: 'black',
//           },
//           style: { stroke: 'black'
//             , width: 2 },
//         };
//       }).filter(edge => edge !== null);
  
//       console.log('Parsed Edges:', newEdges);
  
//       // Set the nodes and edges in state
//       setNodes(newNodes);
//       setEdges(newEdges);
//     };
  
//     reader.readAsArrayBuffer(file);
//   };
  

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   return (
//     <div className="pathway-tool-container">
//       <h2>Signal Pathway Visualization</h2>
//       <input type="file" accept=".xlsx" onChange={handleFileUpload} />
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         fitView
//       >
//         <Controls />
//         <MiniMap />
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// }




import React, { useCallback,useRef} from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  MarkerType,
} from 'reactflow';
import * as XLSX from 'xlsx';
import ELK from 'elkjs/lib/elk.bundled.js';
import 'reactflow/dist/style.css';
import './PathwayTool.css';
import download from 'downloadjs';
import CustomNode from './CustomNode';
import CustomBadgeNode from './CustomBadgeNode';
// import Legend from './Legend';
import { toSvg,toPng  } from 'html-to-image';


const elk = new ELK();

const nodeTypes = {
  custom: CustomNode,
  customBadge: CustomBadgeNode,
};

export default function PathwayTool() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null); 

  const layoutWithELK = async (nodes, edges) => {
    const elkNodes = nodes
      .filter((n) => !n.parentNode)
      .map((node) => ({
        id: node.id,
        width: node.style?.width || 100,
        height: node.style?.height || 40,
      }));

    const elkEdges = edges.map((edge) => ({
      id: edge.id || `${edge.source}-${edge.target}`,
      sources: [edge.source],
      targets: [edge.target],
    }));

    const layout = await elk.layout({
      id: 'root',
      layoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': 'DOWN',
        'elk.spacing.nodeNode': '80',
      },
      children: elkNodes,
      edges: elkEdges,
    });

    return nodes.map((node) => {
      if (node.parentNode) return node;
      const layoutNode = layout.children.find((n) => n.id === node.id);
      return {
        ...node,
        position: {
          x: layoutNode?.x || 0,
          y: layoutNode?.y || 0,
        },
      };
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      let allRows = [];
      let allEdges = [];

      workbook.SheetNames.forEach((sheet) => {
        const ws = workbook.Sheets[sheet];
        const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

        if (sheet.toLowerCase().includes('sheet2')) {
          allEdges = allEdges.concat(rows);
        } else {
          allRows = allRows.concat(rows);
        }
      });

      const nodeMap = new Map();
      const baseNodes = [];

      const parentIds = new Set(allRows.map((row) => row.parentId).filter(Boolean));
      
      allRows.forEach((row) => {
        const id = row.id || row.node_id;
        const parentId = row.parentId || '';
        const relatedSite = row.relatedSite || '';
      
        const isParentNode = parentIds.has(id); // check if this node is a parent
      
        const node = {
          id,
          label: isParentNode ? '' : (row.label || id), // hide label if parent node
          type: row.type || 'custom',
          style: {
            backgroundColor: row.style_background || '#ddd',
            width: Number(row.style_width) || 100,
            height: Number(row.style_height) || 40,
          },
          data: {
            label: isParentNode ? '' : (row.label || id), // hide label in custom node too
            relatedSites: relatedSite ? relatedSite.split(',') : [],
          },
          position: {
            x: Number(row.pos_x) || 0,
            y: Number(row.pos_y) || 0,
          },
          draggable: false,
          ...(parentId && {
            parentNode: parentId,
            extent: 'parent',
          }),
        };
      
        baseNodes.push(node);
        nodeMap.set(id, node);
      });

      const badgeNodes = baseNodes.flatMap((parentNode) => {
        const sites = parentNode.data.relatedSites;
        if (!sites || sites.length === 0) return [];
      
        const badges = [];
        const badgeWidth = 40;
        const badgeHeight = 24;
        const spacing = 24;
      
        if (sites.length === 1) {
          // Place a single badge to the right side, vertically centered
          badges.push({
            id: `${parentNode.id}-badge-0`,
            type: 'customBadge',
            data: {
              label: sites[0],
            },
            style: { width: badgeWidth, height: badgeHeight, background: 'yellow' },
            position: {
              x: parentNode.style.width - 12, // 5px space to the right of node
              y: (parentNode.style.height - (-badgeHeight)) / 2, // vertical center
            },
            parentNode: parentNode.id,
            extent: 'parent',
            draggable: false,
          });
        } else {
          // Place multiple badges above the node as before
          const totalWidth = sites.length * (badgeWidth + spacing) - spacing;
      
          sites.forEach((site, index) => {
            const xOffset =
              (parentNode.style.width / 2 - totalWidth / 2) +
              index * (badgeWidth + spacing);
      
            badges.push({
              id: `${parentNode.id}-badge-${index}`,
              type: 'customBadge',
              data: {
                label: site,
              },
              style: { width: badgeWidth, height: badgeHeight, background: 'yellow' },
              position: {
                x: xOffset,
                y: -badgeHeight - -5,
              },
              parentNode: parentNode.id,
              extent: 'parent',
              draggable: false,
            });
          });
        }
      
        return badges;
      });

      const allNodes = [...baseNodes, ...badgeNodes];

      const moleculeNode = allNodes.find(node => node.label?.toLowerCase() === 'molecule');
      const moleculeId = moleculeNode?.id;

      const isDirectlyConnectedToMolecule = (edge) => {
        return moleculeId ? (edge.source === moleculeId || edge.target === moleculeId) : false;
      };

      const parsedEdges = allEdges
        .map((row) => {
          if (!row.Source || !row.Target) return null;
          return {
            id: row.ID || `${row.Source}-${row.Target}`,
            source: row.Source,
            target: row.Target,
            animated: row.Animated === 'TRUE',
            type: row.Type || 'step',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 30,
              height: 30,
              color: 'black',
            },
            style: {
              stroke: isDirectlyConnectedToMolecule({ source: row.Source, target: row.Target }) ? 'black' : 'blue',
              strokeWidth: 2,
              strokeDasharray: isDirectlyConnectedToMolecule({ source: row.Source, target: row.Target }) ? 'none' : '5 5',
            },
          };
        })
        .filter(Boolean);

      const validEdges = parsedEdges.filter(
        (edge) =>
          allNodes.some((node) => node.id === edge.source) &&
          allNodes.some((node) => node.id === edge.target)
      );


      if (moleculeId && validEdges.every(edge => edge.source !== moleculeId)) {
        const firstNode = allNodes.find(node => node.id !== moleculeId);
        if (firstNode) {
          validEdges.push({
            id: `${moleculeId}-${firstNode.id}`,
            source: moleculeId,
            target: firstNode.id,
            animated: false,
            type: 'step',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 30,
              height: 30,
              color: 'black',
            },
            style: {
              stroke: 'black',
              strokeWidth: 2,
              strokeDasharray: 'none',
            },
          });
        }
      }

      const laidOutNodes = await layoutWithELK(allNodes, validEdges);

      setNodes(laidOutNodes);
      setEdges(validEdges);
    };

    reader.readAsArrayBuffer(file);
  };


  const downloadSVG = async () => {
    const viewport = document.querySelector('.react-flow__viewport');
    if (!viewport) {
      alert('Diagram viewport not found');
      return;
    }
  
    try {
      const dataUrl = await toSvg(viewport, {
        backgroundColor: 'white',  
        filter: (node) => {
          if (!(node instanceof HTMLElement)) return true;
  
          const classList = node.classList;
          return !classList.contains('react-flow__background') &&
                 !classList.contains('react-flow__controls') &&
                 !classList.contains('react-flow__minimap');
        },
      });
      download(dataUrl, 'pathway-diagram.svg', 'image/svg+xml');
    } catch (error) {
      console.error('Error exporting SVG:', error);
      alert('Failed to export SVG');
    }
  };
  
  const downloadPNG = async () => {
    const viewport = document.querySelector('.react-flow__viewport');

    if (!viewport) {
      alert('Diagram viewport not found');
      return;
    }
  
    try {
      const dataUrl = await toPng(viewport,
        {
          backgroundColor: 'white', 
          filter: (node) => {
            if (!(node instanceof HTMLElement)) return true;
          
            const classList = node.classList;
            return !classList.contains('react-flow__background') &&
                   !classList.contains('react-flow__controls') &&
                   !classList.contains('react-flow__minimap');
          }
          
      });
      download(dataUrl, 'pathway-diagram.png', 'image/png');
    } catch (error) {
      console.error('Error exporting PNG:', error);
      alert('Failed to export PNG');
    }
  };
  

  return (
    <div className="pathway-tool-container m-4">
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      <button onClick={downloadSVG} className="download-btn">
        Download as SVG
      </button>
      <button onClick={downloadPNG} className="download-btn ">
  Download as PNG
</button>

      {/* <Legend /> */}
      <div ref={reactFlowWrapper} style={{ height: '600px', border: '1px solid #ccc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
    </div>
  );
}
