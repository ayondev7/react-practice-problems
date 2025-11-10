import React from 'react'
import { Link } from 'react-router-dom'
import * as Topics from '../topics/registry'

export default function Home(){
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">React 19 — Practice Playground</h1>
      <p className="text-gray-600 mb-6">Each topic contains 5 practice files with incomplete React logic for you to implement.</p>

      <div className="space-y-4">
        {Object.keys(Topics).slice().reverse().map(key => (
          <div className="card" key={key}>
            <h3 className="text-xl font-semibold">{key}</h3>
            <ul className="mt-2 space-y-1">
              {Topics[key].map(t => (
                <li key={t.path}>
                  <Link className="block px-3 py-2 rounded hover:bg-gray-50 text-blue-600" to={`/topic/${key}/${t.name}`}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-6">Open the <code>src/topics</code> folder in your editor and start implementing.</p>
    </div>
  )
}
