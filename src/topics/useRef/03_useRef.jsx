import React, {useRef, useState} from 'react'

export default function UseRefExample3(){
  /**
   * CHALLENGE: Video Player with Custom Controls
   * 
   * LEARNING GOALS:
   * - Controlling media elements with refs
   * - Accessing native DOM methods (play, pause, etc.)
   * - Updating UI based on media events
   * - Combining refs with state for complex interactions
   * 
   * TODO:
   * 1. Create ref for video element
   * 2. State for: isPlaying, currentTime, duration
   * 3. Implement play/pause toggle
   * 4. Implement seek (change video time)
   * 5. Update state on video timeupdate and loadedmetadata events
   * 6. Add playback speed controls
   */

  // TODO: Create video ref
  // const videoRef = useRef(null)

  // TODO: Add state
  // const [isPlaying, setIsPlaying] = useState(false)
  // const [currentTime, setCurrentTime] = useState(0)
  // const [duration, setDuration] = useState(0)
  // const [playbackSpeed, setPlaybackSpeed] = useState(1)

  // TODO: Implement play/pause toggle
  const togglePlay = () => {
    // if (videoRef.current.paused) {
    //   videoRef.current.play()
    //   setIsPlaying(true)
    // } else {
    //   videoRef.current.pause()
    //   setIsPlaying(false)
    // }
  }

  // TODO: Implement seek
  const handleSeek = (e) => {
    // const time = parseFloat(e.target.value)
    // videoRef.current.currentTime = time
    // setCurrentTime(time)
  }

  // TODO: Handle time update
  const handleTimeUpdate = () => {
    // setCurrentTime(videoRef.current.currentTime)
  }

  // TODO: Handle loaded metadata
  const handleLoadedMetadata = () => {
    // setDuration(videoRef.current.duration)
  }

  // TODO: Change playback speed
  const changeSpeed = (speed) => {
    // videoRef.current.playbackRate = speed
    // setPlaybackSpeed(speed)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useRef — Video Player Controls</h4>
      
      {/* Video Element */}
      <div className="bg-black rounded-lg overflow-hidden mb-4">
        <video
          // TODO: Add ref and event handlers
          className="w-full"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          // onTimeUpdate={handleTimeUpdate}
          // onLoadedMetadata={handleLoadedMetadata}
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={/* TODO: use duration */100}
          value={/* TODO: use currentTime */0}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>{formatTime(/* TODO */0)}</span>
          <span>{formatTime(/* TODO */100)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={togglePlay}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          {/* TODO: Show "⏸ Pause" or "▶ Play" based on isPlaying */}
          ▶ Play
        </button>

        <div className="flex gap-2">
          <span className="text-sm text-gray-600 self-center mr-2">Speed:</span>
          {[0.5, 1, 1.5, 2].map(speed => (
            <button
              key={speed}
              onClick={() => changeSpeed(speed)}
              className={`px-3 py-2 rounded-lg transition ${
                /* TODO: Conditional styling based on playbackSpeed */
                'bg-gray-200'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm">
          🎥 <strong>Video Credit:</strong> "Big Buck Bunny" from Blender Foundation
        </p>
      </div>
    </div>
  )
}
