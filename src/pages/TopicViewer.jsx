import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// import.meta.glob to discover topic modules at build time
const modules = import.meta.glob('../topics/**/**.jsx')

export default function TopicViewer(){
  const { group, file } = useParams()
  const [Comp, setComp] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    const target = `../topics/${group}/${file}`
    const key = Object.keys(modules).find(k => k.endsWith(`${group}/${file}`))
    if(!key){
      setError(`Module not found: ${target}`)
      return
    }

    modules[key]()
      .then(mod => {
        const C = mod && (mod.default || null)
        if(!C){
          throw new Error('Module has no default export')
        }
        if(mounted) setComp(() => C)
      })
      .catch(err => {
        console.error(err)
        if(mounted) setError(err.message || String(err))
      })

    return () => { mounted = false }
  }, [group, file])

  if(error) return (
    <div className="card">
      <h4>load error</h4>
      <p>{error}</p>
    </div>
  )

  if(!Comp) return (
    <div className="card">
      <p>Loading...</p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Comp />
    </div>
  )
}
