import React from 'react';
import Plot from 'react-plotly.js';

const SankeyPlotly = ({ data, width = 800, height = 500 }) => {
  if (!data) return null;

  // Transform data for Plotly
  const nodeLabels = data.nodes.map(n => n.id);
  const nodeMap = new Map(data.nodes.map((n, i) => [n.id, i]));

  const linkSources = data.links.map(l => nodeMap.get(l.source));
  const linkTargets = data.links.map(l => nodeMap.get(l.target));
  const linkValues = data.links.map(l => l.value);

  // Simple color palette
  const colors = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
  ];
  const nodeColors = data.nodes.map((_, i) => colors[i % colors.length]);

  return (
    <div style={{ width: width, border: '1px solid #ccc', padding: '10px' }}>
      <h3>Plotly.js Implementation</h3>
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
      <Plot
        data={[
          {
            type: "sankey",
            orientation: "h",
            node: {
              pad: 15,
              thickness: 20,
              line: {
                color: "black",
                width: 0.5
              },
              label: nodeLabels,
              color: nodeColors
            },
            link: {
              source: linkSources,
              target: linkTargets,
              value: linkValues
            }
          }
        ]}
        layout={{ width: width, height: height, title: "", font: { size: 14 } }}
      />
    </div>
  );
};

export default SankeyPlotly;
