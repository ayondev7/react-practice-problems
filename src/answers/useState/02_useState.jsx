import React, { useState } from 'react';

export default function Answer02UseState() {
  // Controlled input example
  const [text, setText] = useState('');

  return (
    <div style={{padding:20}}>
      <h3>02 — Controlled Input (useState)</h3>
      <label>
        Type something: <input value={text} onChange={e => setText(e.target.value)} />
      </label>
      <p>Echo: {text || <em>(empty)</em>}</p>
      <button onClick={() => setText('')}>Clear</button>
      <p style={{marginTop:12, color:'#444'}}>This shows using state to control form inputs and render their value.</p>
    </div>
  );
}
