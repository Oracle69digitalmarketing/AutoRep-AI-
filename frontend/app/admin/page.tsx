'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { socket } from '../../lib/socket';

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [leads, setLeads] = useState<any[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  async function login() {
    const res = await axios.post('/api/proxy/auth/login', { username: 'admin', password: 'admin' });
    setToken(res.data.access_token);
  }

  async function load() {
    try {
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || '/api/proxy';
      const res = await axios.get(`${backend}/admin/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTotal(res.data.totalLeads);
      setLeads(res.data.topLeads);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (token) load();
  }, [token]);

  useEffect(() => {
    socket.on('lead:created', (lead) => {
      setLeads(prev => [lead, ...prev].slice(0,10));
      setTotal(t => (t || 0) + 1);
    });
    return () => { socket.off('lead:created'); }
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin — Leads</h2>
      {!token ? <button onClick={login}>Login (admin)</button> : <div>
        <p>Total leads: {total}</p>
        <ul>
          {leads.map(l => <li key={l.id}>{l.phone} — score: {l.score}</li>)}
        </ul>
      </div>}
    </div>
  );
}
