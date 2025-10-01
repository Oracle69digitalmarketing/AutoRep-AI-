'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function Page() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Lead Batch Demo');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || '/api/proxy';
      const res = await axios.post(`${backend}/reports`, { title, content });
      setResult(res.data);
    } catch (err: any) {
      setResult({ error: err.toString() });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: 'Inter, system-ui' }}>
      <h1>AutoRep AI — Demo</h1>
      <p>Paste lead batch notes and click Generate</p>
      <textarea rows={6} value={content} onChange={e => setContent(e.target.value)} style={{ width: '100%' }} />
      <div style={{ marginTop: 12 }}>
        <button onClick={submit} disabled={loading}>{loading ? 'Generating...' : 'Generate Report'}</button>
      </div>
      <pre style={{ marginTop: 20 }}>{result ? JSON.stringify(result, null, 2) : 'No result yet'}</pre>
    </main>
  );
}
