import React from 'react'

export function ChildA(){ return React.createElement('div', null, 'Child A — TODO: connect props') }
export function ChildB(){ return React.createElement('div', null, 'Child B — TODO: connect props') }

export default function MultipleComponents3(){
  // TODO: compose ChildA and ChildB and pass props between them
  return (
    <div className="card">
      <h4>multiple components in one file — example 3</h4>
      <p>// TODO: compose the children and pass props</p>
    </div>
  )
}
