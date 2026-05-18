import React, { useState } from 'react';
import { sankeyData } from './data/mockData';
import SankeyD3 from './components/SankeyD3';
import SankeyPlotly from './components/SankeyPlotly';
import SankeyNivo from './components/SankeyNivo';
import SankeyRecharts from './components/SankeyRecharts';
import SankeyGoogle from './components/SankeyGoogle';

const HEADER_HEIGHT = 48;
const CHART_TOP_MARGIN = 20;
const CHART_BOTTOM_MARGIN = 80;
// h3 title + phase labels + card padding inside each component add ~120px
const COMPONENT_OVERHEAD = 120;

function App() {
  const [activeTab, setActiveTab] = useState('recharts');
  const chartWidth = 1200;
  const chartHeight = Math.max(
    300,
    window.innerHeight - HEADER_HEIGHT - CHART_TOP_MARGIN - CHART_BOTTOM_MARGIN - COMPONENT_OVERHEAD
  );

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'd3':
        return <SankeyD3 data={sankeyData} width={chartWidth} height={chartHeight} />;
      case 'plotly':
        return <SankeyPlotly data={sankeyData} width={chartWidth} height={chartHeight} />;
      case 'nivo':
        return <SankeyNivo data={sankeyData} width={chartWidth} height={chartHeight} />;
      case 'recharts':
        return <SankeyRecharts data={sankeyData} width={chartWidth} height={chartHeight} />;
      case 'google':
        return <SankeyGoogle data={sankeyData} width={chartWidth} height={chartHeight} />;
      default:
        return <SankeyD3 data={sankeyData} width={chartWidth} height={chartHeight} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif', backgroundColor: '#1a1a1a', color: '#e0e0e0' }}>
      <div style={{ height: HEADER_HEIGHT, display: 'flex', alignItems: 'center', gap: '16px', padding: '0 16px', flexShrink: 0, borderBottom: '1px solid #333', backgroundColor: '#1a1a1a' }}>
        <span style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', color: '#e0e0e0' }}>MFA Sankey</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => setActiveTab('d3')} style={btnStyle(activeTab === 'd3')}>D3.js</button>
          <button onClick={() => setActiveTab('plotly')} style={btnStyle(activeTab === 'plotly')}>Plotly.js</button>
          <button onClick={() => setActiveTab('nivo')} style={btnStyle(activeTab === 'nivo')}>Nivo</button>
          <button onClick={() => setActiveTab('recharts')} style={btnStyle(activeTab === 'recharts')}>Recharts</button>
          <button onClick={() => setActiveTab('google')} style={btnStyle(activeTab === 'google')}>Google Charts</button>
        </div>
      </div>

      <div style={{ margin: `${CHART_TOP_MARGIN}px 20px ${CHART_BOTTOM_MARGIN}px`, background: '#f9f9f9', borderRadius: '8px', overflow: 'hidden' }}>
        {renderActiveComponent()}
      </div>

      <div style={{ padding: '0 20px 40px' }}>
        <h3 style={{ color: '#e0e0e0', marginBottom: '8px' }}>Notes</h3>
        <ul style={{ color: '#ccc', lineHeight: '1.7' }}>
          <li><strong style={{ color: '#e0e0e0' }}>D3.js:</strong> Standard, high control, but requires more code to set up interactions and responsiveness.</li>
          <li><strong style={{ color: '#e0e0e0' }}>Plotly.js:</strong> Great interactivity out of the box (tooltips, drag nodes), but large bundle size.</li>
          <li><strong style={{ color: '#e0e0e0' }}>Nivo:</strong> React-centric, nice default aesthetics, built on D3. Good balance.</li>
          <li><strong style={{ color: '#e0e0e0' }}>Recharts:</strong> Native React, but Sankey support can be basic.</li>
          <li><strong style={{ color: '#e0e0e0' }}>Google Charts:</strong> Easy to use, but relies on external scripts and limited customization.</li>
        </ul>
      </div>
    </div>
  );
}

const btnStyle = (isActive) => ({
  padding: '7px 14px',
  cursor: 'pointer',
  background: isActive ? '#007bff' : '#2a2a2a',
  color: '#fff',
  border: `1px solid ${isActive ? '#007bff' : '#444'}`,
  borderRadius: '4px',
  fontWeight: 'bold',
  fontSize: '13px',
});

export default App;
