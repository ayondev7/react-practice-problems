import React, {useContext, useReducer, createContext} from 'react'

const DemoContext = createContext(null)

export function DemoProvider(props){
  // TODO: implement reducer and provider
  return React.createElement(DemoContext.Provider, {value: {}}, props.children)
}

export default function UseContextReducerExample2(){
  // TODO: consume context or useReducer here
  return (
    <div className="card">
      <h4>useContext/useReducer — example 2</h4>
      <p>// TODO: wire reducer dispatch or context consumption here</p>
    </div>
  )
}
