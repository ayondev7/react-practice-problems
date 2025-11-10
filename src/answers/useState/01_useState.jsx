import React, { useState } from 'react';

export default function Answer01UseState() {
  // Basic counter using useState
  const [count, setCount] = useState(0);

  return (
    <div style={{padding:20}}>
      <h3>01 — Basic Counter (useState)</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setCount(0)} style={{margin:'0 8px'}}>reset</button>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <p style={{marginTop:12, color:'#444'}}>This demonstrates a simple numeric state and using the functional updater to avoid stale closures.</p>
    </div>
  );
}
