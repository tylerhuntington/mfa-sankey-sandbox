import React from 'react';
import { Chart } from "react-google-charts";

const SankeyGoogle = ({ data, width = 800, height = 500 }) => {
  if (!data) return null;

  // Transform data for Google Charts
  // [["From", "To", "Weight"], ...]
  const chartData = [
    ["From", "To", "Weight"],
    ...data.links.map(l => [l.source, l.target, l.value])
  ];

  const options = {
    sankey: {
      node: {
        label: { fontName: 'sans-serif', fontSize: 14 },
        width: 15,
        nodePadding: 10
      },
      link: {
        colorMode: 'gradient',
      },
      iterations: 32 // Google Charts doesn't support 'align: left' natively.
    }
  };

  return (
    <div style={{ width: width, border: '1px solid #ccc', padding: '10px' }}>
      <h3>Google Charts Implementation</h3>
      
      {/* Phase Labels - Manually positioned to approximate the Sankey columns */}
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

      <Chart
        chartType="Sankey"
        width="100%"
        height={`${height}px`}
        data={chartData}
        options={options}
      />
      <p style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>
        Note: Google Charts automatically justifies nodes to the right. Custom alignment (to keep sink nodes to the left) is not natively supported in this library.
      </p>
    </div>
  );
};

export default SankeyGoogle;
