import React, { useState } from 'react';

export default function Answer04UseState() {
  // Managing an array with useState
  const [items, setItems] = useState(['Learn useState']);
  const [text, setText] = useState('');

  function addItem() {
    if (!text.trim()) return;
    // Avoid mutating the existing array — create a new array
    setItems(prev => [...prev, text.trim()]);
    setText('');
  }

  function removeItem(index) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div style={{padding:20}}>
      <h3>04 — Array State (add/remove)</h3>
      <div>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="New item" />
        <button onClick={addItem} style={{marginLeft:8}}>Add</button>
      </div>
      <ul>
        {items.map((it, i) => (
          <li key={i}>
            {it} <button onClick={() => removeItem(i)} style={{marginLeft:8}}>remove</button>
          </li>
        ))}
      </ul>
      <p style={{marginTop:12, color:'#444'}}>When updating arrays, create a new array (spread/filter) so React sees the change.</p>
    </div>
  );
}
