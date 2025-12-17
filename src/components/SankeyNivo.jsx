import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey';

const SankeyNivo = ({ data, width = 800, height = 500 }) => {
  if (!data) return null;

  // Nivo expects nodes to match source/target strings exactly
  // Our data structure is already compatible:
  // nodes: [{ id: "..." }, ...], links: [{ source: "...", target: "...", value: ... }]

  return (
    <div style={{ height: height, width: width, border: '1px solid #ccc', padding: '10px' }}>
      <h3>Nivo Implementation</h3>
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
      <ResponsiveSankey
        data={data}
        margin={{ top: 0, right: 40, bottom: 150, left: 40 }}
        align="start"
        colors={{ scheme: 'category10' }}
        nodeOpacity={1}
        nodeHoverOthersOpacity={0.35}
        nodeThickness={18}
        nodeSpacing={18}
        nodeBorderWidth={0}
        nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={true}
        labelPosition="inside"
        labelOrientation="horizontal"
        labelPadding={16}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
        theme={{
          labels: {
            text: {
              fontSize: 14,
            },
          },
        }}
        nodeTooltip={({ node }) => (
          <div style={{ background: 'white', padding: '12px', border: '1px solid #ccc', borderRadius: '3px', color: '#333', whiteSpace: 'nowrap' }}>
            <strong>{node.id}</strong><br />
            {Number(node.value).toFixed(2)} Million metric tons/year
          </div>
        )}
        linkTooltip={({ link }) => (
          <div style={{ background: 'white', padding: '12px', border: '1px solid #ccc', borderRadius: '3px', color: '#333', whiteSpace: 'nowrap' }}>
            <strong>{link.source.id} → {link.target.id}</strong><br />
            {Number(link.value).toFixed(2)} Million metric tons/year
          </div>
        )}
      />
    </div>
  );
};

export default SankeyNivo;
