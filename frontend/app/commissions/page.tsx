"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommissionsPage = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const token = localStorage.getItem('token');
        // This is a placeholder for getting the agent's ID
        const agentId = '123';
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL || '/api/proxy';
        const res = await axios.get(`${backend}/commissions/agents/${agentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCommissions(res.data);
      } catch (error) {
        console.error('Failed to fetch commissions', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Commissions</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Commission</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((commission: any) => (
            <tr key={commission.id}>
              <td>{commission.id}</td>
              <td>{commission.amount}</td>
              <td>{commission.commissionAmount}</td>
              <td>{new Date(commission.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommissionsPage;