import React, { useState } from 'react';

export default function Answer05UseState() {
  // Managing object state — merge carefully
  const [person, setPerson] = useState({ name: 'Alice', age: 30 });

  function setName(name) {
    // Merge properties — do not mutate the previous object
    setPerson(prev => ({ ...prev, name }));
  }

  function birthday() {
    setPerson(prev => ({ ...prev, age: prev.age + 1 }));
  }

  return (
    <div style={{padding:20}}>
      <h3>05 — Object State (partial updates)</h3>
      <p>
        Name: <strong>{person.name}</strong> — Age: <strong>{person.age}</strong>
      </p>
      <div>
        <button onClick={() => setName('Bob')}>Set Name to Bob</button>
        <button onClick={birthday} style={{marginLeft:8}}>Birthday +1</button>
      </div>
      <p style={{marginTop:12, color:'#444'}}>When state is an object, copy previous state with spread and override changed keys.</p>
    </div>
  );
}
