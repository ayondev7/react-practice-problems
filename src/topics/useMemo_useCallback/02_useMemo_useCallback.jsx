import React, {useMemo, useCallback, useState} from 'react'

export default function UseMemoCallbackExample2(){
  // TODO: use useMemo for expensive computation and useCallback for stable handlers
  return (
    <div className="card">
      <h4>useMemo/useCallback — example 2</h4>
      <p>// TODO: memoize computed value and create stable callback</p>
    </div>
  )
}
