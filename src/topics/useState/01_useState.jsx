import React, {useState} from 'react'

export default function UseStateExample1(){
  const [count,setCount]=useState(0);

  const increment = () => {
    setCount(count+1);
  }

  const decrement=()=>{
    setCount(count-1);
  }

  return (
    <div className="card">
      <h4>useState — example 1</h4>
     <div className='flex gap-x-5'>
       <button className='p-3 bg-gray-300' onClick={increment}>+</button>
      {count >=0 ? <p className='p-4'>count : {count}</p> : null}
      <button className='p-3 bg-gray-300' onClick={decrement}>-</button>
      <button className='p-3 bg-gray-300' onClick={()=>{setCount(0)}}>reset</button>
     </div>
    </div>
  )
}
