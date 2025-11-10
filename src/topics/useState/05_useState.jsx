import React, {useState} from 'react'

export default function UseStateExample5(){
  /**
   * CHALLENGE: Advanced Tic-Tac-Toe Game
   * 
   * LEARNING GOALS:
   * - Complex state management with multiple pieces of state
   * - State derivation and game logic
   * - Handling 2D arrays in state
   * - Time travel feature (history management)
   * 
   * TODO:
   * 1. State: board (3x3 array), xIsNext (boolean), history (array of boards)
   * 2. Implement handleClick(row, col) - update board
   * 3. Implement calculateWinner() - check for winning condition
   * 4. Implement resetGame()
   * 5. BONUS: Implement time travel (go back to previous moves)
   * 6. Disable clicking on filled squares or after game ends
   */

  // TODO: Add your state here
  // const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)))
  // const [xIsNext, setXIsNext] = useState(true)
  // const [history, setHistory] = useState([])

  // TODO: Implement calculateWinner function
  const calculateWinner = (squares) => {
    // Check all possible winning lines
    // Return 'X', 'O', or null
    const lines = [
      [[0,0], [0,1], [0,2]], // row 1
      [[1,0], [1,1], [1,2]], // row 2
      [[2,0], [2,1], [2,2]], // row 3
      [[0,0], [1,0], [2,0]], // col 1
      [[0,1], [1,1], [2,1]], // col 2
      [[0,2], [1,2], [2,2]], // col 3
      [[0,0], [1,1], [2,2]], // diagonal 1
      [[0,2], [1,1], [2,0]], // diagonal 2
    ]
    // Check each line...
    return null
  }

  // TODO: Implement handleClick
  const handleClick = (row, col) => {
    // Don't proceed if square is filled or game is won
    // Create a copy of board (deep copy for 2D array!)
    // Update the clicked square
    // Update history
    // Toggle xIsNext
  }

  // TODO: Implement resetGame
  const resetGame = () => {
    // Reset all state to initial values
  }

  // TODO: Implement jumpToMove for time travel
  const jumpToMove = (moveIndex) => {
    // Restore board from history at moveIndex
  }

  // TODO: Calculate winner and game status
  const winner = null // calculateWinner(board)
  const isBoardFull = false // Check if all squares are filled
  const status = 'Next player: X' // Update based on winner/draw/next player

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useState — Tic-Tac-Toe (Complex State)</h4>
      
      <div className="flex gap-8">
        {/* Game Board */}
        <div>
          <div className="mb-4 text-lg font-semibold">
            {/* TODO: Display status (winner, draw, or next player) */}
            {status}
          </div>

          <div className="inline-block bg-gray-800 p-2 rounded-lg">
            {/* TODO: Render 3x3 grid */}
            {/* Map over board[row][col] */}
            {/* Each cell should be clickable and display X or O */}
            {[0, 1, 2].map(row => (
              <div key={row} className="flex">
                {[0, 1, 2].map(col => (
                  <button
                    key={col}
                    onClick={() => handleClick(row, col)}
                    className={`w-20 h-20 bg-white m-1 rounded text-3xl font-bold
                      hover:bg-gray-100 transition
                      ${/* TODO: Add disabled styling if square is filled or game is over */ ''}`}
                    // TODO: Add disabled prop
                  >
                    {/* TODO: Display board[row][col] */}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <button
            onClick={resetGame}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Reset Game
          </button>
        </div>

        {/* Move History (BONUS Feature) */}
        <div>
          <h5 className="font-semibold mb-3">Move History</h5>
          <div className="space-y-2">
            {/* TODO: Map over history and create "Jump to move #" buttons */}
            {/* This is the TIME TRAVEL feature! */}
            <p className="text-gray-400 italic text-sm">History will appear here...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
