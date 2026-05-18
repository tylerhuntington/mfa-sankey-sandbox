import React, { useState } from 'react';
import { sankeyData } from './data/mockData';
import SankeyD3 from './components/SankeyD3';
import SankeyPlotly from './components/SankeyPlotly';
import SankeyNivo from './components/SankeyNivo';
import SankeyRecharts from './components/SankeyRecharts';
import SankeyGoogle from './components/SankeyGoogle';

const HEADER_HEIGHT = 48;

function App() {
  const [activeTab, setActiveTab] = useState('recharts');
  const chartWidth = 1200;
  const chartHeight = window.innerHeight - HEADER_HEIGHT - 16;

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
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif', overflow: 'hidden' }}>
      <div style={{ height: HEADER_HEIGHT, display: 'flex', alignItems: 'center', gap: '16px', padding: '0 16px', flexShrink: 0, borderBottom: '1px solid #e0e0e0' }}>
        <span style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', color: '#333' }}>MFA Sankey</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => setActiveTab('d3')} style={btnStyle(activeTab === 'd3')}>D3.js</button>
          <button onClick={() => setActiveTab('plotly')} style={btnStyle(activeTab === 'plotly')}>Plotly.js</button>
          <button onClick={() => setActiveTab('nivo')} style={btnStyle(activeTab === 'nivo')}>Nivo</button>
          <button onClick={() => setActiveTab('recharts')} style={btnStyle(activeTab === 'recharts')}>Recharts</button>
          <button onClick={() => setActiveTab('google')} style={btnStyle(activeTab === 'google')}>Google Charts</button>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, background: '#f9f9f9', overflow: 'hidden' }}>
        {renderActiveComponent()}
      </div>
    </div>
  );
}

const btnStyle = (isActive) => ({
  padding: '10px 15px',
  cursor: 'pointer',
  background: isActive ? '#007bff' : '#eee',
  color: isActive ? '#fff' : '#333',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold'
});

export default App;
