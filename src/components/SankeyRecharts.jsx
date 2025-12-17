import React from 'react';
import { Sankey, Tooltip, Rectangle, Layer } from 'recharts';

const SankeyRecharts = ({ data, width = 800, height = 500 }) => {
  if (!data) return null;

  // Transform data for Recharts:
  const rechartsNodes = data.nodes.map(n => ({ name: n.id }));
  const nodeMap = new Map(data.nodes.map((n, i) => [n.id, i]));

  const rechartsLinks = data.links.map(l => ({
    source: nodeMap.get(l.source),
    target: nodeMap.get(l.target),
    value: l.value
  }));

  const rechartsData = {
    nodes: rechartsNodes,
    links: rechartsLinks
  };

  // Simple color palette
  const colors = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
  ];

  const CustomNode = ({ x, y, width, height, index, payload, containerWidth }) => {
    const isOut = x + width + 6 > containerWidth / 2;
    return (
      <Layer key={`CustomNode${index}`}>
        <Rectangle
          x={x} y={y} width={width} height={height}
          fill={colors[index % colors.length]}
          fillOpacity="1"
        />
        <text
          textAnchor={isOut ? 'end' : 'start'}
          x={isOut ? x - 6 : x + width + 6}
          y={y + height / 2}
          fontSize="14"
          stroke="none"
          fill="#333"
          dy="0.35em"
        >
          {payload.name}
        </text>
      </Layer>
    );
  };

  return (
    <div style={{ width: width, border: '1px solid #ccc', padding: '10px' }}>
      <h3>Recharts Implementation</h3>
      {/* Phase Labels */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '10px', 
        paddingLeft: '10px', 
        paddingRight: '10px',
        fontWeight: 'bold',
        color: '#555',
        fontSize: '14px'
      }}>
        <span>Raw Materials</span>
        <span>Production</span>
        <span>Construction</span>
        <span>Use Phase</span>
        <span>End of Life</span>
      </div>
      <Sankey
        width={width}
        height={height}
        data={rechartsData}
        node={<CustomNode containerWidth={width} />}
        nodePadding={18}
        link={{ stroke: '#77c878' }}
      >
        <Tooltip />
      </Sankey>
    </div>
  );
};

export default SankeyRecharts;
