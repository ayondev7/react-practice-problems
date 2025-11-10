import React, { useState } from 'react';

export default function Answer03UseState() {
  // Updating based on previous state (functional updater)
  const [value, setValue] = useState(0);

  function handleAddFive() {
    // If you naively call setValue(value + 1) five times, you may get a stale result.
    // Using the functional updater ensures each step uses the freshest state.
    for (let i = 0; i < 5; i++) {
      setValue(v => v + 1);
    }
  }

  return (
    <div style={{padding:20}}>
      <h3>03 — Functional Updater (avoid stale state)</h3>
      <p>Value: {value}</p>
      <button onClick={() => setValue(v => v + 1)}>Increment once</button>
      <button onClick={handleAddFive} style={{marginLeft:8}}>Add 5 (functional updater)</button>
      <p style={{marginTop:12, color:'#444'}}>Use the functional form of setState when new state depends on previous state.</p>
    </div>
  );
}
