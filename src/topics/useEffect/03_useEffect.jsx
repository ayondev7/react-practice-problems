import React, {useEffect, useState} from 'react'

export default function UseEffectExample3(){

  const [searchTerm,setSearchTerm]=useState('');
  const [debouncedTerm,setDebouncedTerm]=useState('');
  const [results,setResults]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

  useEffect(()=>{
    const timeoutId=setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return ()=> clearTimeout(timeoutId)
  },[searchTerm]);

  useEffect(()=>{
    if(!debouncedTerm){
      setResults([]);
      return;
    }else{
      const fetchData=async()=>{
        setLoading(true);
        try {
          const res=await fetch(`https://jsonplaceholder.typicode.com/posts?q=${debouncedTerm}`);
          if(!res.ok){
            throw new Error('oops! something went wrong.')
          }
          const data=res.json();
          setResults(data);
        } catch (error) {
          setError(error.message);
        }finally{
          setLoading(false);
        }
      }
      fetchData();
    }
  },[debouncedTerm]);

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useEffect — Search with Debouncing</h4>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder="Search posts... (try 'qui', 'est', 'sed')"
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div className="absolute right-4 top-3.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          ⚡ Debounced: waits 500ms after you stop typing before searching
        </p>
      </div>

      <div className="space-y-3">
        
        <p className="text-gray-400 italic">Start typing to search...</p>

      </div>
    </div>
  )
}
