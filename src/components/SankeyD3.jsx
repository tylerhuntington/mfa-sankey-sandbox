import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, sankeyLeft, sankeyJustify } from 'd3-sankey';

const SankeyD3 = ({ data, width = 1000, height = 800 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Clear previous render
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Deep clone data to avoid mutation issues in React StrictMode
    const sankeyData = {
      nodes: data.nodes.map(d => ({ ...d })),
      links: data.links.map(d => ({ ...d }))
    };

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Setup Sankey generator
    const sankeyGenerator = sankey()
      .nodeId(d => d.id)
      .nodeAlign(sankeyLeft)
      .nodeWidth(15)
      .nodePadding(18)
      .extent([[1, 5], [width - 1, height - 5]]);

    // Compute layout
    // Note: d3-sankey mutates the data
    const { nodes, links } = sankeyGenerator(sankeyData);

    // Draw links
    svg.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", d => color(d.source.category || d.source.id))
      .attr("stroke-width", d => Math.max(1, d.width))
      .style("mix-blend-mode", "multiply")
      .append("title")
      .text(d => `${d.source.id} → ${d.target.id}\n${d.value}`);

    // Draw nodes
    const node = svg.append("g")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", d => color(d.category || d.id))
      .append("title")
      .text(d => `${d.id}\n${d.value}`);

    // Add node labels
    svg.append("g")
      .style("font", "14px sans-serif")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
      .text(d => d.id);

  }, [data, width, height]);

  return (
    <div style={{ width: width, border: '1px solid #ccc', padding: '10px' }}>
      <h3>D3.js Implementation</h3>
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
      <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`}></svg>
    </div>
  );
};

export default SankeyD3;
