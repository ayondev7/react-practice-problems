import React, { useEffect, useState } from "react";

export default function UseEffectExample2() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    fetchUser();
  },[userId])

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">
        useEffect — Fetch Data (Dependencies)
      </h4>

      {/* User Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Select User ID (1-10):
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
            <button
              key={id}
              onClick={()=>{setUserId(id)}}
              className={`px-4 py-2 rounded-lg transition
                ${
                  id===userId ? "bg-blue-300" : "bg-gray-200"
                }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {/* TODO: Conditional rendering - show if loading is true */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      ) : null}

      {/* Error State */}
      {/* TODO: Conditional rendering - show if error exists */}
      {error ? (
        <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-red-700">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      ) : null}

      {/* User Data */}
      {/* TODO: Conditional rendering - show if userData exists and not loading */}
      {!loading && userData ? (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {/* TODO: Display first letter of user's name */}U
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">
                {/* TODO: Display user name */}
                {userData[0]?.name}
              </h3>
              <div className="space-y-1 text-gray-700">
                <p>📧 {userData?.email}</p>
                <p>📱 {userData?.phone}</p>
                <p>🌐 {userData?.website}</p>
                {/* <p>🏢 {userData?.address}</p> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
