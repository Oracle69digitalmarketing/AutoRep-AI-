"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { agents } from '../frontend/data/agents';

const Map = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {agents.map(agent => (
        <Marker key={agent.id} position={agent.position as [number, number]}>
          <Popup>
            <strong>{agent.name}</strong><br />
            {agent.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;