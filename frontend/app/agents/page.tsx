"use client";

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../../components/Map'), { ssr: false });

const AgentsPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Agents Map</h1>
      <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
        <strong>Disclaimer:</strong> This map is a placeholder to demonstrate how the Open Mobile Hub Maps SDK would be integrated in a native mobile application.
      </p>
      <div style={{ height: '400px', width: '100%' }}>
        <Map />
      </div>
    </div>
  );
};

export default AgentsPage;