import React, {useEffect, useState} from 'react'

export default function UseEffectExample1(){
  const [time,setTime]=useState(new Date());

  useEffect(()=>{
    const id=setInterval(()=>{
      setTime(new Date());
    },1000);

    return ()=> {
      clearInterval(id);
    }
  },[])

  // TODO: Format time (or use time.toLocaleTimeString())
  const formatTime = (time) => {
    return time.toLocaleTimeString();
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useEffect — Real-time Clock (Cleanup)</h4>
      
      <div className="text-center">
        <div className="text-6xl font-mono font-bold text-blue-600 mb-4">
         {time? formatTime(time) : '00:00:00'}
        </div>
        <p className="text-gray-600">
          This clock updates every second using useEffect + setInterval
        </p>
        <p className="text-sm text-gray-500 mt-2">
          ⚠️ Remember to cleanup the interval to prevent memory leaks!
        </p>
      </div>
    </div>
  )
}
